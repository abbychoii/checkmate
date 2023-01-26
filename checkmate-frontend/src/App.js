import AddDrugForm from "./components/AddDrugForm";
// import Interactions from "./components/Interactions";
import axios from "axios";
import { useState } from "react";

function App() {
  const [currentData, setCurrentData] = useState({
    rxCUIs: [],
    interactions: [],
  });

  const getRxCUIs = async (formData) => {
    console.log("getRxCUIs called");
    // console.log(formData);
    const newRxCUIs = [];
    for (const drugInfo of formData) {
      try {
        let response = await axios.get(
          `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drugInfo.drug}`
        );
        console.log(response.data);
        console.log(Object.keys(response.data.idGroup).length);
        if (Object.keys(response.data.idGroup).length > 0) {
          console.log(response.data.idGroup.rxnormId[0]);
          newRxCUIs.push(response.data.idGroup.rxnormId[0]);
        }
      } catch (error) {
        const errorMessage = `${drugInfo.drug} does not exist.`;
        // console.log(errorMessage);
        alert(errorMessage);
      }
    }
    console.log(newRxCUIs);
    return newRxCUIs;
  };

  const getInteractions = async (formData) => {
    console.log("getInteractions called");
    const newInteractions = [];
    let rxCUICodes = await getRxCUIs(formData);
    try {
      const rxCUIsCode = rxCUICodes.join("+");
      let interactionURL = `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxCUIsCode}`;
      axios.get(interactionURL).then((response) => {
        if ("fullInteractionTypeGroup" in response.data) {
          const interactions = response.data.fullInteractionTypeGroup.length;
          console.log(interactions);
          console.log(response.data);
          newInteractions.push(interactions);
        } else {
          const disclaimer = "disclaimer :)";
          console.log(disclaimer);
        }
      });
    } catch (error) {
      console.log(error);
    }
    const newCurrentData = {
      rxCUIs: rxCUICodes,
      interactions: newInteractions,
    };
    console.log(newCurrentData);
    setCurrentData(newCurrentData);
  };

  return (
    <div className="App">
      <header>
        <h1>CheckMate</h1>
      </header>
      <AddDrugForm getInteractions={getInteractions}></AddDrugForm>
    </div>
  );
}

export default App;
