import { useState, useEffect } from 'react'
import contacts from '../tools/contacts'   //update src


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
      <div key={person.name}>
        {person.name} {person.number} 
        <button onClick={() => props.delete(person)}>delete</button>
      </div>
  )
)

const Notification = ({contents}) => (
  <h3 className='notification'>{contents}</h3>
)

const App = () => {
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([]) 
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    contacts.getContacts()
        .then(returnedArray => {
          setPersons(returnedArray)
        })
  }, [])


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
    if (includes && window.confirm(`${newName} is already added to the phonebook. Do you wish to update the number?`)) {
      let updated = {
        ...includes,
        number: newNumber
      }
      contacts.updateContact(updated)
        .then(returnedContact => {
          setPersons(persons.map(person => person.id !== updated.id ? person : returnedContact))
          setNotification('Contact Updated')
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
        .catch(error => {
          setNotification(error.message + ': contact already removed')
          setTimeout(() => {
            setNotification(null)
          }, 2000)
          setPersons(persons.filter(person => person.id !== updated.id))
        })
    }
    else if (!includes) {
      let newPerson = { 
        name: newName, 
        number: newNumber 
      }
      contacts.createContact(newPerson)
        .then(returnedObject => {
          setPersons(persons.concat(returnedObject))
          setNotification('Contact Added')
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
    }
  }

  const handleDelete = person => {
    if (window.confirm(`delete ${person.name} ?`)) {
      contacts.deleteContact(person.id)
      setPersons(persons.filter(item => item.id !== person.id))
      setNotification('Contact Deleted')
        setTimeout(() => {
          setNotification(null)
        }, 2000)
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
      <ContactsList persons={persons} 
        searchValue={search} 
        delete={handleDelete} 
      />
      <Notification contents={notification} />
    </div>
  )
}

export default App