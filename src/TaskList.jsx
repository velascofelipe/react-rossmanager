import React, { useState } from 'react';

const TaskList = ({ tasks, deleteTask, openEditModal }) => {
    const [modalActive, setModalActive] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const openModal = (taskId) => {
        setTaskToDelete(taskId);
        setModalActive(true);
    };

    const closeModal = () => {
        setTaskToDelete(null);
        setModalActive(false);
    };

    const confirmDelete = () => {
        if (taskToDelete) {
            deleteTask(taskToDelete);
            closeModal();
        }
    };

    return (
        <div className="columns is-multiline">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className={`column is-one-third ${task.completed ? '' : ''}`}
                >
                    <div className="card mb-4 hover-zoom">
                        <div className={`card-content ${task.completed ? 'bg-green-800' : ''}`}>
                            <div
                                className={`id-container ${task.completed ? 'bg-green-800' : ''}`}
                            >
                                <p className={`title is-5 title-highlight ${task.completed ? 'has-opacity' : ''}`}>
                                    ID: {task.id}
                                </p>
                            </div>
                            <p className="subtitle is-6 title-highlight">Título: {task.title}</p>
                            <p className="subtitle is-6 dark-background">Descripción: {task.description}</p>
                            <p className="subtitle is-6 dark-background">
                                Completada: {task.completed ? 'Sí' : 'No'}
                            </p>
                            <div className="buttons mt-2">
                                <button
                                    onClick={() => openEditModal(task)}
                                    className="button is-warning is-small"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => openModal(task.id)}
                                    className="button is-danger is-small ml-2"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal */}
            <div className={`modal ${modalActive ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={closeModal}></div>
                <div className="modal-content">
                    <div className="box">
                        <p className="subtitle is-5">¿Seguro que deseas eliminar esta tarea?</p>
                        <button onClick={confirmDelete} className="button is-danger mr-2">
                            Sí, eliminar
                        </button>
                        <button onClick={closeModal} className="button">
                            Cancelar
                        </button>
                    </div>
                </div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={closeModal}
                ></button>
            </div>
        </div>
    );
};

export default TaskList;
