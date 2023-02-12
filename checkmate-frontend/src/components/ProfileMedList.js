import React from "react";
import ProfileMedCard from "./ProfileMedCard";

const ProfileMedList = ({ user, medData, deleteMed }) => {
  const medList = medData.map((med) => {
    return (
      <ProfileMedCard
        key={med.med_id}
        med_id={med.med_id}
        drug={med.med_name}
        dose={med.dose}
        frequency={med.frequency}
        deleteMed={deleteMed}
      ></ProfileMedCard>
    );
  });
  return (
    <div className=''>
      {/* <div> {user.given_name}'s Med List </div> */}
      <div className='grid grid-flow-col-dense auto-rows-max md:auto-rows-min'>
        {medList}
      </div>
    </div>
  );
};

export default ProfileMedList;
