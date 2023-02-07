import Medication from "./Medication";
const MedicationData = ({ currentData, getDrugLabel }) => {
  console.log(currentData);
  if (currentData.drugs[0]) {
    return (
      <div className="flex flex-grow flex-col mx-10 border-2 mb-10 mt-10">
        <h2>Medication Data</h2>
        {currentData.drugs.map((drug, idx) => (
          <div className="flex flex-grow flex-col">
            <Medication
              currentData={currentData}
              getDrugLabel={getDrugLabel}
              idx={idx}
            ></Medication>
          </div>
        ))}
      </div>
    );
  }
};

export default MedicationData;
