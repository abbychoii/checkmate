import React from "react";
import ProfileMedList from "../ProfileMedList";
import Navbar from "../styles/NavBar.styled";
import { useState, useEffect } from "react";
import AddDrugForm from "../AddDrugForm";
import MedicationData from "../MedicationData";
import axios from "axios";

function Profile({ user, handleSignOut, getInteractions, profileData }) {
  const [userMedList, setUserMedList] = useState([]);

  const fetchAllMeds = () => {
    console.log(user);
    if (user) {
      const medURL = `https://checkmate-backend.herokuapp.com/checkmateusers/${user.id}/meds`;
      axios
        .get(medURL)
        .then((response) => {
          if (response.data) {
            const medListAPICopy = response.data.map((med) => {
              return {
                med_id: med.med_id,
                drug: med.med_name,
                rxCUI: med.rxcui,
                dose: med.dose,
                frequency: med.frequency,
              };
            });
            setUserMedList(medListAPICopy);
            return medListAPICopy;
          } else {
            setUserMedList([]);
          }
        })
        .then((medList) => {
          getInteractions(medList, "profileinteractions");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(fetchAllMeds, [user]);

  const deleteMed = (medId) => {
    console.log(user);

    axios
      .delete(`https://checkmate-backend.herokuapp.com/meds/${medId}`)
      .then((response) => {
        const newMeds = [];
        for (const med of userMedList) {
          if (med.med_id !== medId) {
            newMeds.push(med);
          }
        }
        setUserMedList(newMeds);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addMedsToMedList = (formData) => {
    const med = formData[0];
    console.log(med);
    axios
      .post(
        `https://checkmate-backend.herokuapp.com/checkmateusers/${user.id}/meds`,
        {
          med_name: med.drug,
          rxcui: med.rxCUI,
          dose: med.dose,
          frequency: med.frequency,
        }
      )
      .then((response) => {
        fetchAllMeds().then(() => {
          const newMeds = [...userMedList];
          const med = response.data.med;
          const newMed = {
            med_id: med.med_id,
            drug: med.name,
            rxCUI: med.rxcui,
            dose: med.dose,
            frequency: med.frequency,
          };
          newMeds.push(newMed);

          setUserMedList(newMeds);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar user={user} handleSignOut={handleSignOut} />
      <div className='bg-tetris2 min-h-screen h-max lg:px-52 py-[5.5rem] px-16'>
        {user ? (
          <div>
            <div className='bg-white  h-auto rounded-[3rem] md:rounded-[3rem] lg:rounded-[3rem] xl:rounded-[5rem] md:flex md:flex-col items-center justify-center border-spacing-12 border-[20px] mt-[0.75rems] text-center mb-10 border-yellow-200 shadow-yellow-400  text-lg'>
              <p className='align-middle justify-center lg:text-[1.5rem] font-bold flex flex-nowrap py-10'>
                {user.name}'s Medication List
              </p>
              <ProfileMedList
                medData={userMedList}
                deleteMed={deleteMed}
                user={user}
              ></ProfileMedList>
            </div>
            <AddDrugForm
              type='profilemedupdate'
              getInteractions={getInteractions}
              addMedsToMedList={addMedsToMedList}
            />
            <MedicationData currentData={profileData}></MedicationData>
          </div>
        ) : (
          <div className='bg-white  h-auto rounded-[3rem] md:rounded-[3rem] lg:rounded-[3rem] xl:rounded-[5rem] md:flex md:flex-col items-center justify-center border-spacing-12 border-[20px] mt-20 text-center mb-10 border-yellow-200 shadow-yellow-400  text-lg'>
            <p className='align-middle justify-center lg:text-[1.5rem] font-bold flex flex-nowrap pt-10'>
              "Please Log In to see your medication list."
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
