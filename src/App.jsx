import "regenerator-runtime/runtime";
import useClipboard from "react-use-clipboard";
import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaRegClipboard,
  FaCheck,
  FaRedo,
} from "react-icons/fa";

export default function App() {
  const [language, setLanguage] = useState("en-US"); // Default: English
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [isCopied, setCopied] = useClipboard(transcript, {
    successDuration: 2000,
  });
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language });
    setIsListening(true);
  };
  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };
  const handleReset = () => resetTranscript(); // Clears the speech-to-text transcript

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser does not support speech recognition.</p>;
  }

  return (
    <div className="container">
      <h2>🗣️ Speak Freely, Write Effortlessly!</h2>
      <div className="options">
        <div className="btn-style">
          <button onClick={setCopied} className="copy-btn">
            {isCopied ? <FaCheck color="green" /> : <FaRegClipboard />}{" "}
            {/* {isCopied ? " Copied!" : " Copy"} */}
          </button>
          <button
            onClick={startListening}
            className={isListening ? "active" : ""}
          >
            <FaMicrophone size={20} />
             {/* ({language}) */}
          </button>
          <button
          
            onClick={stopListening}
            className={!isListening ? "active" : ""}
          >
            <FaMicrophoneSlash size={20} />
          </button>
          <button onClick={handleReset} className="reset">
            <FaRedo />
          </button>
          <select
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value="en-US">English (US)</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="ur-PK">Urdu</option>
            <option value="ar-SA">Arabic</option>
          </select>
        </div>
      </div>

      <div className="main-content">{transcript}</div>
    </div>
  );
}
