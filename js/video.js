/* ================================================
   Video Module - Webcam feed management
   ================================================ */
window.RR = window.RR || {};

RR.Video = (function () {
  let stream = null;
  let videoEl = null;

  async function start(videoElementId) {
    videoEl = document.getElementById(videoElementId || 'video-feed');
    if (!videoEl) {
      console.error('Video: element not found');
      return false;
    }

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false, // Audio is handled by Speech module
      });

      videoEl.srcObject = stream;
      await videoEl.play();
      return true;
    } catch (err) {
      console.error('Video: failed to access camera', err);
      return false;
    }
  }

  function stop() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
    }
    if (videoEl) {
      videoEl.srcObject = null;
    }
  }

  function isActive() {
    return stream !== null && stream.active;
  }

  return {
    start,
    stop,
    isActive,
  };
})();
