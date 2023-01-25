import AddDrugForm from "./components/AddDrugForm";
import axios from "axios";
import { useState } from "react";

function App() {
  const [currentData, setCurrentData] = useState({
    rxCUIs: [],
    interactions: [],
  });

  const getRxCUIs = (formData) => {
    console.log("getRxCUIs called");
    // console.log(formData);
    const newRxCUIs = [];
    for (const drugInfo of formData) {
      axios
        .get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drugInfo.drug}`)
        .then((response) => {
          console.log(response.data);
          console.log(Object.keys(response.data.idGroup).length);
          if (Object.keys(response.data.idGroup).length > 0) {
            console.log(response.data.idGroup.rxnormId[0]);
            newRxCUIs.push(response.data.idGroup.rxnormId[0]);
          } else {
            const errorMessage = `${drugInfo.drug} does not exist.`;
            // console.log(errorMessage);
            alert(errorMessage);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const newCurrentData = { ...currentData, rxCUIs: newRxCUIs };
    console.log(newCurrentData);
    console.log(newRxCUIs);
    setCurrentData(newCurrentData);
  };

  const getInteractions = (formData) => {
    console.log("getInteractions called");
    const newInteractions = [];
    getRxCUIs(formData)
      .then(() => {
        const rxCUIsCode = currentData.rxCUIs.join("+");
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
      })
      .catch((error) => {
        console.log(error);
      });
    const newCurrentData = { ...currentData, interactions: newInteractions };
    console.log(newCurrentData);
    setCurrentData(newCurrentData);
  };

  return (
    <div className="App">
      <header>
        <h1>CheckMate</h1>
      </header>
      <AddDrugForm
        getInteractions={getInteractions}
        getRxCUIs={getRxCUIs}
      ></AddDrugForm>
    </div>
  );
}

export default App;
