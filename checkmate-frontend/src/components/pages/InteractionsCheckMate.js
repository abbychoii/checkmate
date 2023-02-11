import React from "react";
import Navbar from "../styles/NavBar.styled";
import MedicationData from "../MedicationData";
import AddDrugForm from "../AddDrugForm";

function Interactions({
  user,
  handleSignOut,
  display,
  setDisplay,
  getInteractions,
  currentData,
}) {
  return (
    <div>
      <Navbar user={user} handleSignOut={handleSignOut} />
      <div className=' flex justify-center bg-tetris2 scroll-smooth px-24 lg:px-32 min-h-screen h-max'>
        <div className='content-container flex flex-col h-max py-20 px-3'>
          {user ? (
            <div className='flex  flex-grow justify-evenly lg:my-15 rounded-[5rem] bg-white border-[20px] lg:border-[20px] border-yellow-200'>
              Welcome {user.name}!
            </div>
          ) : null}
          {currentData.drugs[0] ? (
            <button
              className='btn md:flex justify-end mb-5 hover:text-purple-400'
              onClick={() => setDisplay(!display)}
            >
              {display ? "Hide Form" : "Show Form"}
            </button>
          ) : null}
          {display ? (
            <div className='flex content-evenly mx-5'>
              <AddDrugForm getInteractions={getInteractions}></AddDrugForm>
            </div>
          ) : null}
          <MedicationData
            currentData={currentData}
            className='med-data'
          ></MedicationData>
        </div>
      </div>
    </div>
  );
}

export default Interactions;
