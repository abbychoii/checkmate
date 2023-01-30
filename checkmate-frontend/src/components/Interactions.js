// import DrugBank from "./DrugBank";
import DrugBankList from "./DrugBankList";
import OncHighList from "./OncHighList";

const Interactions = ({ rxCUIs, interactions }) => {
  console.log(rxCUIs);
  console.log(interactions);
  console.log(interactions[0]);
  console.log(interactions[0][0]);

  const interactionDataDisplay = () => {
    if (typeof interactions[0][0] === "string") {
      return <p>Disclaimer: {interactions[0][0]}</p>;
    } else {
      return (
        <ul>
          {interactions[0].length < 2 ? null : (
            <OncHighList interactions={interactions}></OncHighList>
          )}
          <DrugBankList interactions={interactions}></DrugBankList>
        </ul>
      );
    }
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
