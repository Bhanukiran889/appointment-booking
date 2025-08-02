
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import DoctorCard from '@/components/DoctorCard';
import { fetchDoctors } from '@/api/doctors';

type Doctor = {
  _id: string;
  name: string;
  specialization: string;
  image: string;
  status: 'Available' | 'On Leave';
  rating: number;
  experience: string;
};


export default function Home() {
const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true)


   useEffect(() => {
    async function loadDoctors() {
      try {
        const data = await fetchDoctors();
        setDoctors(data);
      } catch (error) {
        console.error('Error loading doctors:', error);
      } finally {
        setLoading(false);
      }
    }
    loadDoctors();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('/assets/hero.jpg')`
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="w-full text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Book Your Appointment
              <span className="block text-blue-200">Instantly</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl">
              Find trusted doctors and healthcare specialists near you. 
              Schedule appointments with ease and get the care you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/doctors"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors cursor-pointer whitespace-nowrap text-center"
              >
                Get Started
              </Link>
              <Link 
                href="/appointment"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors cursor-pointer whitespace-nowrap text-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Doctors</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced healthcare professionals are here to provide you with the best medical care
            </p>
          </div>
          
           {loading ? (
            <p className="text-center text-gray-500">Loading doctors...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} {...doctor} />
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link 
              href="/doctors"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg cursor-pointer whitespace-nowrap inline-block transition-colors"
            >
              View All Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MediCare?</h2>
            <p className="text-lg text-gray-600">Experience the future of healthcare booking</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-calendar-check-line text-2xl text-blue-600 w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book appointments in just a few clicks, anytime, anywhere</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-heart-line text-2xl text-green-600 w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted Doctors</h3>
              <p className="text-gray-600">Connect with verified and experienced healthcare professionals</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-time-line text-2xl text-purple-600 w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get help whenever you need it with our round-the-clock support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-['Pacifico'] text-blue-400 mb-2">MediCare</div>
          <p className="text-gray-400">Your trusted healthcare booking platform</p>
        </div>
      </footer>
    </div>
  );
}
