import React, { useState } from 'react';

const NoteItem = ({ note, toggleNote, deleteNote, openModal }) => {
    const [showIconSuccess, setIconSuccess] = useState(note.completed);

    const handleToggleNote = () => {
        toggleNote(note.id);
        setIconSuccess(prev => !prev);
    };

    return (
        <div onClick={() => openModal(note)}>
            <div>
                <div>{showIconSuccess ? '✓' : ''}</div>
                <h5>{note.title}</h5>
                <p>{note.content}</p>
                <button onClick={(e) => {
                    e.stopPropagation();
                    toggleNote(note.id);
                    handleToggleNote();
                }}>
                    {note.completed ? 'Incomplete' : 'Complete'}
                </button>
                <button onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                }}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default NoteItem;