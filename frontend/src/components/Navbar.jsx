import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-700 shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-screen-2xl mx-auto py-4 px-6 md:px-40 flex items-center justify-between">
        <h1 className="text-3xl block mx-auto font-extrabold text-slate-300 cursor-pointer transition-transform duration-200 hover:scale-105">
          File Converter
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
