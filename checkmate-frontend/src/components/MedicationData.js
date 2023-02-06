import Medication from "./Medication";
const MedicationData = ({ currentData }) => {
  console.log(currentData);
  if (currentData.drugs[0]) {
    return (
      <div>
        <h2>Medication Data</h2>
        {currentData.drugs.map((drug, idx) => (
          <div>
            <Medication currentData={currentData} idx={idx}></Medication>
          </div>
        ))}
      </div>
    );
  }
};

export default MedicationData;
