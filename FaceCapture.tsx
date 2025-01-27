import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { Camera, Loader2 } from 'lucide-react';

interface FaceCaptureProps {
  onCapture: (descriptor: Float32Array) => void;
}

export function FaceCapture({ onCapture }: FaceCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCaptureReady, setCaptureReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
        await Promise.all([
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading models:', error);
        setError('Failed to load face detection models. Please refresh the page and try again.');
        setIsLoading(false);
      }
    };
    loadModels();
  }, []);

  const capture = async () => {
    if (webcamRef.current) {
      try {
        const image = webcamRef.current.getScreenshot();
        if (image) {
          const img = await faceapi.fetchImage(image);
          const detections = await faceapi.detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          
          if (detections) {
            onCapture(detections.descriptor);
            setCaptureReady(true);
          } else {
            setError('No face detected. Please ensure your face is clearly visible and try again.');
          }
        }
      } catch (error) {
        console.error('Error during face capture:', error);
        setError('Failed to capture face. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading face detection models...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 text-red-700">
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null);
            setCaptureReady(false);
          }}
          className="mt-2 text-sm text-red-600 hover:text-red-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Webcam
        ref={webcamRef}
        className="rounded-lg shadow-lg"
        screenshotFormat="image/jpeg"
        mirrored
        videoConstraints={{
          width: 640,
          height: 480,
          facingMode: "user"
        }}
      />
      <button
        onClick={capture}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isCaptureReady}
      >
        <Camera className="w-5 h-5" />
        {isCaptureReady ? 'Face Captured!' : 'Capture Face'}
      </button>
    </div>
  );
}