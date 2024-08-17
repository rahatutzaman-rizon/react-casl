import React, { useState } from 'react';
import { Can } from '@casl/react';

const initialTodos = [
  { id: 1, text: 'Learn CASL', completed: false, userId: 'user' },
  { id: 2, text: 'Implement authorization', completed: true, userId: 'admin' },
];

function TodoList({ userId }) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, userId }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <Can I="create" a="Todo" field="userId" value={userId}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo"
        />
        <button onClick={addTodo}>Add Todo</button>
      </Can>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <Can I="update" this={todo}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
            </Can>
            {todo.text}
            <Can I="delete" this={todo}>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </Can>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;