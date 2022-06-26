import { useState } from 'react'

const FilterContacts = (props) => (
  <div>
    Filter: <input value={props.value} onChange={props.onChange} />
  </div>
)

const AddNewContact = (props) => {
  const { 
    newName, 
    newNumber, 
    displayNameValue, 
    displayNumValue, 
    handleSubmit 
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={newName} onChange={displayNameValue} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={displayNumValue} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const ContactsList = (props) => (
  props.persons.filter(person => 
      person.name.toLowerCase().includes(props.searchValue.toLowerCase()))
  .map(person =>
      <div key={person.name}>{person.name} {person.number}</div>
  )
)



const App = () => {
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const displaySearchValue = (e) => {
    setSearch(e.target.value)
  }
  
  const displayNameValue = (e) => {
    setNewName(e.target.value)
  }

  const displayNumValue = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let includes = persons.find(person => 
      person.name === newName
    ) 
    if (includes) {
      alert(`${newName} is already added to the phonebook.`)
    } else {
      setPersons(persons.concat({ 
        name: newName, 
        number: newNumber 
      }))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterContacts value={search} 
        onChange={displaySearchValue} 
      />
      <h2>Add New Contact</h2>
      <AddNewContact newName={newName}
        newNumber={newNumber}
        displayNameValue={displayNameValue}
        displayNumValue={displayNumValue}
        handleSubmit={handleSubmit} 
      />
      <h2>Contacts</h2>
      <ContactsList persons={persons} searchValue={search} />
    </div>
  )
}

export default App