import AddDrugForm from "./components/AddDrugForm";
import MedicationData from "./components/MedicationData";
import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [currentData, setCurrentData] = useState({
    rxCUIs: [""],
    interactions: [""],
    doses: [""],
    drugs: [""],
    frequencies: [""]
  });
  const [display, setDisplay] = useState(false);
  const getInteractions = async (formData) => {
    console.log("getInteractions called");
    // console.log(formData);
    const rxCUICodes = [];
    const drugs = [];
    const doses = [];
    const frequencies = [];
    for (let idx in formData) {
      rxCUICodes.push(formData[idx].rxCUI);
      let drugName =
        formData[idx].drug.charAt(0).toUpperCase() +
        formData[idx].drug.slice(1);
      drugs.push(drugName);
      doses.push(formData[idx].dose);
      frequencies.push(formData[idx].frequency);
    }
    const newInteractions = [];
    const rxCUIsCode = rxCUICodes.join("+");
    let interactionURL = `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxCUIsCode}`;
    const response = await axios.get(interactionURL);
    try {
      if ("fullInteractionTypeGroup" in response.data) {
        const interactions = response.data.fullInteractionTypeGroup;
        console.log(interactions);
        console.log(response.data);
        newInteractions.push(interactions);
      } else {
        const disclaimer = response.data.nlmDisclaimer;
        console.log(disclaimer);
        newInteractions.push([disclaimer]);
      }
    } catch (error) {
      console.log(error);
    }
    const newCurrentData = {
      rxCUIs: rxCUICodes,
      interactions: newInteractions,
      drugs: drugs,
      doses: doses,
      frequencies: frequencies
    };
    console.log(newCurrentData);
    setCurrentData(newCurrentData);
  };

  const getDrugLabel = async (rxCUI) => {
    const URL = `https://api.fda.gov/drug/label.json?search=openfda.rxcui:${rxCUI}`;
    // const warnings = []
    const response = await axios.get(URL);
    try {
      // const purpose = response.results[0].purpose[0];
      const indicationUses = response.results[0].indications_and_usage[0];
      // const warnings = response.results[0].warnings[0];
      // const doNotUseWarning = response.results[0].do_not_use[0];
      // const askDoc = response.results[0].ask_doctor[0];
      // const stopUse = response.results[0].stop_use[0];
      return {
        //   purpose: purpose,
        indicationUses: indicationUses
        //   doNotUseWarning: doNotUseWarning,
        //   warnings: warnings,
        //   askDoc: askDoc,
        //   stopUse: stopUse,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid h-screen grid-cols-10 w-screen">
      <div className="grid col-start-3 col-span-6 mt-20">
        <div className="flex flex-col content-start">
          <h1>CheckMate</h1>
          <div className="blurb">
            <h3>Welcome to CheckMate!</h3>
            CheckMate aims to provide a place to search your medications or
            medications of interest and see potential interactions and side
            effects.
          </div>
          <button className="btn" onClick={() => setDisplay(!display)}>
            {display
              ? "Hide Medication CheckMate"
              : "Show Medication CheckMate"}
          </button>
          {display ? (
            <div>
              <AddDrugForm getInteractions={getInteractions}></AddDrugForm>
              <MedicationData
                currentData={currentData}
                getDrugLabel={getDrugLabel}
              ></MedicationData>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
