import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchableDropdown from "./SearchableDropdown";
import "./AddDrugForm.css";

const AddDrugForm = ({ getInteractions, type, addMedsToMedList }) => {
  const [formData, setFormData] = useState([
    {
      drug: "",
      dose: "",
      frequency: "",
      rxCUI: "",
      save: "",
    },
  ]);

  const [drugSuggestions, setDrugSuggestions] = useState({
    drugNames: [""],
    doses: [""],
    rxCUIs: [""],
    only: false,
  });

  const [edit, setEdit] = useState([true]);

  useEffect(() => {
    setDrugSuggestions({
      drugNames: [""],
      doses: [""],
      rxCUIs: [""],
      only: false,
    });
  }, [edit]);

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
          drugNames: response.data[1],
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
        only: false,
      });
      const newEdit = [...edit, true];
      newEdit[index] = false;
      setEdit(newEdit);
    } else {
      alert("Drug Name and Dose are Required");
    }
  };

  const removeFormData = (i) => {
    let newFormData = [...formData];
    newFormData.splice(i, 1);
    setFormData(newFormData);

    let newEdit = [...edit];
    newEdit.splice(i, 1);
    if (newEdit.includes(true) === false) {
      newEdit[newEdit.length - 1] = true;
    }
    setEdit(newEdit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.length < 2 && type === "interactioncheck") {
      alert("More than 1 Drug is Necessary to Check Interactions");
    } else if (
      !formData[formData.length - 1].drug ||
      !formData[formData.length - 1].dose
    ) {
      type === "interactioncheck"
        ? alert("Drug Name and Dose are Required to Check Interactions")
        : alert("Drug Name and Dose are Required to add to Med List");
    } else {
      const newFormData = [];
      for (let idx in formData) {
        const drugName = formData[idx]["drug"].split(" (")[0].toLowerCase();
        console.log(`drugName= ${drugName}`);
        newFormData.push({ ...formData[idx], drug: drugName });
      }
      console.log(newFormData);
      if (type === "interactioncheck") {
        getInteractions(newFormData, type);
      } else if (type === "profilemedupdate") {
        addMedsToMedList(newFormData);
      }
      setFormData([
        {
          drug: "",
          dose: "",
          frequency: "",
          rxCUI: "",
        },
      ]);
      setDrugSuggestions({
        drugNames: [""],
        doses: [""],
        rxCUIs: [""],
        only: false,
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

  const handleEditClick = (i) => {
    console.log("handleEditClick called");
    console.log(edit[i]);
    const last = edit.length - 1;
    const newEdit = [...edit];
    newEdit[i] = !newEdit[i];
    newEdit[last] = !newEdit[last];
    // console.log(newEdit);
    setEdit(newEdit);
    console.log(newEdit);
  };

  const showEditButton = (i) => {
    if (edit.slice(0, -1).includes(true)) {
      if (edit[i]) {
        return true;
      }
      return false;
    } else {
      if (i === formData.length - 1) {
        // last item and edit = true, don't show the edit button
        return false;
      } else {
        return true;
      }
    }
  };
  const showDelButton = (i) => {
    if (edit.slice(0, -1).includes(true)) {
      if (edit[i]) {
        return false;
      }
      return true;
    } else if (i > 0 || formData.length - 1) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div className='drugForm flex flex-grow justify-evenly lg:my-15 rounded-[5rem] bg-white border-[20px] lg:border-[20px] border-yellow-200 '>
        <form className='flex flex-grow lg:my-10 py-10 md:px-20 flex-col px-5'>
          {formData.map((element, index) => {
            return (
              <div>
                <div
                  className='medData flex flex-col md:flex-row flex-grow place-content-between items-center'
                  key={index}
                >
                  <div className='info'>
                    {index === 0 ? (
                      <label
                        htmlFor='drug'
                        className='lg:text-[1.5rem] font-bold lg:ml-4 flex flex-nowrap'
                      >
                        Drug
                        {
                          <span className='valid-req italic text-gray-400 text-[0.7rem] lg:text-[1rem] lg:font-normal'>
                            {" "}
                            required*
                          </span>
                        }
                      </label>
                    ) : null}
                    <SearchableDropdown
                      options={drugSuggestions.drugNames}
                      idx={index}
                      id='drug'
                      name='drug'
                      selectedVal={element.drug}
                      length={formData.length}
                      onDropdownChange={(e) =>
                        handleDropdownChange(index, e, "drug")
                      }
                      edit={edit[index]}
                    ></SearchableDropdown>
                  </div>
                  <div className='info'>
                    {index === 0 ? (
                      <label
                        htmlFor='dose'
                        className='lg:text-[1.5rem] font-bold lg:ml-4 flex flex-nowrap'
                      >
                        Dose
                        <span className='valid-req font-normal italic text-gray-400 lg:text-[1rem] text-[0.7rem]'>
                          {" "}
                          required*
                        </span>
                      </label>
                    ) : null}
                    <SearchableDropdown
                      options={drugSuggestions.doses}
                      idx={index}
                      length={formData.length}
                      id='dose'
                      name='dose'
                      selectedVal={element.dose}
                      edit={edit[index]}
                      onDropdownChange={(e) =>
                        handleDropdownChange(index, e, "dose").then(
                          findRxCUI(index)
                        )
                      }
                    ></SearchableDropdown>
                  </div>
                  <div className='info freq flex flex-col'>
                    {index === 0 ? (
                      <label
                        htmlFor='freq'
                        className='flex flex-nowrap lg:text-[1.5rem] font-bold lg:ml-4 align-top'
                      >
                        Frequency
                        {
                          <span className='valid-opt italic text-gray-400 lg:text-[1rem] font-normal text-[0.7rem]'>
                            optional
                          </span>
                        }
                      </label>
                    ) : null}
                    <div className='inputContainer flex flex-grow'>
                      <input
                        className='freqInput flex self-center border-[0.05rem] border-gray-400 rounded-full py-2 pl-5 w-full text-[1.2rem] disabled:bg-[#BABABA] bg-opacity-20 placeholder:italic placeholder:text-[1rem]'
                        type='text'
                        id='freq'
                        name='frequency'
                        value={element.frequency || ""}
                        placeholder='frequency'
                        onChange={(e) => handleChange(index, e)}
                        // edit={edit[index]}
                        disabled={
                          edit[index] || formData.length === 1 ? false : true
                        }
                      />
                    </div>
                  </div>

                  <div className='info flex flex-grow content-center'>
                    {showDelButton(index) ? (
                      <button
                        type='button'
                        className=' ml-2 self-center btnX'
                        onClick={() => removeFormData(index)}
                      >
                        {`x`}
                      </button>
                    ) : null}
                    {showEditButton(index) ? (
                      <button
                        type='button'
                        className='btnX self-center ml-2'
                        onClick={() => handleEditClick(index)}
                      >
                        {edit[index] ? "Done" : "Edit"}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
          <div className='btnContainer flex flex-col justify-evenly gap-2 mb-5 '>
            {type === "interactioncheck" ? (
              <button
                className='btn py-2 border-dashed border-2 border-opacity-20  border-gray-600 bg-gray-100 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-50 hover:shadow-2xl focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out text-[1rem]'
                type='button'
                onClick={() => addFormFields()}
              >
                Add Drug
              </button>
            ) : null}
            {type === "interactioncheck" ? (
              <input
                className='btn py-2 border-2 bg-black border-black text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md focus:bg-gray-800-700 focus:shadow-lg hover:shadow-xl focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out md:text-[1rem]'
                type='submit'
                value={"Check Interactions"}
                onClick={handleSubmit}
              />
            ) : (
              <input
                className='btn py-2 border-2 bg-black border-black text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md focus:bg-gray-800-700 focus:shadow-lg hover:shadow-xl focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out md:text-[1rem]'
                type='submit'
                value='Add to Medication Journal'
                onClick={handleSubmit}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDrugForm;
