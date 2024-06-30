// // services.js
// export default function useAudio(audioFilePath) {
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

//   return { playing, playAudio, pauseAudio };
// }
