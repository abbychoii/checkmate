import React from "react";

const TitleBlock = () => {
  return (
    <div className="">
      <div className=" h-auto rounded-[3rem] md:rounded-[3rem] lg:rounded-[3rem] xl:rounded-[5rem] md:flex md:flex-col xl:grid grid-cols-3 lg:h-[35rem] items-center justify-center border-spacing-12 border-[20px] mt-20 text-center mb-10 border-yellow-200 shadow-yellow-400 bg-white">
        <h1 className="title subpixel-antialiased my-5 lg:mt-0 font-space text-4xl hover:-rotate-12 hover:text-purple-400">
          CheckMate
        </h1>

        <div className=" mb-5 mx-5 md:mx-5 md:flex blurb subpixel-antialiased lg:mr-10 lg:px-7 lg:col-span-2 lg:text-[1.2rem] font-groteskreg text-base tracking-wide lg:leading-8">
          Hey there! We're thrilled you've found us. Welcome to CheckMate, your
          tool for managing medication interactions. Taking multiple medications
          can be challenging, but with CheckMate, you can have peace of mind
          knowing that your medications are working together safely. Our
          user-friendly software checks your medication list against a database
          of known drug interactions and alerts you to any potential dangers.
          With CheckMate, you can be proactive about your medication use and
          make informed decisions. Let's get started on this journey to better
          medication management!
        </div>
      </div>
    </div>
  );
};

export default TitleBlock;
