import { React, useState } from 'react';

export default function Form() {
  const [formVals, setFormVals] = useState({});

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormVals(prev => ({...prev, name}))
  }

  const handleAgeChange = (e) => {
    const age = e.target.value;
    setFormVals(prev => ({...prev, age}))
  }

  return(
    <form onSubmit={e => e.preventDefault()}>
      <label>
        Name:
        <input type="text" value={formVals.name} onChange={handleNameChange}/>
      </label>
      {formVals.name && <label>
        Age:
        <input type='number' value={formVals.age} onChange={handleAgeChange} />
      </label>}
    </form>
  )
};