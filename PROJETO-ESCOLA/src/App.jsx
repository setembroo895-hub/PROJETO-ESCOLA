import { useState } from 'react'
import './App.css'

function App() {
  const [ideas, setIdeas] = useState([])
  const [newIdea, setNewIdea] = useState('')
  const [error, setError] = useState('')

  function addIdea(event) {
    event.preventDefault()

    const text = newIdea.trim()

    if (text === '') {
      setError('Digite sua ideia antes de adicionar.')
      return
    }

    const idea = {
      id: Date.now(),
      text: text,
      done: false
    }

    setIdeas(currentIdeas => [...currentIdeas, idea])
    setNewIdea('')
    setError('')
  }

  function toggleIdea(id) {
    // Altera apenas a ideia que tem o id recebido
    setIdeas(currentIdeas =>
      currentIdeas.map(idea =>
        idea.id === id
          ? { ...idea, done: !idea.done }
          : idea
      )
    )
  }

  function removeIdea(id) {
    // Mantém apenas as ideias com id diferente do recebido
    setIdeas(currentIdeas =>
      currentIdeas.filter(idea => idea.id !== id)
    )
  }

  // O contador é calculado a partir da própria lista
  const completedCount = ideas.filter(idea => idea.done).length

  return (
    <div className="panel">
      <h1>Painel de Ideias</h1>
      <p>Registre suas ideias de projeto</p>

      <form onSubmit={addIdea}>
        <input
          type="text"
          placeholder="Digite uma ideia"
          value={newIdea}
          onChange={event => {
            setNewIdea(event.target.value)
            setError('')
          }}
        />

        <button type="submit">Adicionar</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul>
        {ideas.map(idea => (
          <li key={idea.id}>
            <label>
              <input
                type="checkbox"
                checked={idea.done}
                onChange={() => toggleIdea(idea.id)}
              />

              <span className={idea.done ? 'completed' : ''}>
                {idea.text}
              </span>
            </label>

            <button
              type="button"
              onClick={() => removeIdea(idea.id)}
              aria-label={`Remover ideia: ${idea.text}`}
            >
              X
            </button>
          </li>
        ))}
      </ul>

      <footer>
        {`${ideas.length} ideias no painel · ${completedCount} concluídas`}
      </footer>
    </div>
  )
}

export default App