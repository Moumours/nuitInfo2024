import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.scss';

const CookieClicker = () => {
    const [count, setCount] = useState(0);
    const [typed, setTyped] = useState("");
    const [message, setMessage] = useState("Bienvenue sur le cookie clicker ! Il suffit de faire un 'CLIQUE' pour collecter des cookies :)  ");
    const [moveCount, setMoveCount] = useState(0);
    const buttonRef = useRef(null);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    const sidebarWidth = 100;

    const handleClick = () => {
        if (count % 10 === 9) { 
            setMessage("JE ..... Nan cette fois-ci, je passe mon tour... Après tant de clics tu ne sais toujours pas faire un 'clique' ?!");
        } else {
            const randomMessages = [
                "SERIEUSEMENT ? TU NE SAIS PAS FAIRE UN 'CLIQUE' ?!",
                "C'EST PAS POSSIBLE, TU N'ARRIVES MÊME PAS À FAIRE UN 'CLIQUE' ?!",
                "ALORS T'ES LÀ À HÉSITER POUR UN 'CLIQUE' ? MAIS BORDEL, CLIQUE !",
                "COMMENT C'EST POSSIBLE DE NE PAS SAVOIR FAIRE UN 'CLIQUE' ?!",
                "DÉCIDE-TOI, FAIS UN 'CLIQUE' ET VITE, C'EST PAS UN TEST DE QI !",
            ];
            setMessage(randomMessages[Math.floor(Math.random() * randomMessages.length)]);
        }
    };

    const handleKeyPress = useCallback((e) => {
        if (/[a-zA-Z]/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey ) {
            if ( count < 10){
                const userInput = typed + e.key.toUpperCase();

                if (userInput === "CLIQUE") {
                    setMessage("Bravo, tu as écrit 'CLIQUE' !");
                    setCount(count + 1);
                    setTyped("");
                } else if (userInput === "CLIQUE".slice(0, userInput.length)) {
                    setTyped(userInput);
                } else {
                    setMessage("Qu'est ce que tu fais exactement..... 'CLIQUE' c'est pas compliqué !");
                    setTyped("");
                }
            } else {
                setMessage("Tu as écrit 'CLIQUE' 10 fois, c'est bien mais... sauras-tu cliquer cette fois-ci ?");
                handleVoiceClick();
            }
        } else {
            setMessage("");
        }
    }, [count, typed]); // Ajout des dépendances nécessaires

    const handleMouseEnter = () => {
        if (moveCount < 15) {
            const button = buttonRef.current;
            if (button) {
                const maxX = window.innerWidth - button.offsetWidth;
                const maxY = window.innerHeight - button.offsetHeight;
                const randomX = Math.floor(Math.random() * maxX) + sidebarWidth;
                const randomY = Math.floor(Math.random() * maxY);

                button.style.position = 'absolute';
                button.style.left = `${randomX}px`;
                button.style.top = `${randomY}px`;

                setMoveCount(moveCount + 1);
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => handleKeyPress(e);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyPress]); // Ajout de handleKeyPress en dépendance

    const handleVoiceClick = useCallback(() => {
        if (!isListening && count >= 10 && count < 20) {
            setIsListening(true);
            recognitionRef.current.start();
            console.log("ON ECOUTE");
        }
    }, [isListening, count]); // Ajout de isListening et count comme dépendances

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            setMessage("Ton navigateur ne supporte pas la reconnaissance vocale... Abandonne !");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'fr-FR';
        recognition.continuous = false;
        recognition.interimResults = false;
        console.log("RECOGNITION", recognition);
        recognition.onstart = () => {
            setMessage("Je t'écoute... Dis 'CLIQUE'.");
        };

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript.toLowerCase();
            console.log("SPEECH RESULT", speechResult);
            if (speechResult.includes("clique") || speechResult.includes("clic")) {
                setMessage("Bravo, tu sais parler ! Cookie +1.");
                setCount(count + 1);
            } else {
                setMessage("MAIS CLIQUE BORDEL !");
            }
        };

        recognition.onerror = () => {
            setMessage("Erreur... Encore raté ? Sérieux ?");
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

    }, [count]);

    useEffect(() => {
        if (count >= 10 && count < 20 && !isListening) {
            handleVoiceClick();
        } else if (count >= 20 && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, [count, handleVoiceClick, isListening]); // Ajout de handleVoiceClick et isListening en dépendance

    return (
        <div className="cookie-clicker">
            <h1>Cookie Clicker</h1>
            <p>Cookies: {count}</p>
            <p>{message}</p>
            <button
                ref={buttonRef}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
            >
                Click me!
            </button>
        </div>
    );
};

export default CookieClicker;
