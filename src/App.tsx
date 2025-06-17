import './App.css'
import { Routes, Route } from 'react-router'
import Note from './Note'

function App() {


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
