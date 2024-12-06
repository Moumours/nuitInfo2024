import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import 'load-awesome/css/ball-pulse.css';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');

    const line1 = ['N', 'o', 'u', 's', ' ', 's', 'o', 'm', 'm', 'e', 's'];
    const line2 = [' ', 'l', 'e', 's',' ', 'D', 'o', 'g', 'g', 'o', 's', ];
    const line3 = [ 'G', 'o', 'u', 'r', 'm', 'a', 'n', 'd', 's'];
    

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <div className="container home-page">
                <div className="text-zone">
                    <h1>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={line1}
                            idx={15}
                        />
                        <br />
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={line2}
                            idx={22}
                        />
                        <br />
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={line3}
                            idx={35}
                        />
                    </h1>
                    <h2><b>Woof Woof comme on dit</b></h2>
                </div>
            </div>
            <Loader type="ball-grid-pulse" />
        </>
    );
};

export default Home;