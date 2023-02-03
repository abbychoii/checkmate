import React from "react";
import OncHigh from "./OncHigh";

const OncHighList = ({ interactions, rxCUI }) => {
  const OncHighComponents = [];
  const data = interactions[0][1];
  console.log(data);
  for (let i in data.fullInteractionType) {
    if (
      data.fullInteractionType[0].minConcept[0].rxcui === rxCUI ||
      data.fullInteractionType[0].minConcept[1].rxcui === rxCUI
    ) {
      OncHighComponents.push(
        <OncHigh key={i} id={i} interactions={interactions}></OncHigh>
      );
    }
  }
  if (OncHighComponents[0]) {
    return (
      <div>
        <ul>
          <li>Source Name: {data.sourceName}</li>
          <li>
            Source Disclaimer:{" "}
            <a href={data.sourceDisclaimer}>{data.sourceDisclaimer} </a>
          </li>
          {OncHighComponents}
        </ul>
      </div>
    );
  }
  return null;
};

export default OncHighList;
