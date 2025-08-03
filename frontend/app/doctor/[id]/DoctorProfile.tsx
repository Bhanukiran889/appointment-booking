'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { fetchDoctorById } from '@/api/doctors';

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  image: string;
  status: 'Available' | 'On Leave';
  rating: number;
  experience: string;
  education: string;
  about: string;
  location: string;
  languages: string[];
  consultationFee: string;
  availability: Record<string, string[]>;
}

interface DoctorProfileProps {
  doctorId: string;
}

export default function DoctorProfile({ doctorId }: DoctorProfileProps) {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedTime, setSelectedTime] = useState('');
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const data = await fetchDoctorById(doctorId);
        setDoctor(data);
      } catch (err) {
        console.error('Error fetching doctor:', err);
      } finally {
        setLoading(false);
      }
    };

    getDoctor();
  }, [doctorId]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  if (!doctor) {
    return <div className="p-8 text-center text-red-500">Doctor not found</div>;
  }

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const availableSlots = doctor.availability[selectedDay] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-48 h-48 rounded-xl object-cover object-top mx-auto md:mx-0"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
              <p className="text-xl text-blue-600 mb-4">{doctor.specialization}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center">
                  <i className="ri-star-fill text-yellow-400 mr-1"></i>
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-gray-500 ml-1">(127 reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <i className="ri-time-line mr-1"></i>
                  <span>{doctor.experience}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <i className="ri-map-pin-line mr-1"></i>
                  <span>{doctor.location}</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${doctor.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${doctor.status === 'Available' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  {doctor.status}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                  {doctor.consultationFee} consultation
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* about section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Dr. {doctor.name.split(' ')[1]}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{doctor.about}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
                  <p className="text-gray-600">{doctor.education}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                  <p className="text-gray-600">{doctor.languages.join(', ')}</p>
                </div>
              </div>
            </div>
            {/* patient Reviews */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Reviews</h2>
              <p className="text-gray-500">(Reviews section can be integrated later from backend)</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Appointment</h2>
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Select Day</h3>
                <div className="grid grid-cols-7 gap-2">
                  {daysOfWeek.map(day => (
                    <button
                      key={day}
                      onClick={() => {
                        setSelectedDay(day);
                        setSelectedTime('');
                      }}
                      className={`p-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${selectedDay === day ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} ${doctor.availability[day]?.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={doctor.availability[day]?.length === 0}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Available Times</h3>
                {availableSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${selectedTime === time ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No available slots for {selectedDay}</p>
                )}
              </div>
              <Link
                href={`/appointment?doctor=${doctorId}&day=${selectedDay}&time=${selectedTime}`}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors text-center block whitespace-nowrap ${selectedTime ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Book Appointment
              </Link>
              <p className="text-xs text-gray-500 mt-4 text-center">
                You will be charged {doctor.consultationFee} for the consultation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
