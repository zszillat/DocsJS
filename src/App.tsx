import './App.css'
import { useState, useEffect } from 'react'
import { rtdb } from './firebase'
import { ref, onValue, set } from 'firebase/database'
import { Routes, Route } from 'react-router'
import { useParams } from "react-router";
import Note from './Note'

function App() {
  const [documents, setDocuments] = useState<Record<string, any> | null>(null)

  useEffect(() => {
    const documentRef = ref(rtdb, 'documents')
    return onValue(documentRef, snapshot => {
      setDocuments(snapshot.val())
    })
  }, [])

  return (
    <>
      <Routes>
        <Route path=":noteURL" element={<Note/>}>

        </Route>
      </Routes>
    </>
  )

}

export default App

  // <div>
  //   {documents
  //     ? Object.entries(documents).flatMap(([year, months]) =>
  //         Object.entries(months as Record<string, any>).flatMap(([month, notes]) =>
  //           Object.entries(notes as Record<string, {content: string}>).map(
  //             ([id, { content }]) => (
  //               <p key={id}>{content}</p>
  //             )
  //           )
  //         )
  //       )
  //     : <p>Loading…</p>
  //   }
  // </div>
