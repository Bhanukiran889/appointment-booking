// 'use client'

import DoctorProfile from './DoctorProfile';
import { fetchDoctors } from '@/api/doctors';

export async function generateStaticParams() {
  try {
    const doctors = await fetchDoctors();
    return doctors.map((doctor: { _id: string }) => ({ id: doctor._id }));
  } catch (error) {
    console.error('Error fetching doctors for static params:', error);
    return [];
  }
}

// Make the page component async (required for dynamic routes in app/)
export default async function DoctorPage({ params }: { params: { id: string } }) {
  return <DoctorProfile doctorId={params.id} />;
}
