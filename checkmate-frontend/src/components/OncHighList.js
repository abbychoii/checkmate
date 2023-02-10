import React from "react";
import OncHigh from "./OncHigh";

const OncHighList = ({ interactions, rxCUI }) => {
  const OncHighComponents = [];
  const data = interactions[0][1];
  // console.log(data);
  for (let i in data.fullInteractionType) {
    if (
      data.fullInteractionType[i].minConcept[0].rxcui === rxCUI ||
      data.fullInteractionType[i].minConcept[1].rxcui === rxCUI
    ) {
      OncHighComponents.push(
        <OncHigh key={i} id={i} interactions={interactions}></OncHigh>
      );
    }
  }
  if (OncHighComponents[0]) {
    return (
      <div>
        {OncHighComponents}
        <br />
        <ul>
          <li>
            <h3>Source Name:</h3> {data.sourceName}
          </li>
          <li>
            <h3>Source Disclaimer:</h3>{" "}
            <a href={data.sourceDisclaimer}>{data.sourceDisclaimer} </a>
          </li>
        </ul>
      </div>
    );
  }
  return null;
};

export default OncHighList;
