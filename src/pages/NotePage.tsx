import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

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
    const [note, setNote] = useState<NoteData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!noteId) {
            setError("Invalid note ID.");
            setLoading(false);
            return;
        }

        const noteRef = ref(db, `notes/${noteId}`);
        const unsubscribe = onValue(
            noteRef,
            snapshot => {
                if (!snapshot.exists()) {
                    setError("Note not found.");
                } else {
                    setNote(snapshot.val());
                }
                setLoading(false);
            },
            err => {
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [noteId]);

    if (loading) return <p>Loading note…</p>;
    if (error)   return <p>Error: {error}</p>;
    if (!note)  return null;

    return (
        <div className="note-page">
            <h1 className="note-page__title">Note {noteId}</h1>
            <pre className="note-page__raw">{note.content}</pre>
        </div>
    );
}
