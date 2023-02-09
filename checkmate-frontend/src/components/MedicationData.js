import Medication from "./Medication";
const MedicationData = ({ currentData }) => {
  console.log(currentData);
  if (currentData.drugs[0]) {
    return (
      <div className="flex flex-col items-center  mb-10 mt-10">
        {currentData.drugs.map((drug, idx) => (
          <div className="flex flex-grow flex-col min-w-full">
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
