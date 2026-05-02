import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, QrCode, Scan, AlertCircle, CheckCircle } from 'lucide-react';

function QRScanner() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResult = (result, error) => {
    if (!!result) {
      setSuccess(true);
      const url = result?.text;
      
      // Extract sessionId from URL (Format: /attendance/:sessionId)
      try {
        const parts = url.split('/');
        const sessionId = parts[parts.length - 1];
        
        if (sessionId) {
          setTimeout(() => {
            navigate(`/attendance/${sessionId}`);
          }, 1000);
        } else {
          setError('Invalid QR Code format');
        }
      } catch (err) {
        setError('Failed to parse QR Code');
      }
    }

    if (!!error && error?.name !== 'v' && error?.name !== 'u') {
       // Only log real errors, not the constant 'no QR code found' scanning logs
       console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between text-white border-b border-white/10 backdrop-blur-md bg-black/20 fixed top-0 w-full z-50">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <QrCode className="text-green-500" size={24} />
          <h1 className="font-bold tracking-tight">QR ATTENDANCE SCANNER</h1>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Main Scanner Body */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 mt-16">
        <div className="w-full max-w-md aspect-square relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl shadow-green-500/20">
          <QrReader
            constraints={{ facingMode: 'environment' }}
            onResult={handleResult}
            className="w-full h-full"
            videoStyle={{ objectFit: 'cover' }}
          />
          
          {/* Overlay Scanner UI */}
          <div className="absolute inset-0 border-[40px] border-black/40 flex items-center justify-center">
             <div className="w-full h-full border-2 border-green-500 rounded-3xl relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400 -mt-1 -ml-1 rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400 -mt-1 -mr-1 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400 -mb-1 -ml-1 rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400 -mb-1 -mr-1 rounded-br-xl"></div>
                
                {/* Scanning Animation Line */}
                <div className="w-full h-0.5 bg-green-500/50 shadow-[0_0_15px_rgba(34,197,94,1)] absolute top-0 animate-scanLine"></div>
             </div>
          </div>

          {/* Feedback Overlays */}
          {success && (
            <div className="absolute inset-0 bg-green-600/90 flex flex-col items-center justify-center text-white animate-fadeIn">
              <CheckCircle size={80} className="mb-4 animate-bounce" />
              <p className="text-xl font-bold">QR Code Detected!</p>
              <p className="text-green-100 opacity-80">Redirecting to marking page...</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center max-w-xs">
          {error ? (
            <div className="bg-rose-500/20 text-rose-300 p-4 rounded-2xl flex items-center gap-3 border border-rose-500/30 animate-pulse">
              <AlertCircle size={20} />
              <p className="text-sm font-bold">{error}</p>
            </div>
          ) : (
            <div className="text-gray-400 flex flex-col items-center gap-4">
              <div className="p-4 bg-white/5 rounded-full animate-pulse">
                <Scan size={32} className="text-green-500" />
              </div>
              <div>
                <p className="text-white font-bold text-lg mb-1">Position QR in the frame</p>
                <p className="text-sm opacity-60">Scanning will start automatically once a valid code is detected.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-8 text-center border-t border-white/5 bg-black/20">
         <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">Powered by Student Management</p>
         <div className="flex justify-center gap-2">
            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            <div className="w-1 h-1 bg-green-500/50 rounded-full"></div>
            <div className="w-1 h-1 bg-green-500/20 rounded-full"></div>
         </div>
      </div>

      <style>{`
        @keyframes scanLine {
          0% { top: 0% }
          100% { top: 100% }
        }
        .animate-scanLine {
          animation: scanLine 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default QRScanner;
