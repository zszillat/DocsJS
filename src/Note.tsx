import { useState, useEffect } from 'react'
import { rtdb } from './firebase'
import { ref, onValue, set } from 'firebase/database'
import { useParams } from "react-router";

function Note() {
  const [note, setNote] = useState<{ content: string } | null>(null)
  const isProtected = false // is the note password protected?
  const params = useParams()
  
  useEffect(() => {
    
    const path = params.noteURL;
    const year = path?.slice(0,2);
    const month = path?.slice(2,4);
    const id = path?.slice(4);

    //Firebase Realtime Database Reference 
    const noteRef = ref(rtdb, `documents/${year}/${month}/${id}`)

    // everytime this entry is updated in the database this will grab the change
    const unsubscribe = onValue(noteRef, snapshot => {
      setNote(snapshot.val())
    })

    // cleanup on unmount
    return () => unsubscribe()
  }, [])

  if (isProtected) { return <p>Protected Document</p> } else {
    return (
      <textarea name="" id="" value={note?.content}></textarea>
    )
  }
}

export default Note


