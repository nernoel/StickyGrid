'use client'

import HeroButton from '@/app/components/buttons/hero';

export default function Hero() {
    return (
      <div className="container mx-auto">
        <div className="flex items-center">
          <div className="flex flex-col space-y-4">

            <div className="animate-in font-sans">
            <p className="text-6xl mb-4 font-extrabold text-gray-300">Enjoy a better, more enhanced sticky notes experience</p>
            <p className="font-semibold text-gray-400">A simpler more organized solution to digital sticky notes.</p>
            </div>
            <div>
            <HeroButton />
            </div>
          </div>
          <img src="/heroImage.gif" alt="note-gif" className="ml-8 w-1/2 h-auto"/>
        </div>
        <hr className="border-t border-gray-800 w-full mb-4 mt-20" />
      </div>
    );
  }
  