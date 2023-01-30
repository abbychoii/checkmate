import React from "react";

const OncHigh = ({ interactions, id }) => {
  const data = interactions[0][1];
  const interaction = data.fullInteractionType[id];
  const comment = interaction.comment;
  const drug1 =
    interaction.interactionPair[0].interactionConcept[0].sourceConceptItem;
  const drug1Name = drug1.name.charAt(0).toUpperCase() + drug1.name.slice(1);
  const drug1Link = drug1.url;
  const drug2 =
    interaction.interactionPair[0].interactionConcept[1].sourceConceptItem;
  const drug2Name = drug2.name.charAt(0).toUpperCase() + drug2.name.slice(1);
  const drug2Link = drug2.url;
  const description = interaction.interactionPair[0].description;
  const severity = interaction.interactionPair[0].severity;

  return (
    <div>
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
    </div>
  );
};

export default OncHigh;
