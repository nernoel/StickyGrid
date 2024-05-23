export default function Hero() {
    return (
      <div className="container mx-auto">
        <div className="flex items-center">
          <div className="flex flex-col space-y-4">
            <p className="text-6xl">Enjoy an enhanced sticky notes experience</p>
            <p>A better and more simple way of using digital sticky notes!</p>
            <div>
            <button className="self-start px-4 py-2 bg-blue-600 font-bold hover:bg-blue-800 text-white-bold rounded-full">Get Started!</button>
            </div>
          </div>
          <img src="/loop.gif" alt="Sample image" className="backdrop-blur-xl ml-8 w-1/2 h-auto"/>
        </div>
        <hr className="border-t border-gray-800 w-full mb-4 mt-20" />
      </div>
    );
  }
  