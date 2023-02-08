import React from "react";
// import DrugLabel from "./DrugLabel";
// import OncHighList from "./OncHigh";
// import DrugBankList from "./DrugBankList";
import Interactions from "./Interactions";
// import axios from "axios";
//
function Medication({ currentData, idx }) {
  const getDrugTitle = () => {
    const rxCUI = currentData.rxCUIs[idx];
    const data = currentData.interactions[0][0];
    if (typeof currentData.interactions[0][0] !== "string") {
      for (let i in data.fullInteractionType) {
        if (data.fullInteractionType[i].minConcept[0].rxcui === rxCUI) {
          return (
            <a
              href={
                data.fullInteractionType[i].interactionPair[0]
                  .interactionConcept[0].sourceConceptItem.url
              }
            >
              <h3>{`${currentData.drugs[idx]} rxCUI: ${currentData.rxCUIs[idx]}`}</h3>
            </a>
          );
        } else if (data.fullInteractionType[i].minConcept[1].rxcui === rxCUI) {
          return (
            <a
              href={
                data.fullInteractionType[i].interactionPair[0]
                  .interactionConcept[1].sourceConceptItem.url
              }
            >
              <h3>{`${currentData.drugs[idx]} rxCUI: ${currentData.rxCUIs[idx]}`}</h3>
            </a>
          );
        }
      }
    }
    return (
      <h3>{`${currentData.drugs[idx]} rxCUI: ${currentData.rxCUIs[idx]}`}</h3>
    );
  };

  const getPriceLink = () => {
    const drugName = currentData.drugs[idx].toLowerCase().split(" ").join("-");
    const URL = "https://www.goodrx.com/";
    const URLAttempt = URL + drugName;
    return (
      <p>
        <a href={URLAttempt}>Price Information from GoodRx</a>
      </p>
    );
    // axios
    //   .get(URLAttempt, { withCredentials: false })
    //   .then((response) => {
    //     console.log(response);
    //     return (
    //
    //     );
    //   })
    //   .catch((error) => {
    //     console.log(error.response.status);
    //     return null;
    //   });
  };

  return (
    <div>
      {getDrugTitle()}
      <p>Dose: {currentData.doses[idx]}</p>
      {currentData.frequencies[idx] ? (
        <p>Frequency: {currentData.frequencies[idx]}</p>
      ) : null}
      {getPriceLink()}
      <Interactions
        currentData={currentData}
        rxCUI={currentData.rxCUIs[idx]}
      ></Interactions>
    </div>
  );
}

export default Medication;
