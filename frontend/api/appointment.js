const BASE_URL = 'http://localhost:5000/api';

export async function bookAppointment(data) {
  const res = await fetch(`${BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Booking failed');
  }

  return res.json();
}
