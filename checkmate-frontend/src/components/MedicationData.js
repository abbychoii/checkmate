import Medication from "./Medication";
const MedicationData = ({ currentData }) => {
  console.log(currentData);
  if (currentData.drugs[0]) {
    return (
      <div className="flex flex-col mx-10 border-2 mb-10 mt-10">
        <h2>Medication Data</h2>
        {currentData.drugs.map((drug, idx) => (
          <div className="flex flex-grow flex-col">
            <Medication
              key={idx}
              currentData={currentData}
              idx={idx}
            ></Medication>
          </div>
        ))}
      </div>
    );
  }
};

export default MedicationData;
