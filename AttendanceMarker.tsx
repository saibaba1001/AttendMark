import React, { useState, useEffect } from 'react';
import { UserCheck, Loader2 } from 'lucide-react';
import { FaceCapture } from './FaceCapture';
import { supabase } from '../lib/supabase';
import * as faceapi from 'face-api.js';

export function AttendanceMarker() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const markAttendance = async (capturedDescriptor: Float32Array) => {
    setIsProcessing(true);
    setMessage('');

    try {
      const { data: students } = await supabase
        .from('students')
        .select('*');

      if (!students) {
        throw new Error('No students found');
      }

      let matchFound = false;
      for (const student of students) {
        const storedDescriptor = new Float32Array(student.face_descriptor);
        const distance = faceapi.euclideanDistance(capturedDescriptor, storedDescriptor);
        
        if (distance < 0.6) { // Threshold for face matching
          const { error } = await supabase
            .from('attendance')
            .insert([
              {
                student_id: student.id,
                date: new Date().toISOString(),
              },
            ]);

          if (error) throw error;

          setMessage(`Attendance marked for ${student.name}`);
          matchFound = true;
          break;
        }
      }

      if (!matchFound) {
        setMessage('No matching student found');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to mark attendance');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Mark Attendance</h2>
          <p className="mt-2 text-gray-600">
            Look at the camera and click capture to mark your attendance
          </p>
        </div>

        <FaceCapture onCapture={markAttendance} />

        {isProcessing && (
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </div>
        )}

        {message && (
          <div className="p-4 rounded-lg bg-blue-50 text-blue-700 flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
}