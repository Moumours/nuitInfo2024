import React, { useState as _S, useEffect as _E, useRef as _R, useCallback as _CB } from 'react';
import './index.scss';

const CookieClicker = () => {
    const [_c, _setC] = _S(0);
    const [_t, _setT] = _S("");
    const [_m, _setM] = _S("Bienvenue sur le cookie clicker ! Il suffit de faire un 'CLIQUE' pour collecter des cookies :)");
    const [_mc, _setMC] = _S(0);
    const _bR = _R(null);
    const [_isL, _setIsL] = _S(false);
    const _rR = _R(null);

    const _sw = 100;

    const _hC = () => {
        if (_c === 99) {  
            _setM("Bravo à toi d'avoir fini ce clicker !");
            _setC(_c + 1);
        }
        else if (_c % 10 === 9) {  
            _setM("JE ..... Nan cette fois-ci, je passe mon tour... Après tant de clics tu ne sais toujours pas faire un 'CLIQUE' ?!");
        } else {
            const _rM = [
                "SERIEUSEMENT ? TU NE SAIS PAS FAIRE UN 'CLIQUE' ?!",
                "C'EST PAS POSSIBLE, TU N'ARRIVES MÊME PAS À FAIRE UN 'CLIQUE' ?!",
                "ALORS T'ES LÀ À HÉSITER POUR UN 'CLIQUE' ? MAIS BORDEL, CLIQUE !",
                "COMMENT C'EST POSSIBLE DE NE PAS SAVOIR FAIRE UN 'CLIQUE' ?!",
                "DÉCIDE-TOI, FAIS UN 'CLIQUE' ET VITE, C'EST PAS UN TEST DE QI !",
            ];
            _setM(_rM[Math.floor(Math.random() * _rM.length)]);
        }
    };

    const _hKP = _CB((e) => {
        if (/[a-zA-Z]/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey ) {
            if (_c < 35){  
                const _uI = _t + e.key.toUpperCase();

                if (_uI === "CLIQUE") {
                    _setM("Bravo, tu as écrit 'CLIQUE' !");
                    _setC(_c + 1);
                    _setT("");
                } else if (_uI === "CLIQUE".slice(0, _uI.length)) {
                    _setT(_uI);
                } else {
                    _setM("Qu'est ce que tu fais exactement..... 'CLIQUE' c'est pas compliqué !");
                    _setT("");
                }
            } else if (_c >= 35 && _c < 80) { 
                _setM("Tu as écrit 'CLIQUE' 35 fois, c'est bien mais... sauras-tu dire 'CLIQUE' ?");
                _hVC();
            }
        } else {
            _setM("");
        }
    }, [_c, _t]); 

    const _hME = () => {
        if (_mc < 15) {
            const _b = _bR.current;
            if (_b) {
                const _mX = window.innerWidth - _b.offsetWidth;
                const _mY = window.innerHeight - _b.offsetHeight;
                const _rX = Math.floor(Math.random() * _mX) + _sw;
                const _rY = Math.floor(Math.random() * _mY);

                _b.style.position = 'absolute';
                _b.style.left = `${_rX}px`;
                _b.style.top = `${_rY}px`;

                _setMC(_mc + 1);
            }
        }
    };

    _E(() => {
        const _hKD = (e) => _hKP(e);
        window.addEventListener('keydown', _hKD);

        return () => {
            window.removeEventListener('keydown', _hKD);
        };
    }, [_hKP]);

    const _hVC = _CB(() => {
        if (!_isL && _c >= 35 && _c < 80) {
            _setIsL(true);
            _rR.current.start();
        }
    }, [_isL, _c]);

    _E(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            _setM("Ton navigateur ne supporte pas la reconnaissance vocale... Abandonne !");
            return;
        }

        const _SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        const _r = new _SR();
        _r.lang = 'fr-FR';
        _r.continuous = false;
        _r.interimResults = false;
        _r.onstart = () => {
            _setM("Je t'écoute... Dis 'CLIQUE'.");
        };

        _r.onresult = (event) => {
            const _sR = event.results[0][0].transcript.toLowerCase();
            if (_sR.includes("clique") || _sR.includes("clic")) {
                _setM("Bravo, tu sais parler ! Cookie +1.");
                _setC(_c + 1);
            } else {
                _setM("MAIS CLIQUE BORDEL !");
            }
        };

        _r.onerror = () => {
            _setM("Erreur... Encore raté ? Sérieux ?");
        };

        _r.onend = () => {
            _setIsL(false);
        };

        _rR.current = _r;

    }, [_c]);

    _E(() => {
        if (_c >= 35 && _c < 45 && !_isL) {
            _hVC();
        } else if (_c >= 45 && _isL) {
            _rR.current.stop();
            _setIsL(false);
        }
    }, [_c, _hVC, _isL]);

    const _hRC = (e) => {
        e.preventDefault();
        if (_c >= 45 && _c < 99) {
            _setM("Tu vois quand tu veux...");
            _setC(_c + 1);
        }
        else if (_c >= 99) {  
            _setM("Aller je sais que tu meurs d'envie de cliquer....");
        }
    };

    const _aC = () => {
        _setC(_c + 1);
    };

    return (
        <div className="cookie-clicker" onContextMenu={_hRC}>
            <h1>Cookie Clicker</h1>
            <p>Cookies: {_c}</p>
            <p>{_m}</p>
            <button
                ref={_bR}
                onClick={_hC}
                onMouseEnter={_hME}
                class="cookie-button"
            >
                <pre>
          &lt;img src="https://www.cookiesinmytoaster.com/cookieking.jpg" alt="Cookie"&gt;
        </pre>
            </button>

            {/* Bouton pour ajouter des cookies rapidement */}
            <pre>
                &lt;button onClick={_aC} className="test-add-cookie"&gt;
                    Ajouter un cookie !
                &lt;/button
            </pre>
        </div>
    );
};

export default CookieClicker;
