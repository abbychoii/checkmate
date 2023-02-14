import React from "react";
import ProfileMedCard from "./ProfileMedCard";

const ProfileMedList = ({ user, medData, deleteMed }) => {
  const medList = medData.map((med) => {
    return (
      <ProfileMedCard
        key={med.med_id}
        med_id={med.med_id}
        drug={med.drug}
        dose={med.dose}
        frequency={med.frequency}
        deleteMed={deleteMed}
      ></ProfileMedCard>
    );
  });
  return (
    <div>
      {/* <div> {user.given_name}'s Med List </div> */}
      <div className='flex flex-row flex-wrap py-5 justify-center lg:px-10'>
        {medList}
      </div>
    </div>
  );
};

export default ProfileMedList;
