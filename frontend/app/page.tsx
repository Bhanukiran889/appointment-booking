
'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import DoctorCard from '@/components/DoctorCard';

const sampleDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    image: 'https://readdy.ai/api/search-image?query=Professional%20female%20doctor%20in%20white%20coat%2C%20warm%20smile%2C%20medical%20office%20background%2C%20natural%20lighting%2C%20modern%20healthcare%20setting&width=200&height=200&seq=doctor1&orientation=squarish',
    status: 'Available' as const,
    rating: 4.9,
    experience: '15+ years'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatologist',
    image: 'https://readdy.ai/api/search-image?query=Professional%20male%20doctor%20in%20white%20coat%2C%20confident%20expression%2C%20clean%20medical%20facility%20background%2C%20bright%20lighting%2C%20healthcare%20professional&width=200&height=200&seq=doctor2&orientation=squarish',
    status: 'Available' as const,
    rating: 4.8,
    experience: '12+ years'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    image: 'https://readdy.ai/api/search-image?query=Friendly%20female%20pediatric%20doctor%20in%20white%20coat%2C%20kind%20smile%2C%20colorful%20children%20hospital%20background%2C%20welcoming%20atmosphere%2C%20child-friendly%20medical%20environment&width=200&height=200&seq=doctor3&orientation=squarish',
    status: 'On Leave' as const,
    rating: 4.7,
    experience: '8+ years'
  }
];

export default function Home() {
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {sampleDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))}
          </div>
          
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
