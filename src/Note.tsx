import { useState, useEffect } from 'react'
import { rtdb } from './firebase'
import { ref, onValue, set } from 'firebase/database'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'

function Note() {
  const [path, setPath] = useState<string|null>(null)
  const [initialContent, setInitialContent] = useState<string>('')

  // 1) Build “path” from your URL params however you like...
  useEffect(() => {
    const url = window.location.pathname.slice(1)   // e.g. "25065Jj3"
    const year  = url.slice(0,2)
    const month = url.slice(2,4)
    const id    = url.slice(4)
    setPath(`documents/${year}/${month}/${id}`)
  }, [])

  // 2) Load the note once, then feed it into the editor
  useEffect(() => {
    if (!path) return
    const noteRef = ref(rtdb, path)
    const off = onValue(noteRef, snap => {
      const data = snap.val() as { content: string } | null
      setInitialContent(data?.content || '')
    })
    return () => off()
  }, [path])

  // 3) Create the Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,    // ← enables markdown import/export
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const md = editor.storage.markdown.getMarkdown()
      // save back to Firebase
      if (path) {
        set(ref(rtdb, path), { content: md })
      }
    },
    editorProps: {
      attributes: { class: 'prose focus:outline-none' }
    }
  })

  // 4) Render the editor’s single-pane WYSIWYG UI
  return (
    <div className="max-w-xl mx-auto">
      <EditorContent editor={editor} />
    </div>
  )
}

export default Note
