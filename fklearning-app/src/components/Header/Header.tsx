import React, { useState } from "react";

const Header = () => {
  const [user, setUser] = useState(null);
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="/">FKLearning</a>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="/catalog"
                className="hover:underline"
              >
                Video Catalog
              </a>
            </li>
            <li>
              <a
                href="/pricing"
                className="hover:underline"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="/training-tools"
                className="hover:underline"
              >
                Training Tools
              </a>
            </li>
            <li>
              <a
                href="/teachers"
                className="hover:underline"
              >
                Teachers
              </a>
            </li>
          </ul>
        </nav>
        {user ? (
          <>
            <div className="flex space-x-2">
              <a
                href="/sign-in"
                className="border border-white px-3 py-1 rounded hover:bg-white hover:text-gray-800 transition"
              >
                Sign In
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                {(user as { firstname: string }).firstname}{" "}
                {(user as { lastname: string }).lastname}{" "}
              </div>
              <button
                onClick={() => setUser(null)}
                className="border border-white px-3 py-1 rounded hover:bg-white hover:text-gray-800 transition"
              >
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <div className="flex space-x-2">
            <a
              href="/sign-up"
              className="border border-white px-3 py-1 rounded hover:bg-white hover:text-gray-800 transition"
            >
              Sign Up
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
