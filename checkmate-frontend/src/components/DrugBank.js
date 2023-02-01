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
    <ul className="interactionPairs" id={id}>
      <li>Interaction Pair: </li>
      <ul>
        <li>
          <a href={drug1Link}>{drug1Name}</a>
        </li>
        <li>
          <a href={drug2Link}>{drug2Name}</a>
        </li>
      </ul>
      <li>Severity: {severity}</li>
      <li>Description: {description}</li>
      <li>Drug Comments: {comment}</li>

      <br></br>
    </ul>
  );

  // return <div>{interactionPairs}</div>;
};

export default DrugBank;
