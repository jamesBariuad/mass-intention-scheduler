import React from "react";
import churchLogo from '../assets/church-logo-symbol.jpg'
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <nav className="flex place-content-between px-7 py-4 bg-slate-50 shadow-md z-50 items-center">
        <div><img src={churchLogo} alt="churchLogo" className="mix-blend-multiply w-[60px] " /></div>
        <ul className="flex gap-3 text-medium text-gray-900 font-semibold  lg:gap-10">
          <Link to="/" className="focus:underline">Home</Link>
          <Link to='/schedule' className="focus:underline">Schedule</Link>
          <Link to='/print' className="focuse:underline">Print</Link>
        </ul>
      </nav>
   </>
  );
};

export default NavBar;
