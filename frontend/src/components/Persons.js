import React from 'react';

const Persons = ({ filteredPersons, newName }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name === newName
            ? alert(`${newName} is already added to phonebook`)
            : person.name}{' '}
          {person.number}
        </div>
      ))}
    </div>
  );
};

export default Persons;
