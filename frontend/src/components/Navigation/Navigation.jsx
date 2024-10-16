import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { MdOutlineStadium } from 'react-icons/md';

// <MdOutlineStadium />

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
               {isLoaded && (
                    <div className="profile-button">
                         <ProfileButton user={sessionUser} />
                    </div>
               )}
          </div>
     );
}

export default Navigation;

{
     /* <ul>
<li>
  <NavLink to="/">Home</NavLink>
</li>
{isLoaded && (
  <li>
    <ProfileButton user={sessionUser} />
  </li>
)}
</ul> */
}
