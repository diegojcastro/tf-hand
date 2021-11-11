import { React, useState, useEffect } from 'react';

export default function Form() {
  const [formVals, setFormVals] = useState({});

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormVals(prev => ({...prev, name}))
  }

  const handleAgeChange = (e) => {
    const age = e.target.value;
    setFormVals({name: formVals.name, age});
  }

  const handleDropChange = (e) => {
    setFormVals(prev => ({...prev, dropdown: e.target.value}))
  }

  useEffect( () => {
    console.log("Form vals are:");
    console.log(formVals);
  }, [formVals])

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
      
      {formVals.age && <label>
        Dropdown:
        <select name='Dropdown' value={formVals.dropdown} onChange={handleDropChange}>
          <option disabled selected value>Select a num</option>
          <option value='One'>One</option>
          <option value='Two'>Two</option>
          <option value='Three'>Three</option>
        </select>
      </label>}

      {(formVals.dropdown && formVals.dropdown !== 'One') && <label> 
        Date:
        <input type='date' />  
      </label>}
      
    </form>
  )
};