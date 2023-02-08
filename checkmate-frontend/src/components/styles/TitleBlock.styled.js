import React from "react";

const TitleBlock = () => {
  return (
    <div className="flex flex-row h-[50rem] items-center border-2 mx-10 mt-10 mb-10 text-center max-w-[70rem]">
      <h1 className="title">CheckMate</h1>
      <div className="blurb">
        Hello! Welcome to CheckMate, your tool for managing medication
        interactions. Taking multiple medications can be challenging, but with
        CheckMate, you can have peace of mind knowing that your medications are
        working together safely. Our user-friendly software checks your
        medication list against a database of known drug interactions and alerts
        you to any potential dangers. With CheckMate, you can be proactive about
        your medication use and make informed decisions. It's easy to use and
        you don't have to be a medical expert. Let's get started on this journey
        to better medication management!
      </div>
    </div>
  );
};

export default TitleBlock;
