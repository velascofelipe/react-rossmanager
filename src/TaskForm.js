import React from 'react';

const TaskForm = ({ title, description, completed, setTitle, setDescription, setCompleted, addTask }) => (
    <form>
        <div className="field">
            <label className="label">Título:</label>
            <div className="control">
                <input
                    type="text"
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
        </div>

        <div className="field">
            <label className="label">Descripción:</label>
            <div className="control">
                <textarea
                    className="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
        </div>

        <div className="field">
            <div className="control">
                <label className="checkbox">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                        className="mr-2" // Espaciado a la derecha
                    />
                    <span className="is-size-5 has-text-weight-semibold">Completada</span>
                </label>
            </div>
        </div>

        <div className="field">
            <div className="control">
                <button
                    type="button"
                    onClick={addTask}
                    className="button is-primary"
                >
                    Agregar tarea
                </button>
            </div>
        </div>
    </form>
);

export default TaskForm;
