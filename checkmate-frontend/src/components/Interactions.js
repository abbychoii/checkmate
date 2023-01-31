// import DrugBank from "./DrugBank";
import DrugBankList from "./DrugBankList";
import OncHighList from "./OncHighList";
import MedicationData from "./MedicationData";

const Interactions = ({ currentData }) => {
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
        <>
          <h3>Interaction Data</h3>
          {currentData.interactions[0].length < 2 ? null : (
            <OncHighList interactions={currentData.interactions}></OncHighList>
          )}
          <DrugBankList interactions={currentData.interactions}></DrugBankList>
        </>
      );
    }
  };

  // const rxCUIStr = rxCUIs;
  if (currentData.drugs[0]) {
    return (
      <>
        <MedicationData currentData={currentData}></MedicationData>
        {interactionDataDisplay()}
      </>
    );
  }
};

export default Interactions;
