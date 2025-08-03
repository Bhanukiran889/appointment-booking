const BASE_URL = 'https://appointment-booking-mc8g.onrender.com/api'; // your backend base URL

export async function fetchDoctors() {
  const res = await fetch(`${BASE_URL}/doctors`);
  if (!res.ok) throw new Error('Failed to fetch doctors');
  return res.json();
}

export async function fetchDoctorById(id) {
  const res = await fetch(`${BASE_URL}/doctors/${id}`);
  if (!res.ok) throw new Error('Failed to fetch doctor');
  return res.json();
}