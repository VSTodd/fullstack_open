import { useState } from 'react'
import Contacts from './components/Contacts'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  const [currentPersons, setCurrentPersons] = useState(persons.slice())
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    let searchValue = event.target.value
    setNewSearch(searchValue)
    if (searchValue === '') {
      setCurrentPersons(persons.slice());
    } else {
      let filtered = persons.filter(person => {
        return person.name.toLowerCase().includes(searchValue.toLowerCase())
      })
      setCurrentPersons(filtered)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`)
    } else  {
      const personObject = {
        name: newName,
        number: newNumber
      }
      const newPersons = persons.concat(personObject)
      setPersons(newPersons)
      setCurrentPersons(newPersons)
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {currentPersons.map(person => <div key={person.name}><Contacts person={person} /></div>)}
    </div>
  )
}

export default App