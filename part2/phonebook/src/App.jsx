import { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  const [currentPersons, setCurrentPersons] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled!')
        setPersons(initialPersons)
        setCurrentPersons(initialPersons)
      })
  }

  useEffect(hook, [])
  console.log('render', persons.length, 'notes')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDelete = (event) => {
    if (window.confirm(`Delete ${event.currentTarget.className}?`)) {
      const id = event.currentTarget.id
      personService
        .deletePerson(id)
        .then(returnedPersons => {
          setPersons(persons.filter((person) => person.id !== Number(id)))
          setCurrentPersons(persons.filter((person) => person.id !== Number(id)))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(`Contacts's information has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })  
    }
    
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

  const handleEdit = (event, id) => {
    if (window.confirm(`${newName} is already added to the phonebook. Replace old number with a new one?`)) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .update(id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === id ? returnedPerson : person))
          setCurrentPersons(persons.map(person => person.id === id ? returnedPerson : person))
          setSuccessMessage(`${newName}'s phone number successfully updated`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(`${newName}'s information has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })  
    }
  }

  const findIDMatch = () => {
    let id
    persons.forEach(person => {if (person.name === newName) id = person.id})
    return id
  }

  const addPerson = (event) => {
    event.preventDefault()
    const id = findIDMatch()
    if (id) {
      handleEdit(event, id)
    } else  {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setCurrentPersons(persons.concat(returnedPerson))
          setSuccessMessage(`Successfully added ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
            setNewName('')
          setNewNumber('')
        })      
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type={'success'}/>
      <Notification message={errorMessage} type={'error'}/>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {currentPersons.map(person => <div key={person.name}><Contacts person={person} handleDelete={handleDelete}/></div>)}
    </div>
  )
}

export default App