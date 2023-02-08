import React from "react";
import { useState } from "react";
import axios from "axios";
import SearchableDropdown from "./SearchableDropdown";
import "./AddDrugForm.css";

const AddDrugForm = ({ getInteractions }) => {
  const [formData, setFormData] = useState([
    {
      drug: "",
      dose: "",
      frequency: "",
      rxCUI: ""
    }
  ]);

  const [drugSuggestions, setDrugSuggestions] = useState({
    drugNames: [""],
    doses: [""],
    rxCUIs: [""],
    only: false
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
    // console.log(response.data);
    // console.log(formData[i].drug);
    try {
      let newDrugSuggestions = {};
      if (response.data[0] === 1) {
        newDrugSuggestions["drugNames"] = response.data[1];
        newDrugSuggestions["only"] = true;
        newDrugSuggestions["doses"] =
          response.data[2]["STRENGTHS_AND_FORMS"][0];
        newDrugSuggestions["rxCUIs"] = response.data[2]["RXCUIS"][0];
      } else if (response.data[1].includes(formData[i].drug)) {
        // console.log("met else if");
        for (let idx in response.data[1]) {
          // console.log(formData[i].drug);
          if (response.data[1][idx] === formData[i].drug) {
            newDrugSuggestions["drugNames"] = [response.data[1][idx]];
            newDrugSuggestions["doses"] =
              response.data[2]["STRENGTHS_AND_FORMS"][idx];
            newDrugSuggestions["rxCUIs"] = response.data[2]["RXCUIS"][idx];
            newDrugSuggestions["only"] = true;
          }
        }
      } else {
        newDrugSuggestions = {
          ...drugSuggestions,
          drugNames: response.data[1]
        };
      }
      console.log(newDrugSuggestions);
      // console.log(suggestionDoseData);
      setDrugSuggestions(newDrugSuggestions);
    } catch (error) {
      console.log(error);
    }
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
    const index = formData.length - 1;
    if (formData[index].dose && formData[index].drug) {
      setFormData([...formData, { drug: "", dose: "", frequency: "" }]);
      setDrugSuggestions({
        drugNames: [""],
        doses: [""],
        rxCUIs: [""],
        only: false
      });
    } else {
      alert("Drug Name and Dose are Required");
    }
  };

  const removeFormData = (i) => {
    let newFormData = [...formData];
    newFormData.splice(i, 1);
    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.length < 2) {
      alert("More than 1 Drug is Necessary to Check Interactions");
    } else if (
      !formData[formData.length - 1].drug ||
      !formData[formData.length - 1].dose
    ) {
      alert("Drug Name and Dose are Required to Check Interactions");
    } else {
      const newFormData = [];
      for (let idx in formData) {
        const drugName = formData[idx]["drug"].split(" (")[0].toLowerCase();
        console.log(`drugName= ${drugName}`);
        newFormData.push({ ...formData[idx], drug: drugName });
      }
      console.log(newFormData);
      getInteractions(newFormData);
      setFormData([
        {
          drug: "",
          dose: "",
          frequency: "",
          rxCUI: ""
        }
      ]);
      setDrugSuggestions({
        drugNames: [""],
        doses: [""],
        rxCUIs: [""],
        only: false
      });
    }
  };

  const handleDropdownChange = async (i, e, type) => {
    const response = await handleDropdown(i, e, type);
    try {
      getSuggestions(i, e);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropdown = (i, e, type) => {
    const newFormData = [...formData];
    console.log(type);
    if (type === "drug") {
      newFormData[i]["dose"] = "";
    }
    newFormData[i][type] = e.target.value;
    setFormData(newFormData);

    return e;
  };

  return (
    <div className="drugForm flex flex-grow justify-evenly">
      <form className="flex flex-col">
        {formData.map((element, index) => {
          return (
            <div className="medData flex flex-row flex-grow" key={index}>
              <div className="info">
                {index === 0 ? (
                  <label htmlFor="drug">
                    Drug {<span className="valid-req"> required</span>}
                  </label>
                ) : null}
                <SearchableDropdown
                  options={drugSuggestions.drugNames}
                  idx={index}
                  id="drug"
                  name="drug"
                  selectedVal={element.drug}
                  length={formData.length}
                  onDropdownChange={(e) =>
                    handleDropdownChange(index, e, "drug")
                  }
                ></SearchableDropdown>
              </div>
              <div className="info">
                {index === 0 ? (
                  <label htmlFor="dose">
                    Dose {<span className="valid-req"> required</span>}{" "}
                  </label>
                ) : null}
                <SearchableDropdown
                  options={drugSuggestions.doses}
                  idx={index}
                  length={formData.length}
                  id="dose"
                  name="dose"
                  selectedVal={element.dose}
                  onDropdownChange={(e) =>
                    handleDropdownChange(index, e, "dose").then(
                      findRxCUI(index)
                    )
                  }
                ></SearchableDropdown>
              </div>
              <div className="info freq flex min-h-full flex-col">
                {index === 0 ? (
                  <label htmlFor="freq" className="">
                    Frequency
                    {<span className="valid-opt"> optional</span>}
                  </label>
                ) : null}
                <div className="inputContainer flex flex-grow">
                  <input
                    className="freqInput flex self-center border-2 h-8 ml-3"
                    type="text"
                    id="freq"
                    name="frequency"
                    value={element.frequency || ""}
                    placeholder="frequency"
                    onChange={(e) => handleChange(index, e)}
                    // disabled={index === formData.length - 1 ? false : true}
                  />
                </div>
              </div>
              {index || formData.length > 1 ? (
                <div className="info flex content-center">
                  <button
                    type="button"
                    className="btnX"
                    onClick={() => removeFormData(index)}
                  >
                    {/* {`Delete ${formData[index].drug}`} */}
                    {`x`}
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
        <div className="btnContainer flex flex-col justify-evenly my-5 gap-2">
          <button
            className="btn h-10 border-dashed border-2 border-opacity-20  border-gray-600 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
            type="button"
            onClick={() => addFormFields()}
          >
            Add Drug
          </button>
          <input
            className="btn h-10 border-2 border-blue-400 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
            type="submit"
            value="Check Interactions"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default AddDrugForm;
