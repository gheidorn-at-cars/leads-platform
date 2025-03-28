import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-white font-bold text-xl">
            Leads Management
          </Link>
          <div>
            <Link
              to="/leads/new"
              className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition"
            >
              Add New Lead
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;