'use client'

import HeroButton from '../buttons/HeroButton';

export default function Hero() {
    return (
      <div className="container mx-auto">
        <div className="flex items-center">
          <div className="flex flex-col space-y-4">
            <p className="text-6xl">Enjoy an enhanced sticky notes experience</p>
            <p>A better and more simple way of using digital sticky notes!</p>
            <div>
            <HeroButton />
            </div>
          </div>
          <img src="/heroImage.gif" alt="Sample image" className="backdrop-blur-xl ml-8 w-1/2 h-auto"/>
        </div>
        <hr className="border-t border-gray-800 w-full mb-4 mt-20" />
      </div>
    );
  }
  