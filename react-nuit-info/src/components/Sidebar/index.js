import './index.scss'
import lapin from '../../assets/images/lapin.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'
import {faLinkedin,faGithub} from '@fortawesome/free-brands-svg-icons'
import {faEnvelope, faHome, faUser, faSuitcase, faFolder} from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => (
    <div className = "nav-bar">
        <Link className="logo" to="https://www.youtube.com/watch?v=dQw4w9WgXcQ" style={{ textDecoration: 'none' }}>
            <img src={lapin} alt="logo" />
            <h3> 
                <b> Pierre
                <br/> Albertini </b>
            </h3>
        </Link>
        <nav>
            <NavLink exact="true" activeClassName="active" className="home-link" to="/">
                <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
            </NavLink>
            <NavLink exact="true" activeClassName="active" className="gamehub-link" to="/gamehub">
                <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
            </NavLink>
            <NavLink exact="true" activeClassName="active" className="settings-link" to="/settings">
                <FontAwesomeIcon icon={faSuitcase} color="#4d4d4e" />
            </NavLink>
            <NavLink exact="true" activeClassName="active" className="portfolio-link" to="/portfolio">
                <FontAwesomeIcon icon={faFolder} color="#4d4d4e" />
            </NavLink>
            <NavLink exact="true" activeClassName="active" className="contact-link" to="/contact">
                <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
            </NavLink>
        </nav>
        <ul>
            <li>
                <a target="_blank" className="linkedin-link" rel="noreferrer" href="https://www.linkedin.com/in/pierre-albertini-190600174/">
                    <FontAwesomeIcon icon={faLinkedin} color="#4d4d4e" />
                </a>
            </li>
            <li>
                <a target="_blank" className="github-link" rel="noreferrer" href="https://github.com/Moumours">
                    <FontAwesomeIcon icon={faGithub} color="#4d4d4e" />
                </a>
            </li>
        </ul>
    </div>
)

export default Sidebar