const MedicationData = ({ currentData }) => {
  return (
    <div>
      <h3>Medication Data</h3>
      {currentData.drugs.map((drug, idx) => (
        <ul key={`${idx}-drugData`}>
          <li key={`${idx}-drug-rxcui`}>
            {drug} (rxCUI: {currentData.rxCUIs[idx]})
          </li>
          <ul key={`${idx}-dose-freq`} className="dose-freq">
            <li key={`${idx}-dose`}>Dose: {currentData.doses[idx]}</li>
            {currentData.frequencies[idx] ? (
              <li key={`${idx}-freq`}>
                Frequency: {currentData.frequencies[idx]}
              </li>
            ) : null}
          </ul>
        </ul>
      ))}
    </div>
  );
};

export default MedicationData;
