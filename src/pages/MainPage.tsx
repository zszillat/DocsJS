import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import { nanoid } from "nanoid";

type AccessType = "none" | "edit" | "viewEdit";

export default function MainPage() {
    const navigate = useNavigate();
    const [access, setAccess] = useState<AccessType>("none");
    const [editPassword, setEditPassword] = useState("");
    const [viewPassword, setViewPassword] = useState("");
    const [useSame, setUseSame] = useState(false);

    const handleCreate = async () => {
        const noteId = nanoid(6); //Generates a note ID using nanoid
        const editPasswordValue = access === "none" ? null : editPassword
        const passwordToUse = useSame ? editPassword : viewPassword 
        const viewPasswordValue = access === "viewEdit" ? passwordToUse : null
        
        // Assemble Note Data
        const noteData = {
            content: "",
            access: access,
            editPassword: editPasswordValue,
            viewPassword: viewPasswordValue,
            createdAt: Date.now(),
        };

        // Write to Firebase
        try {
            await set(ref(db, `notes/${noteId}`), noteData);
            // Redirect to the new note
            navigate(`/${noteId}`, { state: { justCreated: true } });
        } catch (err) {
            console.error("Error creating note:", err);
            // TODO: Implement UI
        }
    };

    return (
        <>
            <div className="main-page">
                <h1 className="main-page__title">SyncBin</h1>

                <fieldset className="main-page__options">
                    <legend>Access Level</legend>

                    <label className="main-page__option">
                        <input
                            type="radio"
                            name="access"
                            value="none"
                            checked={access === "none"}
                            onChange={() => setAccess("none")}
                        />
                        No Password
                    </label>

                    <label className="main-page__option">
                        <input
                            type="radio"
                            name="access"
                            value="edit"
                            checked={access === "edit"}
                            onChange={() => setAccess("edit")}
                        />
                        Password to Edit
                    </label>

                    <label className="main-page__option">
                        <input
                            type="radio"
                            name="access"
                            value="viewEdit"
                            checked={access === "viewEdit"}
                            onChange={() => setAccess("viewEdit")}
                        />
                        Password to View & Edit
                    </label>
                </fieldset>

                {(access === "edit" || access === "viewEdit") && (
                    <div className="main-page__passwords">
                        <label>
                            Edit Password:
                            <input
                                type="password"
                                value={editPassword}
                                onChange={e => setEditPassword(e.target.value)}
                                className="main-page__input"
                            />
                        </label>

                        {access === "viewEdit" && (
                            <>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={useSame}
                                        onChange={e => setUseSame(e.target.checked)}
                                    />
                                    Use same password for viewing
                                </label>

                                {!useSame && (
                                    <label>
                                        View Password:
                                        <input
                                            type="password"
                                            value={viewPassword}
                                            onChange={e => setViewPassword(e.target.value)}
                                            className="main-page__input"
                                        />
                                    </label>
                                )}
                            </>
                        )}
                    </div>
                )}

                <button
                    onClick={handleCreate}
                    className="main-page__button"
                >
                    Create New Note
                </button>
            </div>
        </>
    );
}
