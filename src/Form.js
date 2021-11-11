import { React, useState, useEffect } from 'react';

export default function Form() {
  const [formVals, setFormVals] = useState({});

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormVals(prev => ({...prev, name}))
  }

  const handleAgeChange = async (e) => {
    const age = e.target.value;
    await setFormVals(prev => ({...prev, age}))
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
        <select name='Dropdown'>
          <option value='One'>One</option>
          <option value='Two'>Two</option>
          <option value='Three'>Three</option>
        </select>
      </label>}

      {formVals.dropdown && <label> 
        Date:
        <input type='date' />  
      </label>}
      
    </form>
  )
};