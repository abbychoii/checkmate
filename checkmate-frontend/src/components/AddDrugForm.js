import React from "react";
import { useState } from "react";
import axios from "axios";

const INITIAL_FORM_DATA = {
  drug: "",
  dose: "",
  frequency: "",
};

const AddDrugForm = ({ getInteractions, getRxCUIs }) => {
  const [formData, setFormData] = useState([INITIAL_FORM_DATA]);
  const [suggestions, setSuggestions] = useState([]);
  // console.log(formData);

  const handleChange = async (i, e) => {
    let newFormData = [...formData];
    // console.log(e);
    // console.log(e.target);
    newFormData[i][e.target.name] = e.target.value;
    setFormData(newFormData);

    let suggestionsData = [];
    let response = await axios.get(
      `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${e.target.value}&ef=STRENGTHS_AND_FORMS`
    );
    console.log(response.data);
    try {
      let suggestions = response.data[1];
      for (let idx in suggestions) {
        suggestionsData.push(suggestions[idx]);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(suggestionsData);
    setSuggestions(suggestionsData);
  };

  const addFormFields = () => {
    setFormData([...formData, { drug: "", dose: "", frequency: "" }]);
  };

  const removeFormData = (i) => {
    let newFormData = [...formData];
    newFormData.splice(i, 1);
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFormData = [];
    for (let idx in formData) {
      const drugName = formData[idx]["drug"].split(" (")[0].toLowerCase();
      console.log(`drugName= ${drugName}`);
      newFormData.push({ ...formData[idx], drug: drugName });
    }
    getInteractions(newFormData);
    // alert(JSON.stringify(formData));
  };

  return (
    <form>
      {formData.map((element, index) => {
        return (
          <div className="inline-form" key={index}>
            <label htmlFor="drug"> Drug Name:</label>
            <input
              type="search"
              list="drug-name-suggestions"
              id="drug"
              name="drug"
              value={element.drug || ""}
              placeholder="drug name"
              onChange={(e) => handleChange(index, e)}
            />
            <datalist id="drug-name-suggestions">
              {suggestions.map((suggestion, idx) => {
                return <option key={idx} value={suggestion}></option>;
              })}
            </datalist>
            <label htmlFor="dose"> Dose:</label>
            <input
              type="text"
              id="dose"
              name="dose"
              value={element.dose || ""}
              placeholder="dose"
              onChange={(e) => handleChange(index, e)}
            />
            <label htmlFor="freq"> Frequency:</label>
            <input
              type="text"
              id="freq"
              name="frequency"
              value={element.frequency || ""}
              placeholder="frequency"
              onChange={(e) => handleChange(index, e)}
            />
            {index ? (
              <button
                type="button"
                className="button remove"
                onClick={() => removeFormData(index)}
              >
                X
              </button>
            ) : null}
          </div>
        );
      })}
      <button type="button" onClick={() => addFormFields()}>
        Add Drug
      </button>
      <input type="submit" value="Check Interactions" onClick={handleSubmit} />
    </form>
  );
};

export default AddDrugForm;
