import React from "react";
// import parse from "html-react-parser";
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
  // console.log(currentData);
  const rxCUI = currentData.rxCUIs[idx];
  const drugLabel = getDrugLabel(rxCUI);
  console.log(drugLabel)
  // const reactions = drugLabel.results.hasOwnProperty('adverse_reactions') ? drugLabel.results.adverse_reactions[0] : null
  // console.log(reactions)
  // const reactionTable = drugLabel.results.hasOwnProperty('adverse_reactions_table') ? parse(drugLabel.results.adverse_reactions_table[0]) : null
  // console.log(reactionTable)

  return (<div>
    <div>
      <h3>Drug Label Information:</h3>
      {/* {reactions} */}
      <br></br>
      {/* {reactionTable} */}
      </div>
    </div>);
}

export default DrugLabel;
