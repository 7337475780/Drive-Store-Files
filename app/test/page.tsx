import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex mt-4 gap-3 justify-center">
        <div className="bg-brand w-2 h-2  rounded-full animate-shift delay-75" />
        <div className="bg-brand w-2 h-2  rounded-full animate-shift delay-150 " />
        <div className="bg-brand w-2 h-2  rounded-full animate-shift " />
        <div className="bg-brand w-2 h-2  rounded-full animate-shift " />
        <div className="bg-brand w-2 h-2  rounded-full animate-shift " />
        <div className="bg-brand w-2 h-2  rounded-full animate-shift " />
        <div className="bg-brand w-2 h-2  rounded-full animate-shift " />
        <div className="bg-brand w-2 h-2  rounded-full animate-shift " />
        <div className="bg-brand w-2 h-2  rounded-full animate-shift " />
        <div className="bg-brand w-2 h-2  rounded-full animate-shift " />
      </div>

      <div className="w-full flex justify-center">
        <div className="w-20 h-1 bg-brand-100/20 overflow-hidden ">
          <div className="w-20  h-1 bg-brand animate-load " />
        </div>
      </div>

      <div className="mx-auto flex gap-2 animate-bounce">
        <div className="w-10 h-10 bg-brand rounded-4xl animate-bounce" />
        <div className="w-10 h-10 bg-amber-400 rounded-2xl animate-spin" />
        <div className="w-10 h-10 bg-orange-400 rounded-4xl animate-bounce" />
        <div className="w-10 h-10 bg-violet-400 rounded-2xl animate-spin" />
      </div>

      <svg xmlns="http://www.w3.org/2000/svg">
        <path>
          <circle  />
        </path>
      </svg>
    </div>
  );
};

export default Page;
