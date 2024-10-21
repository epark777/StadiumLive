import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useNavigate } from 'react-router-dom';
import { LuMenuSquare } from 'react-icons/lu';

function ProfileButton({ user }) {
   const dispatch = useDispatch();
   const [showMenu, setShowMenu] = useState(false);
   const ulRef = useRef();

   const toggleMenu = (e) => {
      e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
      setShowMenu(!showMenu);
   };

   useEffect(() => {
      if (!showMenu) return;

      const closeMenu = (e) => {
         if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
         }
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener('click', closeMenu);
   }, [showMenu]);

   const navigate = useNavigate();

   const closeMenu = () => setShowMenu(false);

   const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
      closeMenu();
      navigate('/');
   };

   const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

   return (
      <>
         <button
            onClick={toggleMenu}
            style={{ border: 'none', backgroundColor: 'transparent' }}
         >
            <LuMenuSquare />
            <FaUserCircle />
         </button>
         <ul className={ulClassName} ref={ulRef}>
            {user ? (
               <>
                  <li> Hello, {user.firstName}</li>
                  <li>{user.email}</li>
                  <li>
                     <hr className="line" />
                     <NavLink to="spots/current" className="manage-link">
                        Manage Spots
                     </NavLink>
                     <hr className="line" />
                     <button onClick={logout}>Log Out</button>
                  </li>
               </>
            ) : (
               <>
                  <OpenModalMenuItem
                     itemText="Log In"
                     onItemClick={closeMenu}
                     modalComponent={<LoginFormModal />}
                  />
                  <OpenModalMenuItem
                     itemText="Sign Up"
                     onItemClick={closeMenu}
                     modalComponent={<SignupFormModal />}
                  />
               </>
            )}
         </ul>
      </>
   );
}

export default ProfileButton;
