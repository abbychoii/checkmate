// import Interactions from "./Interactions";
import DrugBank from "./DrugBank";

function DrugBankList({ interactions, rxCUI }) {
  const drugBankComponents = [];
  const data = interactions[0][0];
  for (let i in data.fullInteractionType) {
    if (
      data.fullInteractionType[i].minConcept[0].rxcui === rxCUI ||
      data.fullInteractionType[i].minConcept[1].rxcui === rxCUI
    ) {
      drugBankComponents.push(
        <DrugBank key={i} id={i} interactions={interactions}></DrugBank>
      );
    }
  }
  return (
    <div>
      <ul>
        <li>
          <h3>Source Name:</h3> {data.sourceName}
        </li>
        <br />
        <li>Source Disclaimer: {data.sourceDisclaimer}</li> <br />
        {drugBankComponents}
      </ul>
    </div>
  );
}

export default DrugBankList;
