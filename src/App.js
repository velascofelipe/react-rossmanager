// App.js
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskEditModal from './TaskEditModal';  // Asegúrate de importar el componente TaskEditModal

import Logo from './logo.png';

const Navbar = () => {
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={Logo} alt="Tareas App Logo" width="30" height="30" />
          <strong className="ml-2">Aplicación de tareas</strong>
        </a>
      </div>
    </nav>
  );
};

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    listTasks();
  }, []);

  const addTask = async () => {
    try {
      const response = await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, completed }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setTitle('');
      setDescription('');
      setCompleted(false);

      listTasks();
      toast.success('Tarea agregada exitosamente');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al agregar la tarea');
    }
  };

  const listTasks = async () => {
    try {
      const response = await fetch('http://localhost:8080/tasks');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      listTasks();
      toast.success('Tarea eliminada exitosamente');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar la tarea');
    }
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setTaskToEdit(null);
    setEditModalOpen(false);
  };

  const editTask = async (taskId, editedTitle, editedDescription) => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editedTitle, description: editedDescription }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toast.success('Tarea editada exitosamente');
      handleEditTask();  // Actualiza la lista de tareas después de editar
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al editar la tarea');
    }
  };

  const handleEditTask = () => {
    listTasks();
    closeEditModal(); // Cierra el modal después de editar la tarea
  };

  return (
    <div>
      <Navbar />
      <section className="hero is-fullheight is-light">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-4 has-text-primary">Tareas</h1>

            <TaskForm
              title={title}
              description={description}
              completed={completed}
              setTitle={setTitle}
              setDescription={setDescription}
              setCompleted={setCompleted}
              addTask={addTask}
            />

            <h2 className="title is-4 mt-4 mb-4">Listado de Tareas</h2>
            {loading ? (
              <p className="has-text-grey">Cargando tareas...</p>
            ) : (
              <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} openEditModal={openEditModal} />
            )}
          </div>
        </div>
      </section>
      <TaskEditModal
        task={taskToEdit}
        closeModal={closeEditModal}
        editTask={editTask}
        isOpen={editModalOpen}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
