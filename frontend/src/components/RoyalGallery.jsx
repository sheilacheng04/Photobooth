import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';

const RoyalGallery = forwardRef(({ portraitRef, capturedImages = [null, null, null], onImageCapture, letterName = '', letterText = '' }, ref) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const videoRefs = useRef([null, null, null]);

  // How many photos have been taken so far
  const photosTaken = capturedImages.filter(img => img !== null).length;

  const assignStreamToVideos = useCallback(() => {
    if (!streamRef.current) return;
    videoRefs.current.forEach((video) => {
      if (video && !video.srcObject) {
        video.srcObject = streamRef.current;
      }
    });
  }, []);

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
      setCameraActive(true);
      // Give React a tick to render the video elements, then attach the stream
      setTimeout(() => assignStreamToVideos(), 50);
    } catch (err) {
      setError('Unable to access camera. Please check permissions.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const takePhoto = () => {
    if (!cameraActive) {
      startCamera();
      return;
    }

    // Find the first active video element to capture from
    const activeVideo = videoRefs.current.find(v => v && v.srcObject && v.readyState >= 2);
    if (!activeVideo || !canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = activeVideo.videoWidth;
    canvasRef.current.height = activeVideo.videoHeight;
    context.drawImage(activeVideo, 0, 0);

    const photoData = canvasRef.current.toDataURL('image/jpeg', 0.95);
    const newImages = [...capturedImages];
    newImages[photosTaken] = photoData;

    if (onImageCapture) {
      onImageCapture(newImages);
    }

    // If all 3 photos are now taken, stop the camera
    if (photosTaken + 1 >= 3) {
      stopCamera();
    }
  };

  const handleRetake = () => {
    if (onImageCapture) {
      onImageCapture([null, null, null]);
    }
    startCamera();
  };

  // Reassign stream whenever new video elements render (after a photo is taken)
  useEffect(() => {
    if (cameraActive) {
      // Small delay so new video elements are in the DOM
      const id = setTimeout(() => assignStreamToVideos(), 50);
      return () => clearTimeout(id);
    }
  }, [cameraActive, capturedImages, assignStreamToVideos]);

  // Expose camera functions via ref
  useImperativeHandle(ref, () => ({
    startCamera,
    stopCamera,
    takePhoto,
    handleRetake,
    cameraActive,
    photosTaken,
    allPhotosTaken: photosTaken >= 3
  }), [cameraActive, photosTaken]);

  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Callback ref to attach the stream to each video element as it mounts
  const setVideoRef = (index) => (el) => {
    videoRefs.current[index] = el;
    if (el && streamRef.current) {
      el.srcObject = streamRef.current;
    }
  };

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
                  {capturedImages[index] ? (
                    <img
                      src={capturedImages[index]}
                      alt={`Portrait ${index + 1}`}
                      className="portrait-image"
                    />
                  ) : cameraActive ? (
                    <video
                      ref={setVideoRef(index)}
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
