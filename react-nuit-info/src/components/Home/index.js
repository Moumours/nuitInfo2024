import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import 'load-awesome/css/ball-pulse.css';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');

    const nameArray = [' ', 'C', 'o', 'u', 'c', 'o', 'u'];
    const jobArray1 = ['M', 'a', 'r', 'i', 'e', ' ', 'l', 'a'];
    const jobArray2 = ['g', 'o', 'u', 'r', 'm', 'a', 'n', 'd', 'e'];

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
                            strArray={nameArray}
                            idx={15}
                        />
                        <br />
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={jobArray1}
                            idx={22}
                        />
                        <br />
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={jobArray2}
                            idx={35}
                        />
                    </h1>
                    <h2><b>KPI / Machine Learning / NLP</b></h2>
                </div>
            </div>
            <Loader type="ball-grid-pulse" />
        </>
    );
};

export default Home;