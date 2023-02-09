// import DrugBank from "./DrugBank";
import DrugBankList from "./DrugBankList";
import OncHighList from "./OncHighList";
const Interactions = ({ currentData, rxCUI }) => {
  // console.log(rxCUIs);
  // console.log(interactions);
  // console.log(interactions[0]);
  // console.log(interactions[0][0]);

  const interactionDataDisplay = () => {
    if (typeof currentData.interactions[0][0] === "string") {
      return (
        <>
          <h3>Interaction Data</h3>
          <p>Disclaimer: {currentData.interactions[0][0]}</p>
        </>
      );
    } else {
      return (
        <div className="divide-y divide-solid divide-purple-700">
          {currentData.interactions[0].length < 2 ? null : (
            <div>
              <OncHighList
                interactions={currentData.interactions}
                rxCUI={rxCUI}
              ></OncHighList>
            </div>
          )}

          <div>
            <br />
            <DrugBankList
              interactions={currentData.interactions}
              rxCUI={rxCUI}
            ></DrugBankList>
          </div>
        </div>
      );
    }
  };

  // const rxCUIStr = rxCUIs;
  if (
    currentData.drugs[0] &&
    typeof currentData.interactions[0][0] !== "string"
  ) {
    return <>{interactionDataDisplay()}</>;
  } else {
    return (
      <>
        <h3>Interaction Data</h3>
        <p>Disclaimer: {currentData.interactions[0][0]}</p>
      </>
    );
  }
};

export default Interactions;
