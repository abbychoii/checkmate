import React from "react";
import ProfileMedList from "../ProfileMedList";
import Navbar from "../styles/NavBar.styled";
import { useState } from "react";
import AddDrugForm from "../AddDrugForm";
import MedicationData from "../MedicationData";

const medData = [
  {
    med_id: 1,
    med_name: "zoloft",
    dose: "100mg",
    frequency: "daily",
    rxcui: "19312",
    checkmateuser_id: 1,
  },
  {
    med_id: 2,
    med_name: "zocor",
    dose: "50mg",
    frequency: "daily",
    rxcui: "20393",
    checkmateuser_id: 1,
  },
  {
    med_id: 5,
    med_name: "advilr",
    dose: "50mg",
    frequency: "2xs a week",
    rxcui: "3459",
    checkmateuser_id: 1,
  },
  {
    med_id: 3,
    med_name: "bosentan",
    dose: "50mg",
    frequency: "daily",
    rxcui: "3497",
    checkmateuser_id: 1,
  },
  {
    med_id: 4,
    med_name: "adderall xr",
    dose: "50mg",
    frequency: "daily",
    rxcui: "284930",
    checkmateuser_id: 1,
  },
  {
    med_id: 6,
    med_name:
      "lexaprofjdls;ajfkdls;ajfkdl;sajfkdls;jflfjlkdjksejdfkljedkflkfjsjkdjsjlfdfkdjskljka",
    dose: "100mg",
    frequency: "daily",
    rxcui: "392432",
    checkmateuser_id: 1,
  },
];

function Profile({ user, handleSignOut }) {
  const [userMedList, setUserMedList] = useState(medData);

  const deleteMed = (id) => {
    console.log(user);
    const newMedData = [];
    for (let i in userMedList) {
      if (userMedList[i].med_id !== id) {
        newMedData.push(userMedList[i]);
      }
    }
    setUserMedList(newMedData);
  };

  const getInteractions = (formData) => {
    console.log(formData);
    console.log(user);
    // we can do the axios call to our backend and post the new drugs to the backend databasee
  };
  return (
    <div>
      <Navbar user={user} handleSignOut={handleSignOut} />
      <div className='bg-tetris2 min-h-screen h-max lg:px-52 py-[5.5rem] px-16'>
        <div className='bg-white  h-auto rounded-[3rem] md:rounded-[3rem] lg:rounded-[3rem] xl:rounded-[5rem] md:flex md:flex-col items-center justify-center border-spacing-12 border-[20px] mt-20 text-center mb-10 border-yellow-200 shadow-yellow-400  text-lg'>
          <p className='align-middle justify-center lg:text-[1.5rem] font-bold lg:ml-4 flex flex-nowrap'>
            {user.given_name}'s Medication List{" "}
          </p>
          <ProfileMedList
            medData={userMedList}
            deleteMed={deleteMed}
            user={user}
          ></ProfileMedList>
          {/* <MedicationData currentData={userMedList}></MedicationData> */}
        </div>
        <div>
          <AddDrugForm
            type='profilemedupdate'
            getInteractions={getInteractions}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
