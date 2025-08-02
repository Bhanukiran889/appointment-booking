
'use client';

import Link from 'next/link';

interface DoctorCardProps {
  _id: string;
  name: string;
  specialization: string;
  image: string;
  status: 'Available' | 'On Leave';
  rating?: number;
  experience?: string;
}

export default function DoctorCard({ _id, name, specialization, image, status, rating = 4.8, experience = "10+ years" }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover object-top mr-4"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-gray-600 text-sm">{specialization}</p>
          <div className="flex items-center mt-1">
            <div className="flex text-yellow-400 text-sm">
              <i className="ri-star-fill w-4 h-4 flex items-center justify-center"></i>
              <span className="ml-1 text-gray-600">{rating}</span>
            </div>
            <span className="text-gray-400 mx-2">•</span>
            <span className="text-gray-600 text-sm">{experience}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
          status === 'Available' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            status === 'Available' ? 'bg-green-400' : 'bg-red-400'
          }`}></div>
          {status}
        </span>
      </div>
      
      <Link 
        href={`/doctor/${_id}`}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium text-center block whitespace-nowrap cursor-pointer transition-colors"
      >
        View Profile
      </Link>
    </div>
  );
}
