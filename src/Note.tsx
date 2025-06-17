import React from 'react'
import { useParams } from 'react-router'

function Note() {

    const params = useParams()

  return (
    <div>{ params.noteURL }</div>
  )
}

export default Note