// app/doctor/[id]/page.tsx

import DoctorProfile from './DoctorProfile';
import { fetchDoctors } from '@/api/doctors';

export async function generateStaticParams() {
  const doctors = await fetchDoctors();
  return doctors.map((doctor: { _id: string }) => ({ id: doctor._id }));
}

export default async function DoctorPage({ params }: { params: { id: string } }) {
  return <DoctorProfile doctorId={params.id} />;
}
