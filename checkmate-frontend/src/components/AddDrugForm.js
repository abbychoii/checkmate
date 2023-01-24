import React from "react";
import { useState } from "react"

const INITIAL_FORM_DATA = {
  drug: "",
  dose: "",
  frequency: ""
}

const AddDrugForm = () => {
  const [formData, setFormData] = useState([INITIAL_FORM_DATA]);
  console.log(formData)

  const handleChange = (i, e) => {
    let newFormData = [...formData];
    console.log(e)
    console.log(e.target)
    newFormData[i][e.target.name] = e.target.value;
    setFormData(newFormData);
  }

  const addFormFields = () => {
    setFormData([...formData, {drug: "", dose:"", frequency:""}])
  }

  const removeFormData = (i) => {
    let newFormData = [...formData];
    newFormData.splice(i,1);
    setFormData(newFormData)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formData));
  }

  return (
  <form>
    {formData.map((element,index) => {
      return (
      <div className="inline-form" key={index}>
        <label htmlFor="drug"> Drug Name:</label>
        <input type="text" id="drug" name="drug" value={element.drug || ""} onChange={e => handleChange(index,e)}/>
        <label htmlFor="dose"> Dose:</label>
        <input type="text" id="dose" name="dose" value={element.dose || ""} onChange={e => handleChange(index,e)}/>
        <label htmlFor="freq"> Frequency:</label>
        <input type="text" id="freq" name="frequency" value={element.frequency || ""} onChange={e => handleChange(index,e)}/>
        { index ? <button type="button" className="button remove" onClick= {() => removeFormData(index)}>X</button> : null}
      </div>
    )})}
    <button type="button" onClick={() => addFormFields()}>Add Drug</button>
    <input type="submit" value="Check Interactions" onClick={handleSubmit} />
  </form>
  )
  }

export default AddDrugForm