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
        if (count === 99) {  // 100e clic
            setMessage("Bravo à toi d'avoir fini ce clicker !");
            setCount(count + 1);
        }
        else if (count % 10 === 9) {  // tous les 10 clics
            setMessage("JE ..... Nan cette fois-ci, je passe mon tour... Après tant de clics tu ne sais toujours pas faire un 'CLIQUE' ?!");
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
            if (count < 35){  // 35 clics avant de déclencher la partie de saisie
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
            } else if (count >= 35 && count < 80) { // Transition vers la partie vocal
                setMessage("Tu as écrit 'CLIQUE' 35 fois, c'est bien mais... sauras-tu dire 'CLIQUE' ?");
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
        if (!isListening && count >= 35 && count < 80) {
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
        if (count >= 35 && count < 45 && !isListening) {
            handleVoiceClick();
        } else if (count >= 45 && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, [count, handleVoiceClick, isListening]); // Ajout de handleVoiceClick et isListening en dépendance

    // Gestion du clic droit
    const handleRightClick = (e) => {
        e.preventDefault(); // Empêche le menu contextuel
        if (count >= 45 && count < 99) {
            setMessage("Tu vois quand tu veux...");
            setCount(count + 1);
        }
        else if (count >= 99) {  // Objectif final atteint
            setMessage("Aller je sais que tu meurs d'envie de cliquer....");
            //le clic gauche est autorisé
        }
    };

    // Fonction pour ajouter des cookies rapidement
    const addCookies = () => {
        setCount(count + 1);
    };

    return (
        <div className="cookie-clicker" onContextMenu={handleRightClick}>
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

            {/* Bouton pour ajouter des cookies rapidement */}
            <pre>
                &lt;button onClick={addCookies} className="test-add-cookie"&gt;
                    Ajouter un cookie !
                &lt;/button
            </pre>
        </div>
    );
};
 
export default CookieClicker;
