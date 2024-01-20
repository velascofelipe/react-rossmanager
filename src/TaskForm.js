import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = ({ title, description, completed, setTitle, setDescription, setCompleted, addTask }) => {
    const handleAddTask = () => {
        // Verificar que los campos no estén en blanco antes de agregar la tarea
        if (title.trim() === '' || description.trim() === '') {
            toast.error('Por favor, complete todos los campos.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        // Si los campos no están en blanco, llama a la función addTask
        addTask();
        // También puedes mostrar un mensaje de éxito si lo deseas
        toast.success('Tarea agregada exitosamente', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <form>
            <div className="columns">
                <div className="column is-half">
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
                </div>

                <div className="column is-half">
                    {/* Agrega aquí tu imagen o cualquier otro contenido que desees */}
                    <img
                        src="https://i.imgur.com/AL9zldG.jpg"
                        height={200}
                        width={250}
                        alt="Imagen"
                        className="image is-rounded"  // Clases de Bulma para bordes redondeados
                        style={{ marginBottom: '10px', marginLeft: '120px', borderRadius: '30px' }}  // Estilo personalizado para espacio en la parte inferior y margen izquierdo
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                            className="mr-2"
                        />
                        <span className="is-size-5 has-text-weight-semibold">Completada</span>
                    </label>
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button
                        type="button"
                        onClick={handleAddTask}
                        className="button is-primary"
                    >
                        Agregar tarea
                    </button>
                </div>
            </div>
        </form>
    );
};

export default TaskForm;
