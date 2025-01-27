import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { FaceCapture } from './FaceCapture';
import { supabase } from '../lib/supabase';

export function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    student_code: '', 
    course: '',
  });
  const [faceDescriptor, setFaceDescriptor] = useState<Float32Array | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!faceDescriptor) {
      setError('Please capture your face first');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: supabaseError } = await supabase
        .from('students')
        .insert([
          {
            name: formData.name,
            student_code: formData.student_code,
            course: formData.course,
            face_descriptor: Array.from(faceDescriptor),
          },
        ]);

      if (supabaseError) throw supabaseError;

      alert('Registration successful!');
      setFormData({ name: '', student_code: '', course: '' });
      setFaceDescriptor(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Student Code
            </label>
            <input
              type="text"
              required
              value={formData.student_code}
              onChange={(e) => setFormData({ ...formData, student_code: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course
            </label>
            <input
              type="text"
              required
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Face Capture</h3>
          <FaceCapture onCapture={setFaceDescriptor} />
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-50 text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <UserPlus className="w-5 h-5" />
          {isSubmitting ? 'Registering...' : 'Register Student'}
        </button>
      </form>
    </div>
  );
}