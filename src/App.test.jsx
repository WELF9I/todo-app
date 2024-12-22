import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('Todo App', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('should render the todo app title', () => {
    expect(screen.getByText('Todo App')).toBeInTheDocument()
  })

  it('should add a new todo when submitting the form', () => {
    const input = screen.getByPlaceholderText('Nouvelle tâche')
    const submitButton = screen.getByText('Ajouter')

    fireEvent.change(input, { target: { value: 'New Todo Item' } })
    fireEvent.click(submitButton)

    expect(screen.getByText('New Todo Item')).toBeInTheDocument()
    expect(input.value).toBe('') // Input should be cleared after submission
  })

  it('should not add empty todos', () => {
    const submitButton = screen.getByText('Ajouter')
    const initialTodos = screen.queryAllByRole('listitem').length

    fireEvent.click(submitButton)

    expect(screen.queryAllByRole('listitem').length).toBe(initialTodos)
  })

  it('should toggle todo completion status', () => {
    const input = screen.getByPlaceholderText('Nouvelle tâche')
    const submitButton = screen.getByText('Ajouter')

    fireEvent.change(input, { target: { value: 'Toggle Test Todo' } })
    fireEvent.click(submitButton)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    const todoText = screen.getByText('Toggle Test Todo')
    expect(todoText).toHaveClass('line-through')
  })

  it('should delete a todo', () => {
    const input = screen.getByPlaceholderText('Nouvelle tâche')
    const submitButton = screen.getByText('Ajouter')

    fireEvent.change(input, { target: { value: 'Delete Test Todo' } })
    fireEvent.click(submitButton)

    const deleteButton = screen.getByText('Supprimer')
    fireEvent.click(deleteButton)

    expect(screen.queryByText('Delete Test Todo')).not.toBeInTheDocument()
  })
})