import React from "react";

// const Med = [
//   {
//     id: 1,
//     user: "Jane Doe"
//     medication: "Zocor",
//     dose: "X mg",
//     frequency: "2x daily",
//   },
// ];

const ProfileMedCard = ({ med_id, drug, dose, frequency, deleteMed }) => {
  return (
    <div className='flex med-card content-center p-4 hover:scale-105 duration-500 m-1'>
      <div className=' flex w-fit min-h-[14rem] xl:min-w-[20rem] max-w-[20rem] items-center justify-between p-4 rounded-lg bg-white shadow-yellow-200 shadow-lg hover:shadow-2xl hover:shadow-yellow-200'>
        <div>
          <h4 className='flex break-all text-gray-900 font-bold'>
            {drug.charAt(0).toUpperCase() + drug.slice(1)}
          </h4>
          <h3 className='mt-2 text-xl font-bold text-yellow-500 text-left'>
            {dose}
          </h3>
          <p className='text-sm font-semibold text-gray-400'>{frequency}</p>
          <button
            className='deletecard-btn text-sm mt-6 px-4 py-2 bg-yellow-400 text-white rounded-lg  tracking-wider hover:bg-yellow-300 outline-none m-1'
            onClick={() => {
              deleteMed(med_id);
            }}
          >
            Delete
          </button>
        </div>
        {/* <div className='bg-gradient-to-tr from-yellow-500 to-yellow-400 w-32 h-32  rounded-full shadow-2xl shadow-yellow-400 border-white  border-dashed border-2  flex justify-center items-center '>
            <div>
              <h1 className='text-white text-2xl'>l</h1>
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default ProfileMedCard;
