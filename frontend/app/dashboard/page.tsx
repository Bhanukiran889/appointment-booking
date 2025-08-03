
'use client';

import { useState } from 'react';
import Header from '@/components/Header';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason?: string;
  prescription?: string;
  attended?: boolean;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'John Smith',
    date: '2024-01-15',
    time: '9:00 AM',
    status: 'scheduled',
    reason: 'Regular checkup and chest pain consultation'
  },
  {
    id: '2',
    patientName: 'Maria Garcia',
    date: '2024-01-15',
    time: '10:30 AM',
    status: 'completed',
    reason: 'Follow-up for hypertension',
    prescription: 'Continue with Lisinopril 10mg daily. Monitor blood pressure twice weekly.',
    attended: true
  },
  {
    id: '3',
    patientName: 'Robert Johnson',
    date: '2024-01-15',
    time: '2:00 PM',
    status: 'scheduled',
    reason: 'Skin rash examination'
  },
  {
    id: '4',
    patientName: 'Sarah Davis',
    date: '2024-01-14',
    time: '11:00 AM',
    status: 'completed',
    reason: 'Diabetes management consultation',
    prescription: 'Metformin 500mg twice daily. Schedule HbA1c test in 3 months.',
    attended: true
  },
  {
    id: '5',
    patientName: 'Michael Brown',
    date: '2024-01-14',
    time: '3:30 PM',
    status: 'completed',
    reason: 'Vaccination',
    attended: false
  }
];

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedTab, setSelectedTab] = useState('today');
  const [prescriptionModal, setPrescriptionModal] = useState<{ show: boolean; appointmentId: string; prescription: string }>({
    show: false,
    appointmentId: '',
    prescription: ''
  });

  const today = new Date().toISOString().split('T')[0];
  
  const filteredAppointments = appointments.filter(apt => {
    if (selectedTab === 'today') {
      return apt.date === today;
    } else if (selectedTab === 'upcoming') {
      return new Date(apt.date) > new Date() && apt.status === 'scheduled';
    } else if (selectedTab === 'completed') {
      return apt.status === 'completed';
    }
    return true;
  });

  const markAttendance = (appointmentId: string, attended: boolean) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'completed' as const, attended }
        : apt
    ));
  };

  const handlePrescriptionSubmit = () => {
    if (prescriptionModal.prescription.trim()) {
      setAppointments(prev => prev.map(apt => 
        apt.id === prescriptionModal.appointmentId
          ? { ...apt, prescription: prescriptionModal.prescription }
          : apt
      ));
    }
    setPrescriptionModal({ show: false, appointmentId: '', prescription: '' });
  };

  const openPrescriptionModal = (appointmentId: string, currentPrescription: string = '') => {
    setPrescriptionModal({
      show: true,
      appointmentId,
      prescription: currentPrescription
    });
  };

  const getTodayStats = () => {
    const todayAppointments = appointments.filter(apt => apt.date === today);
    const completed = todayAppointments.filter(apt => apt.status === 'completed').length;
    const scheduled = todayAppointments.filter(apt => apt.status === 'scheduled').length;
    const attended = todayAppointments.filter(apt => apt.attended === true).length;
    
    return { total: todayAppointments.length, completed, scheduled, attended };
  };

  const stats = getTodayStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
          <p className="text-gray-600">Manage your appointments and patient records</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <i className="ri-calendar-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <i className="ri-check-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <i className="ri-time-line text-orange-600 w-6 h-6 flex items-center justify-center"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">{stats.scheduled}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <i className="ri-user-heart-line text-purple-600 w-6 h-6 flex items-center justify-center"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Attended</p>
                <p className="text-2xl font-bold text-gray-900">{stats.attended}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900">Appointments</h2>
              
              {/* Tab Navigation */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'today', label: 'Today' },
                  { key: 'upcoming', label: 'Upcoming' },
                  { key: 'completed', label: 'Completed' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedTab === tab.key
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredAppointments.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-blue-600">
                              {appointment.patientName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{appointment.patientName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <p>{new Date(appointment.date).toLocaleDateString()}</p>
                        <p className="text-gray-500">{appointment.time}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                          appointment.status === 'completed'
                            ? appointment.attended
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                            : appointment.status === 'scheduled'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {appointment.status === 'completed'
                            ? appointment.attended ? 'Attended' : 'Not Attended'
                            : appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <p className="truncate">{appointment.reason || 'No reason specified'}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          {appointment.status === 'scheduled' ? (
                            <>
                              <button
                                onClick={() => markAttendance(appointment.id, true)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium whitespace-nowrap cursor-pointer"
                              >
                                Attended
                              </button>
                              <button
                                onClick={() => markAttendance(appointment.id, false)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium whitespace-nowrap cursor-pointer"
                              >
                                Not Attended
                              </button>
                            </>
                          ) : appointment.status === 'completed' ? (
                            <button
                              onClick={() => openPrescriptionModal(appointment.id, appointment.prescription)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium whitespace-nowrap cursor-pointer"
                            >
                              {appointment.prescription ? 'Edit Prescription' : 'Add Prescription'}
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-calendar-line text-2xl text-gray-400 w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-500">No appointments match the selected filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prescription Modal */}
      {prescriptionModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Add/Edit Prescription</h3>
            </div>
            <div className="p-6">
              <textarea
                value={prescriptionModal.prescription}
                onChange={(e) => setPrescriptionModal(prev => ({ ...prev, prescription: e.target.value }))}
                maxLength={500}
                rows={8}
                className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Enter prescription details, medications, dosage, and instructions..."
              />
              <p className="text-xs text-gray-500 mt-1">{prescriptionModal.prescription.length}/500 characters</p>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
              <button
                onClick={() => setPrescriptionModal({ show: false, appointmentId: '', prescription: '' })}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePrescriptionSubmit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium whitespace-nowrap cursor-pointer"
              >
                Save Prescription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
