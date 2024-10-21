import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as spotActions from '../../store/spots';
import { NavLink } from 'react-router-dom';
import './Spots.css';
import { MdStarBorderPurple500 } from 'react-icons/md';

export default function Spots() {
   const dispatch = useDispatch();

   const spots = useSelector((state) => state.spots);

   const spotsArray = spots ? Object.values(spots) : [];

   useEffect(() => {
      dispatch(spotActions.getAllSpots());
   }, [dispatch]);

   const [showTooltip, setShowTooltip] = useState(null);

   if (!spotsArray.length || !spots) {
      return <p>No spots available!</p>;
   }

   return (
      <div className="home-container">
         <h1>Stay at the home of your favorite team!</h1>

         <div className="spots-grid">
            {spotsArray.map((spot) => (
               <NavLink
                  to={`/spots/${spot.id}`}
                  key={spot.id}
                  className="spot-link"
                  onMouseEnter={() => setShowTooltip(spot.id)}
                  onMouseLeave={() => setShowTooltip(null)}
                  style={{ cursor: 'pointer' }}
               >
                  <div className="spot-box">
                     <div className="spot-image-box">
                        <img
                           className="spot-image"
                           src={spot.previewImage}
                           alt={spot.name}
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
                     {showTooltip === spot.id && (
                        <div className="tooltip">{spot.name}</div>
                     )}
                  </div>
               </NavLink>
            ))}
         </div>
      </div>
   );
}
