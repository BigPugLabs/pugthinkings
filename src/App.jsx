import { useState, useEffect } from 'react'
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
//import { data } from "./data"
import Split from "react-split"
import { nanoid } from "nanoid"

function App() {

    const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || [])
    const [currentNoteId, setCurrentNoteId] = useState(
        (notes[0] && notes[0].id) || ""
    )

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

    function updateNote(text) {
        setNotes(oldNotes => {
            if (currentNoteId != oldNotes[0].id) {
                const index = oldNotes.findIndex(note => note.id == currentNoteId, 1)
                const liveNote = { ...oldNotes[index], body: text }
                return [liveNote, ...oldNotes.filter(e => e.id != currentNoteId)]
            }
            return oldNotes.map(oldNote => oldNote.id === currentNoteId ? { ...oldNote, body: text } : oldNote)
        })
    }

    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes(prev => prev.filter(note => note.id != noteId))
    }

    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={notes}
                            currentNote={findCurrentNote()}
                            setCurrentNoteId={setCurrentNoteId}
                            deleteNote={deleteNote}
                            newNote={createNewNote}
                        />
                        {
                            currentNoteId &&
                            notes.length > 0 &&
                            <Editor
                                currentNote={findCurrentNote()}
                                updateNote={updateNote}
                            />
                        }
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                        </button>
                    </div>

            }
        </main>
    )
}

export default App
