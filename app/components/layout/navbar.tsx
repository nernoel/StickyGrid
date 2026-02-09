'use client'

import AuthButton from "../buttons/auth";
import Logo from "../images/logo";


export default function Navbar() {
  return (
    <>
      <div className="flex items-center justify-between px-6 mt-0">
        <div className="flex-grow text-center">
          <Logo />
        </div>
        <div className="ml-96">
          <div className="flex">
           <AuthButton />
          </div>
        </div>

      </div>
      <hr className="border-t border-gray-800 w-full mb-4 -mt-10" />
      <div>

      </div>

    </>
  );
}