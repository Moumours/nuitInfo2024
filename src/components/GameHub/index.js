import React, { useState, useEffect, useRef } from "react";
import "./index.scss";

const GameHub = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // Lettres de A à Z
  const [playerName, setPlayerName] = useState(""); // Nom du joueur
  const [rolling, setRolling] = useState([]); // Si les rouleaux défilent
  const [currentLetters, setCurrentLetters] = useState([]); // Lettres actuelles
  const [showPopup, setShowPopup] = useState(false); // Si la popup est affichée
  const [finalName, setFinalName] = useState(""); // Nom final
  const [nameLength, setNameLength] = useState(3); // Taille du nom
  const rollRefs = useRef([]); // Références aux éléments des rouleaux

  useEffect(() => {
    // Initialise les rouleaux selon la taille du nom
    const newRolling = Array(nameLength).fill(false);
    setRolling(newRolling);
    setCurrentLetters(Array(nameLength).fill("A"));

    // Nettoyer les références des rouleaux
    rollRefs.current = rollRefs.current.slice(0, nameLength);
  }, [nameLength]);

  useEffect(() => {
    // Fonction pour faire défiler les lettres
    const interval = setInterval(() => {
      setCurrentLetters((prev) =>
        prev.map((letter, index) =>
          rolling[index] ? alphabet[Math.floor(Math.random() * alphabet.length)] : letter
        )
      );
    }, 100); // Toutes les 100 ms, changer la lettre

    return () => clearInterval(interval); // Nettoyer l'intervalle à la fin
  }, [rolling]);

  // Fonction pour arrêter un rouleau
  const stopRolling = (index) => {
    const newRolling = [...rolling];
    newRolling[index] = false;
    setRolling(newRolling);
    setFinalName((prevName) => {
      const updatedName = prevName.split("");
      updatedName[index] = currentLetters[index];
      return updatedName.join("");
    });
  };

  // Fonction pour démarrer les rouleaux
  const startRolling = (index) => {
    const newRolling = [...rolling];
    newRolling[index] = true;
    setRolling(newRolling);
    setFinalName((prevName) => {
      const updatedName = [...prevName];
      updatedName[index] = "";
      return updatedName.join("");
    });
  };

  // Fonction pour valider le nom
  const validateName = () => {
    setShowPopup(true);
  };

  // Fonction pour fermer la popup
  const closePopup = (confirm) => {
    if (confirm) {
      alert(`Nom validé : ${finalName}`);
    }
    setShowPopup(false);
  };

  // Fonction pour gérer la modification de la taille du nom
  const handleNameLengthChange = (e) => {
    setNameLength(Number(e.target.value));
  };

  return (
    <div className="game-hub">
      <h1>Hub</h1>
      <p>Welcome to the Game Hub!</p>

      <div className="player-name">
        <p>Current name: {finalName}</p>

        {/* Choix de la taille du nom */}
        <div className="name-length">
          <label htmlFor="name-length">Taille du nom: </label>
          <select
            id="name-length"
            value={nameLength}
            onChange={handleNameLengthChange}
          >
            <option value={1}>1 lettres</option>
            <option value={2}>2 lettres</option>
            <option value={3}>3 lettres</option>
            <option value={4}>4 lettres</option>
            <option value={5}>5 lettres</option>
            <option value={6}>6 lettres</option>
            <option value={7}>7 lettres</option>
            <option value={8}>8 lettres</option>
            <option value={9}>9 lettres</option>
            <option value={10}>10 lettres</option>
          </select>
        </div>

        {/* Affichage des rouleaux défilants */}
        <div className="roll-container">
          {Array.from({ length: nameLength }).map((_, index) => (
            <div className="roll" ref={(el) => (rollRefs.current[index] = el)} key={index}>
              {currentLetters[index]}
            </div>
          ))}
        </div>

        <div>
          {Array.from({ length: nameLength }).map((_, index) => (
            <div key={index}>
              <button onClick={() => startRolling(index)}>Start Letter {index + 1}</button>
              <button onClick={() => stopRolling(index)}>Stop Letter {index + 1}</button>
            </div>
          ))}
        </div>

        <button onClick={validateName}>Validate Name</button>
      </div>

      {/* Popup de validation */}
      {showPopup && (
        <div className="popup">
          <p>Do you want to validate the name "{finalName}"?</p>
          <button onClick={() => closePopup(true)}>Yes</button>
          <button onClick={() => closePopup(false)}>No</button>
        </div>
      )}

      <p style={{ marginTop: "20px" }}>
        <a href="/" className="hub-link">Back to Home</a>
      </p>
    </div>
  );
};

export default GameHub;
