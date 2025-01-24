import { Link, useLocation } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import './NavBar.css';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/xkii/');
  return (
      <main className='nav-bar-container'>
      {user && ( 
        <nav className="nav-bar-wrapper">
          <div className="logo-wrapper">
            <h3>XKII<sup>™</sup></h3>
          </div>

            <ul className="nav-bar-btn-wrapper">
              <li><Link to="/"><h3>INDEX</h3></Link></li>
              <li><Link to="/xkii"><h3>EXPLORE</h3></Link></li>
              <li className="plus-btn">
                {isDetailPage ? null : <Link to="/xkii/add"><h3>+</h3></Link>}
              </li>
              <li><Link to="/" onClick={handleSignout}><h3>SIGN OUT</h3></Link></li>
            </ul>
        </nav>
      )}
    </main>
  );
};
export default NavBar;

// {user ? (
//   <nav>
//     <ul>
//       <li><Link to='/'>INDEX</Link></li>
//       <li><Link to='/xkii'>EXPLORE</Link></li>
//       <li><Link to="/xkii/add">+</Link></li>
//       <li><Link to='' onClick={handleSignout}>SIGN OUT</Link></li>
//     </ul>
//   </nav>
// ) : (
//   <nav>
//     <ul>
//       <li>
//         <Link to="/signin">SIGN IN</Link>
//       </li>
//       <li>
//         <Link to="/signup">SIGN UP</Link>
//       </li>
//     </ul>
//   </nav>
// )}