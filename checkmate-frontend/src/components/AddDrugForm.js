import React from "react";
import { useState } from "react";
import axios from "axios";

const INITIAL_FORM_DATA = {
  drug: "",
  dose: "",
  frequency: "",
  rxCUI: "",
};

const AddDrugForm = ({ getInteractions }) => {
  const [formData, setFormData] = useState([INITIAL_FORM_DATA]);
  const [drugSuggestions, setDrugSuggestions] = useState({
    drugNames: [""],
    doses: [""],
    rxCUIs: [""],
    only: false,
  });

  const handleChange = async (i, e) => {
    let newFormData = [...formData];
    // console.log(e);
    // console.log(e.target);
    newFormData[i][e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  const getSuggestions = async (i, e) => {
    let response = await axios.get(
      `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${e.target.value}&ef=STRENGTHS_AND_FORMS,RXCUIS`
    );
    console.log(response.data);
    console.log(formData[i].drug);
    try {
      const newDrugSuggestions = { ...drugSuggestions };
      if (response.data[0] === 1) {
        newDrugSuggestions["only"] = true;
        newDrugSuggestions["doses"] =
          response.data[2]["STRENGTHS_AND_FORMS"][0];
        newDrugSuggestions["rxCUIs"] = response.data[2]["RXCUIS"][0];
      } else if (response.data[1].includes(formData[i].drug)) {
        console.log("met else if");
        for (let idx in response.data[1]) {
          console.log(formData[i].drug);
          if (response.data[1][idx] === formData[i].drug) {
            newDrugSuggestions["drugNames"] = [response.data[1][idx]];
            newDrugSuggestions["doses"] =
              response.data[2]["STRENGTHS_AND_FORMS"][idx];
            newDrugSuggestions["rxCUIs"] = response.data[2]["RXCUIS"][idx];
            newDrugSuggestions["only"] = true;
          }
        }
      } else {
        newDrugSuggestions["drugNames"] = response.data[1];
      }
      console.log(newDrugSuggestions);
      // console.log(suggestionDoseData);
      setDrugSuggestions(newDrugSuggestions);
    } catch (error) {
      console.log(error);
    }
    // console.log(suggestionsNameData);
    // setDrugSuggestions({ ...drugSuggestions, drugName: suggestionsNameData });
  };

  const findRxCUI = (i) => {
    if (drugSuggestions.only) {
      for (let idx in drugSuggestions.doses) {
        if (drugSuggestions.doses[idx] === formData[i].dose) {
          const newFormData = [...formData];
          newFormData[i].rxCUI = drugSuggestions.rxCUIs[idx];
          setFormData(newFormData);
        }
      }
    }
  };

  const addFormFields = () => {
    // const i = formData.length - 1;
    // if (
    //   drugSuggestions.drugNames.includes(formData[i].drug) &&
    //   drugSuggestions.doses.includes(formData[i].dose)
    // ) {
    setFormData([...formData, { drug: "", dose: "", frequency: "" }]);
    setDrugSuggestions({
      drugNames: [""],
      doses: [""],
      rxCUIs: [""],
      only: false,
      //   });
      // } else {
      //   alert("Invalid Drug Name was entered.");
      // }
    });
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
  };

  // const disableDose = (index) => {
  //   if (
  //     drugSuggestions.drugNames.includes(formData[index].drug) &&
  //     formData[index].drug
  //   ) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // const disableSubmit = () => {
  //   const i = formData.length - 1;
  //   if (
  //     drugSuggestions.drugNames.includes(formData[i].drug) &&
  //     drugSuggestions.doses.includes(formData[i].dose) &&
  //     formData.length > 1
  //     // formData[i].drug &&
  //     // formData[i].dose
  //   ) {
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <form>
      {formData.map((element, index) => {
        return (
          <div className="inline-form" key={index}>
            <label htmlFor="drug"> Drug Name*:</label>
            <input
              type="search"
              list="drug-name-suggestions"
              id="drug"
              name="drug"
              value={element.drug || ""}
              placeholder="drug name"
              onChange={(e) =>
                handleChange(index, e).then(getSuggestions(index, e))
              }
              required={true}
            />
            <datalist id="drug-name-suggestions">
              {drugSuggestions.drugNames.map((suggestion, idx) => {
                return <option key={idx} value={suggestion}></option>;
              })}
            </datalist>
            <label htmlFor="dose"> Dose*:</label>
            <input
              type="search"
              list="dose-suggestions"
              id="dose"
              name="dose"
              value={element.dose || ""}
              placeholder="dose"
              onChange={(e) => handleChange(index, e).then(findRxCUI(index))}
              required={true}
              // disabled={disableDose(index)}
            />
            <datalist id="dose-suggestions">
              {drugSuggestions.doses.map((suggestion, idx) => {
                return (
                  <option key={idx} value={suggestion}>
                    {suggestion}
                  </option>
                );
              })}
            </datalist>
            {/* <label htmlFor="dose">Dose*:</label>
            <select
              name="dose"
              onChange={(e) => handleChange(index, e).then(findRxCUI(index))}
              required={true}
              // disabled={disableDose(index)}
              placeholder="dose"
            >
              {drugSuggestions.doses.map((suggestion, idx) => {
                return (
                  <option key={idx} value={suggestion}>
                    {suggestion}
                  </option>
                );
              })}
            </select> */}
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
      <button
        type="button"
        onClick={() => addFormFields()}
        disabled={
          formData[formData.length - 1]["drug"] &&
          formData[formData.length - 1]["dose"]
            ? false
            : true
        }
      >
        Add Drug
      </button>
      <input
        type="submit"
        value="Check Interactions"
        onClick={handleSubmit}
        disabled={formData.length < 2}
      />
    </form>
  );
};

export default AddDrugForm;
