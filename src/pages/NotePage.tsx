import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ref, onValue, update } from "firebase/database";
import { db } from "../firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type AccessType = "none" | "edit" | "viewEdit";

interface NoteData {
    content: string;
    access: AccessType;
    editPassword: string | null;
    viewPassword: string | null;
    createdAt: number;
}

export default function NotePage() {
    const { noteId } = useParams<{ noteId: string }>();
    const location = useLocation();
    // when creating a note for the first time skip password prompts
    const justCreated = (location.state as { justCreated?: boolean })?.justCreated === true;

    const [note, setNote] = useState<NoteData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // View auth state
    const [authorized, setAuthorized] = useState(justCreated);
    const [viewInput, setViewInput] = useState("");
    const [viewError, setViewError] = useState("");

    // Edit mode state
    const [isEditing, setIsEditing] = useState(justCreated);
    const [editInput, setEditInput] = useState("");
    const [editError, setEditError] = useState("");

    useEffect(() => {
        if (!noteId) {
            setError("Invalid note ID.");
            setTimeout(() => setLoading(false), 2000);
            return;
        }
        const noteRef = ref(db, `notes/${noteId}`); //Note's location in the database
        const unsubscribe = onValue(
            noteRef,
            snapshot => {
                if (!snapshot.exists()) {
                    setError("Note not found.");
                    setTimeout(() => setLoading(false), 2000);
                } else {
                    const data = snapshot.val() as NoteData;
                    setNote(data);
                    // Auto-authorize view if no protection or just created
                    if (justCreated || data.access !== "viewEdit") {
                        setAuthorized(true);
                    }
                    setEditInput(data.content);
                    setTimeout(() => setLoading(false), 2000);
                }
            },
            err => {
                setError(err.message);
                setTimeout(() => setLoading(false), 2000);
            }
        );
        return () => unsubscribe();
    }, [noteId, justCreated]);

    const handleViewAuth = () => {
        if (viewInput === note?.viewPassword) {
            setAuthorized(true);
            setViewError("");
        } else {
            setViewError("Incorrect view password.");
        }
    };

    const startEditing = () => {
        if (!note) return;
        if (note.access === "none") {
            setIsEditing(true);
            return;
        }
        if (
            note.access === "viewEdit" &&
            note.editPassword &&
            note.viewPassword === note.editPassword &&
            authorized
        ) {
            setIsEditing(true);
            return;
        }
        const pw = prompt("Enter edit password:");
        if (pw === note.editPassword) {
            setIsEditing(true);
            setEditError("");
        } else {
            setEditError("Incorrect edit password.");
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setEditInput(val);
        update(ref(db, `notes/${noteId}`), { content: val }).catch(err =>
            console.error("Sync error:", err)
        );
    };

    if (loading) return <p>Loading note…</p>;
    if (error) return <p>Error: {error}</p>;
    if (!note) return null;

    // View Password
    if (note.access === "viewEdit" && !authorized) {
        return (
            <div className="note-page">
                <h1 className="note-page__title">Protected Note</h1>
                <p>This note requires a password to view.</p>
                <input
                    type="password"
                    placeholder="Enter view password"
                    value={viewInput}
                    onChange={e => setViewInput(e.target.value)}
                    className="main-page__input" 
                />
                <button onClick={handleViewAuth} className="main-page__button">
                    Submit
                </button>
                {viewError && <p className="note-page__error">{viewError}</p>}
            </div>
        );
    }

    return (
        <div className={`note-page ${isEditing ? "note-page--edit" : "note-page--view"}`}>
            {/* Toggle Pill */}
            <div className="note-page__toggle-pill">
                <button
                    className={!isEditing ? "active" : ""}
                    onClick={() => setIsEditing(false)}
                >
                    View
                </button>
                <button
                    className={isEditing ? "active" : ""}
                    onClick={startEditing}
                >
                    Edit
                </button>
            </div>

            {!isEditing ? (
                <>
                    <div className="note-page__preview">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} children={note.content} />
                    </div>
                    {editError && <p className="note-page__error">{editError}</p>}
                </>
            ) : (
                <>
                    <div className="note-page__editor">
                        <textarea
                            value={editInput}
                            onChange={handleEditChange}
                            className="main-page__input" />
                    </div>
                    <div className="note-page__preview">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} children={editInput} />
                    </div>
                </>
            )}
        </div>
    );
}
