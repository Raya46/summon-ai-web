import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-[#242424]/70 backdrop-blur-md border border-white/20 flex flex-row justify-between items-center fixed top-5 left-6 right-6 z-50 py-3 px-6 md:px-[5rem] rounded-xl">
      <Image
        src="/summon-logo.png"
        alt="summon-logo"
        width={180}
        height={180}
        className="object-cover"
      />
      <div className="hidden md:flex flex-row gap-4 items-center font-poppins text-white">
        <p className="cursor-pointer hover:text-blue-400 transition-colors">
          Home
        </p>
        <p className="cursor-pointer hover:text-blue-400 transition-colors">
          About Us
        </p>
        <p className="cursor-pointer hover:text-blue-400 transition-colors">
          Solution
        </p>
        <div className="rounded-full border border-blue-700 bg-black px-4 py-2 cursor-pointer hover:bg-blue-700 transition-colors">
          <p>Contact Us</p>
        </div>
      </div>

      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#242424]/90 backdrop-blur-md border border-t-0 border-white/20 rounded-b-xl mt-2 py-4 px-6 flex flex-col items-center gap-4 font-poppins text-white">
          <p className="cursor-pointer hover:text-blue-400 transition-colors w-full text-center py-2">
            Home
          </p>
          <p className="cursor-pointer hover:text-blue-400 transition-colors w-full text-center py-2">
            About Us
          </p>
          <p className="cursor-pointer hover:text-blue-400 transition-colors w-full text-center py-2">
            Solution
          </p>
          <div className="rounded-full border border-blue-700 bg-black px-6 py-3 cursor-pointer hover:bg-blue-700 transition-colors w-full text-center">
            <p>Contact Us</p>
          </div>
        </div>
      )}
    </div>
  );
}
