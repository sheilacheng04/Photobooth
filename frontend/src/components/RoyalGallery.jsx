import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const RoyalGallery = forwardRef(({ portraitRef, capturedImage = null, onImageCapture, letterName = '', letterText = '' }, ref) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      setError('Unable to access camera. Please check permissions.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const takePhoto = () => {
    if (!cameraActive) {
      // Auto-start camera first if not active
      startCamera().then(() => {
        // Will need to take photo after camera starts
      });
      return;
    }
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      
      const photoData = canvasRef.current.toDataURL('image/jpeg', 0.95);
      if (onImageCapture) {
        onImageCapture(photoData);
      }
      stopCamera();
    }
  };

  const handleRetake = () => {
    if (onImageCapture) {
      onImageCapture(null);
    }
    startCamera();
  };

  // Expose camera functions via ref
  useImperativeHandle(ref, () => ({
    startCamera,
    stopCamera,
    takePhoto,
    handleRetake,
    cameraActive
  }), [cameraActive]);

  useEffect(() => {
    // Auto-start camera on mount
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      {error && (
        <p className="mb-4 text-deep-rose text-center font-body text-sm max-w-sm">
          {error}
        </p>
      )}

      {/* Output Frame — Photobooth strip + letter display */}
      <div className="keepsake-output-frame" ref={portraitRef}>
        <div className="keepsake-output-inner">
          {/* Photobooth Strip */}
          <div className="photobooth-strip-wrapper">
            <div className="photobooth-strip">
              {[0, 1, 2].map((index) => (
                <div key={index} className="photobooth-frame">
                  {capturedImage ? (
                    <img
                      src={capturedImage}
                      alt={`Portrait ${index + 1}`}
                      className="portrait-image"
                    />
                  ) : cameraActive && index === 0 ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="portrait-image"
                    />
                  ) : (
                    <div className="portrait-placeholder">
                      <svg
                        className="w-8 h-8 text-rose-gold/30 mb-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                      <span className="font-body text-rose-gold/40 text-[10px]">
                        Photo {index + 1}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Letter Output */}
          <div className="keepsake-letter-output">
            {letterText || letterName ? (
              <div className="letter-output-content">
                {letterName && (
                  <p className="font-signature text-lg text-rose-gold mb-2 border-b border-rose-gold/20 pb-1">
                    {letterName}
                  </p>
                )}
                {letterText && (
                  <p className="font-typewriter text-xs text-rose-gold/80 leading-relaxed whitespace-pre-wrap">
                    {letterText}
                  </p>
                )}
              </div>
            ) : (
              <div className="letter-output-placeholder">
                <p className="font-body text-xs text-rose-gold/30 italic text-center">
                  Thy letter shall<br />appear here...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

RoyalGallery.displayName = 'RoyalGallery';

export default RoyalGallery;
