import './index.scss'
import chien from '../../assets/images/happy_chien.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'
import {faLinkedin,faGithub} from '@fortawesome/free-brands-svg-icons'
import {faGear, faHome, faCookie, faGamepad, faFolder} from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => (
    <div className = "nav-bar">
        <Link className="logo" to="https://www.youtube.com/watch?v=dQw4w9WgXcQ" style={{ textDecoration: 'none' }}>
            <img src={chien} alt="logo" />
            <h3> 
                <b> Les Doggos
                <br/> Gourmands </b>
            </h3>
        </Link>
        <nav>
            <NavLink exact="true" activeClassName="active" className="home-link" to="/">
                <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
            </NavLink>
            <NavLink exact="true" activeClassName="active" className="gamehub-link" to="/gamehub">
                <FontAwesomeIcon icon={faGamepad} color="#4d4d4e" />
            </NavLink>
            <NavLink exact="true" activeClassName="active" className="cookie-clicker-link" to="/cookieclicker">
                <FontAwesomeIcon icon={faCookie} color="#4d4d4e" />
            </NavLink>
            <NavLink exact="true" activeClassName="active" className="settings-link" to="/settings">
                <FontAwesomeIcon icon={faGear} color="#4d4d4e" />
            </NavLink>
        </nav>
        <ul>
            <li>
                <a target="_blank" className="github-link" rel="noreferrer" href="https://github.com/Moumours/nuitInfo2024">
                    <FontAwesomeIcon icon={faGithub} color="#4d4d4e" />
                </a>
            </li>
        </ul>
    </div>
)

export default Sidebar