// import Interactions from "./Interactions";
import DrugBank from "./DrugBank";

function DrugBankList({ interactions }) {
  const drugBankComponents = [];
  const data = interactions[0][0];
  for (let i in data.fullInteractionType) {
    drugBankComponents.push(
      <DrugBank key={i} id={i} interactions={interactions}></DrugBank>
    );
  }
  return (
    <div>
      <ul>
        <li>Source Name: {data.sourceName}</li>
        <li>Source Disclaimer: {data.sourceDisclaimer}</li>
        {drugBankComponents}
      </ul>
    </div>
  );
}

export default DrugBankList;
