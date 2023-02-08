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
  const drug1Link = drug1.url;
  const drug2 =
    interaction.interactionPair[0].interactionConcept[1].sourceConceptItem;
  const drug2Name =
    interaction.minConcept[1].name.charAt(0).toUpperCase() +
    interaction.minConcept[1].name.slice(1);
  const drug2Link = drug2.url;
  const description = interaction.interactionPair[0].description;
  const severity = interaction.interactionPair[0].severity;

  return (
    <div>
      <ul key={`${id}-oh`} className='interactionPairs' id={id}>
        <li key={`${id}-oh-header`}>Interaction Pair: </li>
        <ul>
          <li key={`${id}-oh-drug1`}>
            <a href={drug1Link}>{drug1Name}</a>
          </li>
          <li key={`${id}-oh-drug2`}>
            <a href={drug2Link}>{drug2Name}</a>
          </li>
        </ul>
        <li key={`${id}-oh-severity`}>Severity: {severity}</li>
        <li key={`${id}-oh-description`}>Description: {description}</li>
        <li key={`${id}-oh-comments`}>Drug Comments: {comment}</li>
        <br></br>
      </ul>
    </div>
  );
};

export default OncHigh;
