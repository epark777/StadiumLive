import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getCurrentSpots } from '../../store/spots';
import { MdStarBorderPurple500 } from 'react-icons/md';
import './ManageSpots.css';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteFormModal from '../DeleteFormModal';

export default function ManageSpots() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const sessionUser = useSelector((state) => state.session.user);
   const userSpots = Object.values(useSelector((state) => state.spots));

   useEffect(() => {
      if(sessionUser){
         dispatch(getCurrentSpots());
      }

   }, [dispatch, sessionUser]);

   if (!Object.values(userSpots).length) {
      return (
         <div className="manage-page">
            <h1>Manage Spots</h1>
            <NavLink to="/spots/new" className="create-spot-link">
               Create a New Spot
            </NavLink>
         </div>
      );
   }

   return (
      <div className="manage-page">
         <h1>Manage Spots</h1>
         <div className="spots-grid">
            {userSpots.map((spot) => (
               <>
                  <div key={spot.id} className="spot-box">
                     <div className="spot-image-box">
                        <img
                           className="spot-image"
                           src={spot.previewImage}
                           alt={spot.name}
                           onClick={() => navigate(`/spots/${spot.id}`)}
                        ></img>
                     </div>

                     <div className="spot-details-box">
                        <div className="spot-location">
                           <p>
                              {spot.city}, {spot.state}
                           </p>
                        </div>
                        <div className="spot-rating-box">
                           <MdStarBorderPurple500 />
                           {spot.avgStarRating
                              ? spot.avgStarRating.toFixed(2)
                              : 'NEW'}
                        </div>
                     </div>
                     <div className="spot-price">${spot.price}</div>
                     <div className="update-buttons">
                     <NavLink to={`/spots/${spot.id}/edit`}>
                        <button className="spot-update">Update</button>
                     </NavLink>
                     <OpenModalButton
                              buttonText="Delete"
                              modalComponent={
                                 <DeleteFormModal
                                    id={spot.id}
                                    item={'Spot'}
                                 />
                              }
                           ></OpenModalButton>
                  </div>
                  </div>
                  

               </>
            ))}
         </div>
      </div>
   );
}
