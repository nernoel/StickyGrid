'use client'

import StickyGridLogo from "../logo/StickyGridLogo";
import AuthButton from "../buttons/AuthButton";

export default function Header() {
  return (
    <>
      <div className="flex items-center justify-between px-6 mt-0">
        <div className="flex-grow text-center">
          <StickyGridLogo />
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
