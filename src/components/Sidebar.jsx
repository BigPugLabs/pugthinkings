export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => {

        // find the start and end of the first line without formatting characters
        let startOfFirstLine = note.body.search(/[a-z0-9]/i)
        let endOfFirstLine = note.body.indexOf("\n")
        if (startOfFirstLine == -1) startOfFirstLine = note.body.length
        if (endOfFirstLine == -1) endOfFirstLine = note.body.length

        return (
            <div key={note.id}>
                <div

                    className={`title ${note.id === props.currentNote.id ? "selected-note" : ""
                        }`}
                    onClick={() => props.setCurrentNoteId(note.id)}
                >
                    <h4 className="text-snippet">{note.body.slice(startOfFirstLine, endOfFirstLine) || "Note " + (index + 1)}</h4>
                </div>
            </div>
        )
    })

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
