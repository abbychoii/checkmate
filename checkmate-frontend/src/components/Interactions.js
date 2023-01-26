const Interactions = ({ rxCUIs, interactions }) => {
  console.log(rxCUIs);
  console.log(interactions);

  // const rxCUIStr = rxCUIs;

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
      <h3>Interactions Data</h3>
      <p>
        {interactions[0]["sourceName"]}: {interactions[0]["sourceDisclaimer"]}
        {/* {interactions[0]["fullInteractionType"]["comment"]} */}
        {/* {
          interactions[0][0][0]["fullInteractionType"][0]["interactionPair"][0][
            "description"
          ]
        }
        {
          interactions[0][0][0]["fullInteractionType"][0]["interactionPair"][0][
            "severity"
          ]
        } */}
      </p>
    </>
  );
};

export default Interactions;
