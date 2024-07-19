import { React, useState } from 'react';
import { Button } from 'react-bootstrap';
import '../../styles/IconSuccess.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const NoteItem = ({ note, toggleNote, deleteNote, openModal }) => {
    const [showIconSuccess, setIconSuccess] = useState(note.completed);

    const handleToggleNote = () => {
        toggleNote(note.id);
        setIconSuccess(prev => !prev);
    };

    return (
        <div
            className="card"
            onClick={() => openModal(note)}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
        >
            <div className="card-body">
                <div className={`icon-check ${showIconSuccess ? 'show' : ''}`}>✓</div>
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.content}</p>
                <div className="btn-group" role="group">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleNote(note.id);
                            handleToggleNote();
                        }}
                        className="mr-2 btn btn-outline-primary"
                    >
                        <i className="bi bi-check-lg"></i>
                    </button>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note.id);
                        }}
                        className="ml-2 btn btn-outline-primary"
                    >
                        <i className="bi bi-trash"></i>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default NoteItem;