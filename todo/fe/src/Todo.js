import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
  //  console.log("hello")

    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5001/todos');
      console.log(response.data)
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    const data = {
      text: newTodo,
      completed: false
    }
    try {
      const response = await axios.post('http://localhost:5001/todos',data);
      fetchTodos()
      // setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/todos/${id}`);   //"http://localhost:5000/todos/65578f561b05a77b939ce845"
      fetchTodos()
      // setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const startEditing = (id) => {
    setEditingTodo(id);
  };



  const saveEdit = async (id, newText) => {
    try {
      await axios.put(`http://localhost:5001/todos/${id}`, { text: newText });
      // const updatedTodos = todos.map(todo => (todo._id === id ? { ...todo, text: newText } : todo));
      // setTodos(updatedTodos);
      fetchTodos()
      setEditingTodo(null);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("editingTodo",editingTodo)



  return (
    <div>
      <h1>Todo App</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {editingTodo === todo._id ? (
              <div>
                <input
                  type="text"
                  value={todo.text}
                  
                  onChange={(e) => setTodos(todos.map(t => (t._id === editingTodo ? { ...t, text: e.target.value } : t)))}   
                />
                
                                                                
                                                                                       
                <button onClick={() => saveEdit(editingTodo, todo.text)}>Save</button>
              </div>
            ) : (
              <div>
                {todo.text}
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                <button onClick={() => startEditing(todo._id)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo}>Add Todo</button>
      </div>
    </div>
  );
}

export default App;
