import React, { useState, useEffect, useRef } from 'react';
import './index.scss';

const CookieClicker = () => {
    const [count, setCount] = useState(0);
    const [typed, setTyped] = useState("");
    const [message, setMessage] = useState("");
    const [moveCount, setMoveCount] = useState(0);
    const buttonRef = useRef(null);
    const sidebarWidth = 100;

    const handleClick = () => {
        const randomMessages = [
            "MAIS 'CLIQUE' BORDEL",
            "T'ES SÛR DE SAVOIR CLIQUER ?",
            "SERIEUSEMENT, CLIQUE !!",
            "ALLO, T'ENTENDS QUAND JE TE PARLE ??",
            "CLIQUE, MERDE !"
        ];
        setMessage(randomMessages[Math.floor(Math.random() * randomMessages.length)]);
    };

    const handleKeyPress = (e) => {
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
    };

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
    }, [typed]);

    return (
        <div className="cookie-clicker">
            <h1>Cookie Clicker</h1>
            <p>Cookies: {count}</p>
            <button
                ref={buttonRef}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
            >
                Click me!
            </button>
            <p>{message}</p>
        </div>
    );
};

export default CookieClicker;
