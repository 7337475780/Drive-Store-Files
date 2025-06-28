import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5 ">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <Image
            src="/assets/images/icon.png"
            width={224}
            height={82}
            alt="logo"
            className="h-auto  rounded-full"
          />

          <div className="space-y-5 text-white">
            <h1 className="h1">Manage your files in an organized way</h1>
            <p className="body-1">
              Store your files here and experience an easy way of accessing all
              your files
            </p>
          </div>
          <Image
            src="/assets/images/illustration.png"
            width={324}
            alt="logo"
            height={324}
            className="transition-all hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>
      <section
        className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:py-0
       lg:p-10"
      >
        <div className="mb-16 lg:hidden">
          <Image
            src="/assets/images/icon.png"
            width={224}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
            alt="logo"
          />
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
