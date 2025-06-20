import React from "react";
import { useParams } from "react-router-dom";

export default function NotePage() {
    const { noteId } = useParams<{ noteId: string }>();
    return <h1>Note Page: {noteId}</h1>;
}
