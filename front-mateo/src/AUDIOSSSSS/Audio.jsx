// import React, { useState, useRef, useEffect } from "react";

// function Audio() {
//   const [playing, setPlaying] = useState(false);
//   const audioRef = useRef(null);

//   const playAudio = () => {
//     audioRef.current.play();
//     setPlaying(true);
//   };

//   const pauseAudio = () => {
//     audioRef.current.pause();
//     setPlaying(false);
//   };

//   useEffect(() => {
//     // Cleanup function to prevent memory leaks
//     return () => audioRef.current?.pause();
//   }, []);

//   return (
//     <audio
//       ref={audioRef}
//       src="path/to/your/audio.mp3"
//       preload="auto"
//       onEnded={() => pauseAudio()} // Pause when audio ends
//     >
//       Your browser does not support the audio element.
//     </audio>
//   );
// }

// export default Audio;
