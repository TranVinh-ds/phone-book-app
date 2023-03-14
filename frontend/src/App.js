import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const removePerson = (id, newName) => {
    if (window.confirm(`Delete ${newName}`)) {
      personService.remove(id).then((response) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumChange = (e) => {
    setNewNum(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newObj = {
      name: newName,
      number: newNum,
      // id: persons.length + 1,
    };
    const foundPerson = persons.filter((person) => person.name === newName);
    if (foundPerson.length === 0) {
      personService.create(newObj).then((returnedPersons) => {
        setPersons(persons.concat(returnedPersons));
      });
      setMessage(`Added ${newName}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(foundPerson[0].id, newObj)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== foundPerson[0].id ? person : updatedPerson
              )
            );
          })
          .catch((error) => {
            setMessage(
              `Information of ${newName} has already been removed from server`
            );
          });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    }
    setNewName('');
    setNewNum('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter search={search} setSearch={setSearch} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={onSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNum={newNum}
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        newName={newName}
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
