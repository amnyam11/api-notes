import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../config/axiosConfig';
import NoteItem from './NoteItem';
import NoteModal from './NoteModal';
import AuthContext from '../../context/AuthContext';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isNewNote, setIsNewNote] = useState(false);

    const user = useContext(AuthContext);

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await axiosInstance.get('notes/');
            setNotes(response.data);
        };
        fetchNotes();
    }, []);

    const toggleNote = async (id) => {
        const note = notes.find(n => n.id === id);
        const response = await axiosInstance.patch(`notes/${id}/`, { completed: !note.completed });
        setNotes(notes.map(n => n.id === id ? response.data : n));
    };

    const deleteNote = async (id) => {
        await axiosInstance.delete(`notes/${id}/`);
        setNotes(notes.filter(n => n.id !== id));
    };

    const openModal = (note) => {
        setSelectedNote(note || { title: '', content: '' });
        setShowModal(true);
        setIsNewNote(!note);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const addNote = async (newNote) => {
        try {
            const response = await axiosInstance.post('notes/', newNote);
            setNotes([...notes, response.data]);
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const updateNote = async (updatedNote) => {
        try {
            const response = await axiosInstance.put(`notes/${updatedNote.id}/`, updatedNote);
            setNotes(notes.map(note => note.id === updatedNote.id ? response.data : note));
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <div>
            <h1>Hello, {user.user.username}</h1>
            <button onClick={() => openModal()}>
                Add New Note
            </button>
            <div>
                {notes.map(note => (
                    <div key={note.id}>
                        <NoteItem
                            note={note}
                            toggleNote={toggleNote}
                            deleteNote={deleteNote}
                            openModal={openModal}
                        />
                    </div>
                ))}
            </div>
            {showModal && (
                <NoteModal
                    show={showModal}
                    onHide={closeModal}
                    note={selectedNote}
                    isNewNote={isNewNote}
                    addNote={addNote}
                    updateNote={updateNote}
                />
            )}
        </div>
    );
};

export default NoteList;