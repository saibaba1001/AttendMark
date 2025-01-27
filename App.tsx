import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { UserPlus, UserCheck, GraduationCap } from 'lucide-react';
import { StudentForm } from './components/StudentForm';
import { AttendanceMarker } from './components/AttendanceMarker';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Face Attendance System
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  <UserPlus className="w-5 h-5" />
                  Register
                </Link>
                <Link
                  to="/attendance"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  <UserCheck className="w-5 h-5" />
                  Mark Attendance
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/register" element={<StudentForm />} />
            <Route path="/attendance" element={<AttendanceMarker />} />
            <Route
              path="/"
              element={
                <div className="text-center py-12">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to Face Attendance System
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    Choose an option to get started
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link
                      to="/register"
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <UserPlus className="w-5 h-5" />
                      Register New Student
                    </Link>
                    <Link
                      to="/attendance"
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <UserCheck className="w-5 h-5" />
                      Mark Attendance
                    </Link>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;