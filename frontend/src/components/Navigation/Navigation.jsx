import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { MdOutlineStadium } from 'react-icons/md';

function Navigation({ isLoaded }) {
   const sessionUser = useSelector((state) => state.session.user);

   return (
      <div className="navbar">
         <NavLink to="/">
            <div className="logo">
               <MdOutlineStadium />
               <a>StadiumLive</a>
            </div>
         </NavLink>
         <div className='right-side'>
         {isLoaded && (
            <>
               {sessionUser ? (
                  <NavLink to="/spots/new" className="create-spot-button">Create a new stadium</NavLink>
               ) : null}
               <div className="profile-button">
                  <ProfileButton user={sessionUser} />
               </div>
            </>
         )}
         </div>
      </div>
   );
}

export default Navigation;
