import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }])
    setInputValue('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 mr-2 rounded"
          placeholder="Nouvelle tâche"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Ajouter
        </button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-2"
            />
            <span className={todo.completed ? 'line-through' : ''}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-auto bg-red-500 text-white p-1 rounded"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App