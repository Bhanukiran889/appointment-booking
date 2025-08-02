
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import { fetchDoctors } from '@/api/doctors';
import { bookAppointment } from '@/api/appointment';

type Doctor = {
    _id: string;
    name: string;
    specialization: string;
    status: 'Available' | 'On Leave';
    rating: number;
    experience: string;
    image: string;
};

type AppointmentFormData = {
    patientName: string;
    patientEmail: string;
    phone: string;
    date: string;
    time: string;
    doctorId: string;
    reason: string;
};


function AppointmentFormContent() {
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState<AppointmentFormData>({
        patientName: '',
        patientEmail: '',
        phone: '',
        date: '',
        time: '',
        doctorId: '',
        reason: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loadingDoctors, setLoadingDoctors] = useState(true);


    const doctorsData = {
        '1': { name: 'Dr. Sarah Johnson', specialization: 'Cardiologist' },
        '2': { name: 'Dr. Michael Chen', specialization: 'Dermatologist' },
        '3': { name: 'Dr. Emily Rodriguez', specialization: 'Pediatrician' },
        '4': { name: 'Dr. James Wilson', specialization: 'Orthopedic Surgeon' },
        '5': { name: 'Dr. Lisa Park', specialization: 'Neurologist' },
    };

    useEffect(() => {
        async function loadInitialData() {
            const doctorId = searchParams.get('doctor') || '';
            const day = searchParams.get('day') || '';
            const time = searchParams.get('time') || '';

            setFormData(prev => ({
                ...prev,
                doctorId,
                time,
                date: day ? getDateForDay(day) : ''
            }));

            try {
                const data = await fetchDoctors();
                setDoctors(data);
            } catch (err) {
                console.error('Failed to fetch doctors', err);
            } finally {
                setLoadingDoctors(false);
            }
        }

        loadInitialData();
    }, [searchParams]);


    const getDateForDay = (dayName: string) => {
        const today = new Date();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const targetDay = daysOfWeek.indexOf(dayName);
        const todayDay = today.getDay();

        let daysUntilTarget = targetDay - todayDay;
        if (daysUntilTarget <= 0) {
            daysUntilTarget += 7;
        }

        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + daysUntilTarget);

        return targetDate.toISOString().split('T')[0];
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('Submitting appointment:', formData); // 👈 Add this

        try {
            await bookAppointment(formData);
            setIsSubmitted(true);
        } catch (err: any) {
            console.error('Booking failed:', err);
            alert(err.message || 'Something went wrong while booking appointment.');
        } finally {
            setIsLoading(false);
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="ri-check-line text-2xl text-green-600 w-8 h-8 flex items-center justify-center"></i>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h1>
                        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                            <h3 className="font-semibold text-gray-900 mb-4">Appointment Details:</h3>
                            <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Doctor:</span> {doctors.find(doc => doc._id === formData.doctorId)?.name
                                }</p>
                                <p><span className="font-medium">Specialization:</span> {doctors.find(doc => doc._id === formData.doctorId)?.specialization
                                }</p>
                                <p><span className="font-medium">Date:</span> {new Date(formData.date).toLocaleDateString()}</p>
                                <p><span className="font-medium">Time:</span> {formData.time}</p>
                                <p><span className="font-medium">Patient:</span> {formData.patientName}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-6">
                            We've sent a confirmation email to <strong>{formData.patientEmail}</strong> with all the details.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium whitespace-nowrap cursor-pointer"
                            >
                                Book Another Appointment
                            </button>
                            <a
                                href="/"
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium whitespace-nowrap cursor-pointer text-center"
                            >
                                Back to Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
                    <p className="text-gray-600">Fill in the details below to schedule your appointment</p>
                </div>

                <form id="appointment-form" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
                    {/* Doctor Selection */}
                    <div className="mb-6">
                        <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Doctor *
                        </label>
                        {loadingDoctors ? (
                            <p className="text-gray-500 text-sm">Loading doctors...</p>
                        ) : (
                            <select
                                id="doctorId"
                                name="doctorId"
                                required
                                value={formData.doctorId}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                            >
                                <option value="">Choose a doctor</option>
                                {doctors.map((doc) => (
                                    <option key={doc._id} value={doc._id}>
                                        {doc.name} - {doc.specialization}
                                    </option>
                                ))}
                            </select>
                        )}

                    </div>

                    {/* Patient Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="patientName"
                                name="patientName"
                                required
                                value={formData.patientName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your phone number"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="patientEmail"
                            name="patientEmail"
                            required
                            value={formData.patientEmail}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email address"
                        />
                    </div>

                    {/* Appointment Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                Preferred Date *
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                                Preferred Time *
                            </label>
                            <select
                                id="time"
                                name="time"
                                required
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                            >
                                <option value="">Select time</option>
                                <option value="9:00 AM">9:00 AM</option>
                                <option value="9:30 AM">9:30 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="10:30 AM">10:30 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="11:30 AM">11:30 AM</option>
                                <option value="2:00 PM">2:00 PM</option>
                                <option value="2:30 PM">2:30 PM</option>
                                <option value="3:00 PM">3:00 PM</option>
                                <option value="3:30 PM">3:30 PM</option>
                                <option value="4:00 PM">4:00 PM</option>
                                <option value="4:30 PM">4:30 PM</option>
                            </select>
                        </div>
                    </div>

                    {/* Reason for Visit */}
                    <div className="mb-8">
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                            Reason for Visit
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            maxLength={500}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                            placeholder="Please describe your symptoms or reason for the visit (optional)"
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">{formData.reason.length}/500 characters</p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors whitespace-nowrap ${isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <i className="ri-loader-4-line animate-spin w-5 h-5 flex items-center justify-center mr-2"></i>
                                Booking Appointment...
                            </span>
                        ) : (
                            'Book Appointment'
                        )}
                    </button>

                    <p className="text-xs text-gray-500 mt-4 text-center">
                        By booking this appointment, you agree to our terms of service and privacy policy.
                    </p>
                </form>
            </div>
        </div>
    );
}

export default function AppointmentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <i className="ri-loader-4-line animate-spin text-2xl text-blue-600 w-8 h-8 flex items-center justify-center mx-auto mb-2"></i>
                    <p>Loading...</p>
                </div>
            </div>
        }>
            <AppointmentFormContent />
        </Suspense>
    );
}
