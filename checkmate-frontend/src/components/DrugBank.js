import React from "react";

const DrugBank = ({ interactions, id }) => {
  const data = interactions[0][0];
  const interaction = data.fullInteractionType[id];
  const comment = interaction.comment;
  const drug1 =
    interaction.interactionPair[0].interactionConcept[0].sourceConceptItem;
  const drug1Name =
    interaction.minConcept[0].name.charAt(0).toUpperCase() +
    interaction.minConcept[0].name.slice(1); //drug1.name
  const drug1Link = drug1.url;
  const drug2 =
    interaction.interactionPair[0].interactionConcept[1].sourceConceptItem;
  const drug2Name =
    interaction.minConcept[1].name.charAt(0).toUpperCase() +
    interaction.minConcept[1].name.slice(1); //drug2.name;
  const drug2Link = drug2.url;
  const description = interaction.interactionPair[0].description;
  const severity = interaction.interactionPair[0].severity;

  return (
    <div>
      <ul key={`${id}-db`} className="interactionPairs" id={id}>
        <li key={`${id}-db-header`}>Interaction Pair: </li>
        <ul>
          <li key={`${id}-db-drug1`}>
            <a href={drug1Link}>{drug1Name}</a>
          </li>
          <li key={`${id}-db-drug2`}>
            <a href={drug2Link}>{drug2Name}</a>
          </li>
        </ul>
        <li key={`${id}-db-severity`}>Severity: {severity}</li>
        <li key={`${id}-db-description`}>Description: {description}</li>
        <li key={`${id}-db-comments`}>Drug Comments: {comment}</li>
        <br></br>
      </ul>
    </div>
  );
};
// return <div>{interactionPairs}</div>;

export default DrugBank;
