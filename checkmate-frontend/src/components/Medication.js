import React from "react";
import DrugLabel from "./DrugLabel";
// import OncHighList from "./OncHigh";
// import DrugBankList from "./DrugBankList";
import Interactions from "./Interactions";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
//
function Medication({ currentData, getDrugLabel, idx }) {
  console.log(currentData);
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex flex-grow rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>{currentData.drugs[idx]}</span>
            <ChevronUpIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-purple-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
            <h3>{`${currentData.drugs[idx]}`}</h3>
            <h3>rxCUI: {currentData.rxCUIs[idx]}</h3>
            <p>Dose: {currentData.doses[idx]}</p>
            {currentData.frequencies[idx] ? (
              <p>Frequency: {currentData.frequencies[idx]}</p>
            ) : null}
            <DrugLabel
              currentData={currentData}
              idx={idx}
              getDrugLabel={getDrugLabel}
            ></DrugLabel>
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
