import React, { useState } from 'react';

const NoteModal = ({ show, onHide, note, isNewNote, addNote, updateNote }) => {
    const [editedNote, setEditedNote] = useState({ ...note });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedNote((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isNewNote) {
            addNote(editedNote);
        } else {
            updateNote(editedNote);
        }
        onHide();
    };

    return (
        <div style={{ display: show ? 'block' : 'none' }}>
            <div>
                <h5>{editedNote.title || 'New Note'}</h5>
                <button onClick={onHide}>Close</button>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={editedNote.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Content:</label>
                        <textarea
                            name="content"
                            value={editedNote.content}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">
                        {isNewNote ? 'Create Note' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NoteModal;