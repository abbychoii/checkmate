import React from "react";

const TitleBlock = () => {
  return (
    <div>
      <h3 className="flex justify-center md:hidden text-xl m-5">CheckMate</h3>
      <div className="hidden md:mx-10 lg:mx-32 md:flex md:flex-col xl:grid grid-cols-3  lg:h-[30rem] items-center justify-center border-2 mt-32 mb-32 text-center">
        <h1 className="title subpixel-antialiased mt-5 lg:mt-0">CheckMate</h1>

        <div className="hidden mb-5 md:mx-5 md:mb-0 md:flex blurb leading-relaxed subpixel-antialiased lg:mr-10 lg:col-span-2">
          Hello! Welcome to CheckMate, your tool for managing medication
          interactions. Taking multiple medications can be challenging, but with
          CheckMate, you can have peace of mind knowing that your medications
          are working together safely. Our user-friendly software checks your
          medication list against a database of known drug interactions and
          alerts you to any potential dangers. With CheckMate, you can be
          proactive about your medication use and make informed decisions. It's
          easy to use and you don't have to be a medical expert. Let's get
          started on this journey to better medication management!
        </div>
      </div>
    </div>
  );
};

export default TitleBlock;
