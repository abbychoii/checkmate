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
    console.log(formData);
    const newRxCUIs = [];
    for (const drugInfo of formData) {
      axios
        .get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drugInfo.drug}`)
        .then((response) => {
          // console.log(response.data);
          if (Object.keys(response.data.idGroup).length > 0) {
            newRxCUIs.push(parseInt(response.data.idGroup.rxnormId[0]));
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
    setCurrentData(newCurrentData);
  };

  return (
    <div className="App">
      <header>
        <h1>CheckMate</h1>
      </header>
      <AddDrugForm getRxCUIs={getRxCUIs}></AddDrugForm>
    </div>
  );
}

export default App;
