import AddDrugForm from "./components/AddDrugForm";
import Interactions from "./components/Interactions";
import axios from "axios";
import { useState } from "react";

function App() {
  const [currentData, setCurrentData] = useState({
    rxCUIs: [""],
    interactions: [""],
  });

  const getInteractions = async (formData) => {
    console.log("getInteractions called");
    // console.log(formData);
    let rxCUICodes = [];
    for (let idx in formData) {
      rxCUICodes.push(formData[idx].rxCUI);
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
        const disclaimer = "disclaimer :)";
        console.log(disclaimer);
      }
    } catch (error) {
      console.log(error);
    }
    const newCurrentData = {
      rxCUIs: rxCUICodes,
      interactions: [newInteractions],
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
      <Interactions
        rxCUIs={currentData["rxCUIs"]}
        interactions={currentData["interactions"]}
      ></Interactions>
    </div>
  );
}

export default App;
