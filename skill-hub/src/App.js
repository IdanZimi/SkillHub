//import './App.css';
import { stack as Menu } from 'react-burger-menu'
import './styles/Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faAddressCard, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className='container'>
      <Menu>
        <a id="home" className="bm-item" href="/"><FontAwesomeIcon icon={faHouse} size='xl' flip /> Home</a>
        <a id="about" className="bm-item" href="/about"><FontAwesomeIcon icon={faAddressCard} size='xl'/> About</a>
        <a id="contact" className="bm-item" href="/projects"><FontAwesomeIcon icon={faPeopleGroup} size='xl'/> Projects</a>
      </Menu>
    </div>
  );
}

export default App;
