import React from "react";
import Navbar from "../styles/NavBar.styled";

function Profile({ user, handleSignOut }) {
  return (
    <div>
      <Navbar user={user} handleSignOut={handleSignOut} />
      <div className='bg-tetris2 min-h-screen h-max lg:px-52 py-[5.5rem] px-16'>
        <div className='h-auto rounded-[3rem] md:rounded-[3rem] lg:rounded-[3rem] xl:rounded-[5rem] md:flex md:flex-col items-center justify-center border-spacing-12 border-[20px] mt-20 text-center mb-10 border-yellow-200 shadow-yellow-400 bg-white py-10 px-10 md:px-14 md:py-14 text-lg'>
          <p className='text-left'>Welcome {user.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
