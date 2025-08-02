
'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-['Pacifico'] text-blue-600">MediCare</div>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium whitespace-nowrap cursor-pointer">
              Home
            </Link>
            <Link href="/doctors" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium whitespace-nowrap cursor-pointer">
              Find Doctors
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium whitespace-nowrap cursor-pointer">
              Doctor Panel
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/appointment" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
