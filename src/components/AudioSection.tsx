import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Mic, Video, Music } from "lucide-react";
import music1 from '../public/Image/motivation-motivational-background-music-388288.mp3';

const AudioSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [audioType, setAudioType] = useState<"intro" | "background" | null>(
    null
  );
  const [backgroundMusicPlaying, setBackgroundMusicPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);

  // Background music auto-play on page load
  useEffect(() => {
    const playBackgroundMusic = () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.volume = 1.0;
        backgroundMusicRef.current.play().catch(() => {
          // Auto-play blocked, user interaction required
        });
        setBackgroundMusicPlaying(true);
      }
    };

    // Delay to ensure page is loaded
    const timer = setTimeout(playBackgroundMusic, 2000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      if (backgroundMusicPlaying) {
        backgroundMusicRef.current.pause();
      } else {
        backgroundMusicRef.current.play();
      }
      setBackgroundMusicPlaying(!backgroundMusicPlaying);
    }
  };

  const openAudioModal = (type: "intro" | "background") => {
    setAudioType(type);
    setShowAudioModal(true);
  };

  return (
    <>
      {/* Floating Audio Controls */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-1/2 right-6 transform -translate-y-1/2 z-40 space-y-4">
        {/* About Me Audio Button */}
        <motion.button
          onClick={() => openAudioModal("intro")}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
          <Mic className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </motion.button>

        {/* Background Music Toggle */}
        <motion.button
          onClick={toggleBackgroundMusic}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
            backgroundMusicPlaying
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
              : "bg-gradient-to-r from-gray-600 to-gray-700 text-white"
          }`}>
          <Music className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </motion.button>

        {/* Audio indicator */}
        {(isPlaying || backgroundMusicPlaying) && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
          />
        )}
      </motion.div>

      {/* Background Music Audio Element */}
      {music1 && backgroundMusicRef && (
        <audio
          ref={backgroundMusicRef}
          loop
          preload="auto"
          autoPlay
          onPlay={() => {
            setBackgroundMusicPlaying(true);
          }}
          onPause={() => setBackgroundMusicPlaying(false)}>
          <source src={music1} type="audio/wav" />
          {/* Fallback to a royalty-free background music URL */}
          <source src={music1} type="audio/mpeg" />
        </audio>
      )}

      {/* Audio Modal */}
      <AnimatePresence>
        {showAudioModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAudioModal(false)}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {audioType === "intro" ? (
                    <Mic className="w-10 h-10 text-white" />
                  ) : (
                    <Music className="w-10 h-10 text-white" />
                  )}
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {audioType === "intro"
                    ? "About Me - Audio Introduction"
                    : "Background Music"}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {audioType === "intro"
                    ? "Listen to a personal introduction about my journey, skills, and passion for development."
                    : "Toggle relaxing background music while browsing the portfolio."}
                </p>

                {audioType === "intro" && (
                  <div className="space-y-4">
                    {/* Audio Player */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <audio
                        ref={audioRef}
                        controls
                        className="w-full"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => setIsPlaying(false)}>
                        <source
                          src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
                          type="audio/wav"
                        />
                        {/* In a real implementation, you would have your actual audio introduction */}
                        Your browser does not support the audio element.
                      </audio>
                    </div>

                    {/* Custom Controls */}
                    <div className="flex items-center justify-center space-x-4">
                      <motion.button
                        onClick={togglePlay}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg">
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6 ml-1" />
                        )}
                      </motion.button>

                      <motion.button
                        onClick={toggleMute}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center">
                        {isMuted ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>

                    {/* Video Option */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
                      <Video className="w-5 h-5" />
                      <span>Watch Video Introduction</span>
                    </motion.button>
                  </div>
                )}

                {audioType === "background" && (
                  <div className="space-y-4">
                    <motion.button
                      onClick={toggleBackgroundMusic}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                        backgroundMusicPlaying
                          ? "bg-gradient-to-r from-red-600 to-pink-600 text-white"
                          : "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                      }`}>
                      {backgroundMusicPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                      <span>
                        {backgroundMusicPlaying ? "Pause Music" : "Play Music"}
                      </span>
                    </motion.button>

                    <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      Relaxing instrumental music to enhance your browsing
                      experience
                    </div>
                  </div>
                )}

                <motion.button
                  onClick={() => setShowAudioModal(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Introduction Button in Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-24 left-6 z-40">
        <motion.button
          onClick={() => openAudioModal("intro")}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative">
          <Mic className="w-8 h-8 group-hover:scale-110 transition-transform" />

          {/* Pulse animation */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-purple-600 rounded-full"
          />

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
              Listen to my introduction
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Background Music Indicator */}
      {backgroundMusicPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700 z-30">
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}>
              <Music className="w-4 h-4 text-green-600" />
            </motion.div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Background Music
            </span>
            <motion.button
              onClick={toggleBackgroundMusic}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors">
              <Pause className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AudioSection;
