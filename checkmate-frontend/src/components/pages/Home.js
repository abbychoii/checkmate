import AddDrugForm from "../AddDrugForm";
import MedicationData from "../MedicationData";
import axios from "axios";
import { useState } from "react";
// import ".../App.css";
import TitleBlock from "../styles/TitleBlock.styled";
import Navbar from "../styles/NavBar.styled";

function Home() {
  const [currentData, setCurrentData] = useState({
    rxCUIs: [""],
    interactions: [""],
    doses: [""],
    drugs: [""],
    frequencies: [""]
  });
  const [display, setDisplay] = useState(true);
  const getInteractions = async (formData) => {
    console.log("getInteractions called");
    // console.log(formData);
    const rxCUICodes = [];
    const drugs = [];
    const doses = [];
    const frequencies = [];
    for (let idx in formData) {
      rxCUICodes.push(formData[idx].rxCUI);
      let drugName =
        formData[idx].drug.charAt(0).toUpperCase() +
        formData[idx].drug.slice(1);
      drugs.push(drugName);
      doses.push(formData[idx].dose);
      frequencies.push(formData[idx].frequency);
    }
    const newInteractions = [];
    const rxCUIsCode = rxCUICodes.join("+");
    let interactionURL = `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxCUIsCode}`;
    const response = await axios.get(interactionURL);
    try {
      if ("fullInteractionTypeGroup" in response.data) {
        const interactions = response.data.fullInteractionTypeGroup;
        // console.log(interactions);
        // console.log(response.data);
        newInteractions.push(interactions);
      } else {
        const disclaimer = response.data.nlmDisclaimer;
        // console.log(disclaimer);
        newInteractions.push([disclaimer]);
      }
    } catch (error) {
      console.log(error);
    }
    const newCurrentData = {
      rxCUIs: rxCUICodes,
      interactions: newInteractions,
      drugs: drugs,
      doses: doses,
      frequencies: frequencies
    };
    console.log(newCurrentData);
    setCurrentData(newCurrentData);
  };

  return (
    <div>
      <Navbar />
      <div className=" flex justify-center bg-checkered-tetris scroll-smooth px-24 lg:px-32 h-screen">
        <div className="content-container flex flex-col h-max px-3">
          <TitleBlock />
          <button
            className="btn md:flex justify-end mb-5 hover:text-purple-400"
            onClick={() => setDisplay(!display)}
          >
            {display ? "Hide Form" : "Show Form"}
          </button>
          {display ? (
            <div className="flex content-evenly mx-5">
              <AddDrugForm getInteractions={getInteractions}></AddDrugForm>
            </div>
          ) : null}
          <MedicationData
            currentData={currentData}
            className="med-data"
          ></MedicationData>
        </div>
      </div>
    </div>
  );
}

export default Home;
