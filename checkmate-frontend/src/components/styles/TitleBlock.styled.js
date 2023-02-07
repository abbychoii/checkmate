import React from "react";

const TitleBlock = () => {
  return (
    <div className="flex flex-col justify-center border-2 mx-10 mt-10 mb-10 text-center">
      <h1 className="title">CheckMate</h1>
      <div className="blurb">
        <h3>Welcome to CheckMate!</h3>
        CheckMate aims to provide a place to search your medications or
        medications of interest and see potential interactions and side effects.
      </div>
    </div>
  );
};

export default TitleBlock;
