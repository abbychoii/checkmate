import React from "react";
// import DrugLabel from "./DrugLabel";
// import OncHighList from "./OncHigh";
// import DrugBankList from "./DrugBankList";
import Interactions from "./Interactions";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
//
function Medication({ currentData, idx }) {
  const getDrugTitle = () => {
    const rxCUI = currentData.rxCUIs[idx];
    const data = currentData.interactions[0][0];
    if (typeof currentData.interactions[0][0] !== "string") {
      for (let i in data.fullInteractionType) {
        if (data.fullInteractionType[i].minConcept[0].rxcui === rxCUI) {
          return (
            <a
              href={
                data.fullInteractionType[i].interactionPair[0]
                  .interactionConcept[0].sourceConceptItem.url
              }
            >
              <h3>{`${currentData.drugs[idx]} rxCUI: ${currentData.rxCUIs[idx]}`}</h3>
            </a>
          );
        } else if (data.fullInteractionType[i].minConcept[1].rxcui === rxCUI) {
          return (
            <a
              href={
                data.fullInteractionType[i].interactionPair[0]
                  .interactionConcept[1].sourceConceptItem.url
              }
            >
              <h3>{`${currentData.drugs[idx]} rxCUI: ${currentData.rxCUIs[idx]}`}</h3>
            </a>
          );
        }
      }
    }
    return (
      <h3>{`${currentData.drugs[idx]} rxCUI: ${currentData.rxCUIs[idx]}`}</h3>
    );
  };

  const getPriceLink = () => {
    const drugName = currentData.drugs[idx].toLowerCase().split(" ").join("-");
    const URL = "https://www.goodrx.com/";
    const URLAttempt = URL + drugName;
    return (
      <p>
        <a href={URLAttempt}>Price Information from GoodRx</a>
      </p>
    );
    // axios
    //   .get(URLAttempt, { withCredentials: false })
    //   .then((response) => {
    //     console.log(response);
    //     return (
    //
    //     );
    //   })
    //   .catch((error) => {
    //     console.log(error.response.status);
    //     return null;
    //   });
  };

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>{currentData.drugs[idx]}</span>
            <ChevronUpIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-purple-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 border-2 max-w-[900px] self-center">
            <h3>{`${currentData.drugs[idx]}`}</h3>
            <h3>rxCUI: {currentData.rxCUIs[idx]}</h3>
            <p>Dose: {currentData.doses[idx]}</p>
            {currentData.frequencies[idx] ? (
              <p>Frequency: {currentData.frequencies[idx]}</p>
            ) : null}
            <Interactions
              currentData={currentData}
              rxCUI={currentData.rxCUIs[idx]}
            ></Interactions>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Medication;
