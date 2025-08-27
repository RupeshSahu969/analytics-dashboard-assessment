import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)} 
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-200 ease-in-out 
          bg-gray-900 text-white w-64 z-40 p-4 space-y-6
          md:static md:translate-x-0`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">EV Dashboard</h1>
          
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col space-y-2 mt-4">
          <button className="text-left bg-blue-400 hover:bg-gray-700 px-3 py-2 rounded-md">Dashboard</button>
          <button className="text-left bg-blue-400 hover:bg-gray-700 px-3 py-2 rounded-md">Filters</button>
          <button className="text-left bg-blue-400 hover:bg-gray-700 px-3 py-2 rounded-md">About</button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-4 py-3 flex items-center justify-between md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h2 className="text-lg font-semibold">EV Dashboard</h2>
        </header>
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
