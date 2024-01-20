// TaskEditModal.js
import React, { useState, useEffect } from 'react';

const TaskEditModal = ({ task, closeModal, editTask, onSave }) => {
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');


    useEffect(() => {
        if (task) {
            setEditedTitle(task.title);
            setEditedDescription(task.description);
        }
    }, [task]);

    const handleEdit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: editedTitle,
                    description: editedDescription,
                    completed: task.completed,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            editTask(task.id, editedTitle, editedDescription);
            closeModal();
            onSave(); // Nueva línea para ejecutar la función onSave después de cerrar el modal
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!task) {
        return null;
    }

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <div className="box">
                    <h2 className="subtitle is-4">Editar Tarea</h2>
                    <div className="field">
                        <label className="label">Título:</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Descripción:</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-primary" onClick={handleEdit}>
                                Guardar cambios
                            </button>
                        </div>
                        <div className="control">
                            <button className="button" onClick={closeModal}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="modal-close is-large"
                aria-label="close"
                onClick={closeModal}
            ></button>
        </div>
    );
};

export default TaskEditModal;
