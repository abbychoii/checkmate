import React from "react";
// import DrugLabel from "./DrugLabel";
// import OncHighList from "./OncHigh";
// import DrugBankList from "./DrugBankList";
import Interactions from "./Interactions";
//
function Medication({ currentData, idx }) {
  console.log(currentData);
  return (
    <div>
      <h3>{`${currentData.drugs[idx]} rxCUI: ${currentData.rxCUIs[idx]}`}</h3>
      <p>Dose: {currentData.doses[idx]}</p>
      {currentData.frequencies[idx] ? (
        <p>Frequency: {currentData.frequencies[idx]}</p>
      ) : null}
      <Interactions
        currentData={currentData}
        rxCUI={currentData.rxCUIs[idx]}
      ></Interactions>
    </div>
  );
}

export default Medication;
