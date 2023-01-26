import React from "react";
import { useState } from "react";
import axios from "axios";

const INITIAL_FORM_DATA = {
  drug: "",
  dose: "",
  frequency: "",
};

const AddDrugForm = ({ getInteractions }) => {
  const [formData, setFormData] = useState([INITIAL_FORM_DATA]);
  const [drugSuggestions, setDrugSuggestions] = useState({
    drugNames: [],
    doses: [],
    rxCUIs: [],
  });
  const handleChange = async (i, e) => {
    let newFormData = [...formData];
    // console.log(e);
    // console.log(e.target);
    newFormData[i][e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  const nameSuggestion = async (e) => {
    let response = await axios.get(
      `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${e.target.value}&ef=STRENGTHS_AND_FORMS`
    );
    console.log(response.data);
    try {
      let suggestionsNameData = response.data[1];
      setDrugSuggestions({
        ...drugSuggestions,
        drugNames: suggestionsNameData,
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(suggestionsNameData);
    // setDrugSuggestions({ ...drugSuggestions, drugName: suggestionsNameData });
  };

  const doseSuggestion = async (e) => {
    // let suggestionsDoseData = [];
    console.log("doseSuggestion has been called");
    let response = await axios.get(
      `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${e.target.value}&ef=STRENGTHS_AND_FORMS,RXCUIS`
    );
    console.log(response.data);
    try {
      let doseSuggestions = response.data[2]["STRENGTHS_AND_FORMS"][0];
      console.log(doseSuggestions);
      // setDrugSuggestions([])
      setDrugSuggestions({ ...drugSuggestions, doses: doseSuggestions });
    } catch (error) {
      console.log(error);
    }
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
              // value={element.drug || ""}
              placeholder="drug name"
              onChange={(e) => handleChange(index, e).then(nameSuggestion(e))}
              onClick={(e) => doseSuggestion(e)}
            />
            <datalist id="drug-name-suggestions">
              {drugSuggestions.drugNames.map((suggestion, idx) => {
                return <option key={idx} value={suggestion}></option>;
              })}
            </datalist>
            {/* <label htmlFor="dose"> Dose:</label>
            <input
              type="search"
              list="dose-suggestions"
              id="dose"
              name="dose"
              value={element.dose || ""}
              placeholder="dose"
              onChange={(e) => handleChange(index, e)}
              // disabled="disabled"
            />
            <datalist id="dose-suggestions">
              {drugSuggestions.doses.map((suggestion, idx) => {
                return (
                  <option key={idx} value={suggestion}>
                    {suggestion}
                  </option>
                );
              })}
            </datalist> */}
            <label htmlFor="dose"> Dose:</label>
            <select id="dose" onChange={(e) => handleChange(index, e)}>
              {drugSuggestions.doses.map((suggestion, idx) => {
                return (
                  <option key={idx} value={suggestion}>
                    {suggestion}
                  </option>
                );
              })}
            </select>
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
