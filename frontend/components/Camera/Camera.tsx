import React, { useRef, useState, useCallback, useEffect } from 'react';
import { CameraIcon, ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface CameraProps {
  onCapture?: (imageData: string) => void;
  onClose?: () => void;
}

export default function Camera({ onCapture, onClose }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const startCamera = useCallback(async () => {
    try {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError(null);
    } catch {
      setError('Unable to access camera. Please check permissions.');
    }
  }, [facingMode]);

  useEffect(() => {
    startCamera();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [facingMode]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setPhoto(dataUrl);
  };

  const retake = () => {
    setPhoto(null);
  };

  const confirm = () => {
    if (photo) {
      onCapture?.(photo);
    }
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <CameraIcon className="w-16 h-16 text-cigar-text-secondary mb-4" />
        <p className="text-cigar-text-secondary mb-4">{error}</p>
        <button onClick={startCamera} className="btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Close button */}
      <div className="absolute top-4 left-4 z-10">
        <button onClick={onClose} className="p-2 bg-black/50 rounded-full">
          <XMarkIcon className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Camera / Preview */}
      <div className="flex-1 relative overflow-hidden">
        {photo ? (
          <img src={photo} alt="Captured" className="w-full h-full object-contain" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />

        {/* Scan overlay guide */}
        {!photo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-40 border-2 border-cigar-accent/50 rounded-2xl">
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-sm text-cigar-accent/80 bg-black/40 px-3 py-1 rounded-full">
                  Align cigar band here
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black/80 safe-bottom px-6 py-4">
        {photo ? (
          <div className="flex items-center justify-center gap-6">
            <button onClick={retake} className="btn-secondary flex-1">
              Retake
            </button>
            <button onClick={confirm} className="btn-primary flex-1">
              Identify Cigar
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-8">
            <div className="w-12" /> {/* spacer */}
            <button
              onClick={capturePhoto}
              className="w-18 h-18 rounded-full bg-white border-4 border-cigar-accent flex items-center justify-center active:scale-95 transition-transform"
              style={{ width: 72, height: 72 }}
            >
              <div className="w-14 h-14 rounded-full bg-white" />
            </button>
            <button onClick={toggleCamera} className="p-3 bg-white/10 rounded-full">
              <ArrowPathIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
