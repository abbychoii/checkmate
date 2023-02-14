import React from "react";
import Navbar from "../styles/NavBar.styled";
import MedicationData from "../MedicationData";
import AddDrugForm from "../AddDrugForm";
import { useState, useEffect } from "react";

function Interactions({
  user,
  handleSignOut,
  display,
  setDisplay,
  getInteractions,
  currentData,
}) {
  const [banner, setBanner] = useState(Boolean(user));
  // console.log(banner);

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.prompt();
  // }, []);

  return (
    <div>
      <Navbar user={user} handleSignOut={handleSignOut} />
      <div className=' flex flex-wrap justify-center bg-tetris2 scroll-smooth px-24 lg:px-32 min-h-screen h-max'>
        <div className='content-container justify-center  content-center flex flex-col h-max py-20 px-3'>
          {currentData.drugs[0] ? (
            <button
              className='btn md:flex justify-end mb-5 hover:text-purple-400'
              onClick={() => setDisplay(!display)}
            >
              {display ? "Hide Form" : "Show Form"}
            </button>
          ) : null}
          {!banner && !user ? (
            <div className='flex content-center self-center flex-col bg-white border-yellow-200 mb-10 p-5 rounded-3xl max-w-lg hover:shadow-2xl'>
              <button
                className='btnX flex flex-grow justify-end'
                onClick={() => {
                  setBanner(!banner);
                }}
              >
                X
              </button>
              <p
                className='flex align-middle justify-center text-sm font-bold
              flex-col flex-nowrap px-10'
              >
                If you want to track your meds with ease, sign in with your
                google account and click on your profile to store and track your
                medications!
              </p>
              <div id='signUpDiv' className='flex justify-center p-5'></div>
            </div>
          ) : null}

          {display ? (
            <div className='flex content-evenly mx-5'>
              <AddDrugForm
                getInteractions={getInteractions}
                type='interactioncheck'
                user={user}
              ></AddDrugForm>
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
