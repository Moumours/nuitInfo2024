import React, { useState } from 'react';
import './index.scss';

const CookieClicker = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div className="cookie-clicker">
            <h1>Cookie Clicker</h1>
            <p>Cookies: {count}</p>
            <button onClick={handleClick}>Click me!</button>
        </div>
    );ﬂ
};

export default CookieClicker;