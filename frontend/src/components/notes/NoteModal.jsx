import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

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
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{editedNote.title || 'New Note'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} id="editNoteForm">
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={editedNote.title}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formContent">
                        <Form.Label>Content:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="content"
                            value={editedNote.content}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" type="submit" form="editNoteForm">
                    {isNewNote ? 'Create Note' : 'Save Changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NoteModal;