import React from "react";

const OncHigh = ({ interactions, id }) => {
  const data = interactions[0][1];
  const interaction = data.fullInteractionType[id];
  const comment = interaction.comment;
  const drug1 =
    interaction.interactionPair[0].interactionConcept[0].sourceConceptItem;
  const drug1Name =
    interaction.minConcept[0].name.charAt(0).toUpperCase() +
    interaction.minConcept[0].name.slice(1);
  const drug1Link =
    data.fullInteractionType[id].interactionPair[0].interactionConcept[0]
      .sourceConceptItem.url;
  const drug2 =
    interaction.interactionPair[0].interactionConcept[1].sourceConceptItem;
  const drug2Name =
    interaction.minConcept[1].name.charAt(0).toUpperCase() +
    interaction.minConcept[1].name.slice(1);
  const drug2Link =
    data.fullInteractionType[id].interactionPair[0].interactionConcept[1]
      .sourceConceptItem.url;
  const description = interaction.interactionPair[0].description;
  const severity = interaction.interactionPair[0].severity;

  return (
    <div>
      <ul
        key={`${id}-oh`}
        className='interactionPairs border-4 border-red-500 px-7 py-7 rounded-[0.5rem]'
        id={id}
      >
        <li key={`${id}-oh-header`}>
          <h3>Interaction Pair: </h3>
        </li>
        <ul>
          <li key={`${id}-oh-drug1`}>{drug1Name}</li>
          <li key={`${id}-oh-drug2`}>{drug2Name}</li>
        </ul>
        <br />
        <li key={`${id}-oh-severity`}>
          {" "}
          <h5 className='inline-flex mr-7'> ⚠️ </h5>
          <h2 className='inline-flex'>Severity: {severity}</h2>
        </li>{" "}
        <br />
        <div>
          <li key={`${id}-oh-description`}>Description: {description}</li>
          <li key={`${id}-oh-comments`}>Drug Comments: {comment}</li>
        </div>
        <br></br>
      </ul>
      <br /> <br />
    </div>
  );
};

export default OncHigh;
