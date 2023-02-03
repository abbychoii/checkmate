import React from "react";
// import { useState } from "react";
// {
//   purpose: purpose,
//   indicationUses: indicationUses,
//   doNotUseWarning: doNotUseWarning,
//   warnings: warnings,
//   askDoc: askDoc,
//   stopUse: stopUse,
// };
function DrugLabel({ currentData, idx, getDrugLabel }) {
  console.log(currentData);
  // const [displayDrugLabel, setDisplayDrugLabel] = useState(
  //   Array(currentData.drugs.length).fill({
  //     purpose: false,
  //     warnings: false,
  //     askDoc: false,
  //     stopUse: false,
  //   })
  // );
  // const drugName = currentData.drugs[idx];
  const rxCUI = currentData.rxCUIs[idx];
  const drugLabel = getDrugLabel(rxCUI);
  // const updateDisplay = (label) => {
  //   const newDisplayDrugLabel = [...displayDrugLabel];
  //   newDisplayDrugLabel[idx].purpose = !newDisplayDrugLabel[idx].purpose;
  //   setDisplayDrugLabel(newDisplayDrugLabel);
  // };
  return (
    <div>
      <p>Indications and Usage: {drugLabel.inidcationsUsage}</p>
    </div>
  );
}

export default DrugLabel;
