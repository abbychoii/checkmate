import React from "react";
import OncHigh from "./OncHigh";

const OncHighList = ({ interactions }) => {
  const OncHighComponents = [];
  const data = interactions[0][1];
  for (let i in data.fullInteractionType) {
    OncHighComponents.push(
      <OncHigh key={i} id={i} interactions={interactions}></OncHigh>
    );
  }
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
};

export default OncHighList;
