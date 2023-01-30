const Interactions = ({ rxCUIs, interactions }) => {
  console.log(rxCUIs);
  console.log(interactions[0]);

  const interactionDataDisplay = () => {
    if (typeof interactions[0][0] === "string") {
      return <p>Disclaimer: {interactions[0][0]}</p>;
    } else {
      const data = interactions[0][0];
      return (
        <ul>
          <li>Source Name: {data.sourceName}</li>
          <li>Source Disclaimer: {data.sourceDisclaimer}</li>
          <div id="interaction-pairs">{interactionPairs()}</div>
        </ul>
      );
    }
  };

  const interactionPairs = () => {
    const data = interactions[0][0];
    const interactionPairs = [];
    for (let i in data.fullInteractionType) {
      interactionPairs.push(
        <ul className="interactionPairs" id={i}>
          <li>Drug Comments: {data.fullInteractionType[i].comment}</li>
          <li>
            Interaction Pair:{" "}
            {data.fullInteractionType[
              i
            ].interactionPair[0].interactionConcept[0].minConceptItem.name.toUpperCase()}
            ,
            {data.fullInteractionType[
              i
            ].interactionPair[0].interactionConcept[1].minConceptItem.name.toUpperCase()}
          </li>
          <li>
            Severity: {data.fullInteractionType[i].interactionPair[0].severity}
          </li>
          <li>
            Description:{" "}
            {data.fullInteractionType[i].interactionPair[0].description}
          </li>
          <br></br>
        </ul>
      );
    }
    return interactionPairs;
  };

  // const rxCUIStr = rxCUIs;
  if (rxCUIs[0]) {
    return (
      <>
        <h3>Medication Data</h3>
        <div>
          RxCUIs:
          <ul>
            {rxCUIs.map((rxCUI, idx) => (
              <li key={idx}>{rxCUI}</li>
            ))}
          </ul>
        </div>
        <h3>Interaction Data</h3>
        {interactionDataDisplay()}
      </>
    );
  }
};

export default Interactions;
