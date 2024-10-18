import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import './Spots.css';

export default function Spots() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getAllSpots());
   }, [dispatch]);

   const spots = useSelector((state) => state.spots)
   const spotsArray = spots ? Object.values(spots) : [];

   console.log(spotsArray)
   
   return(
      <div className="home-container">
         <h1>Stay at the home of your favorite team!</h1>

         <div className="spots-grid">
            {spotsArray.map((spot) => (
               <NavLink
                  to={`/spots/${spot.id}`}
                  key={spot.id}
                  className="spot-link"
               >
                  <div className="spot-box">
                     <div className="spot-name">
                        <h2>{spot.name}</h2>
                     </div>

                     <div className="spot-image-box">
                        <img
                           className="spot-image"
                           src={spot.previewImage}
                           alt={spot.name}
                        ></img>
                     </div>

                     <div className="spot-details-box">
                        <div className="spot-location">
                           <p>{spot.city},</p>
                           <p>{spot.state}</p>
                        </div>
                     </div>

                     <div className="spot-rating-box">
                        {spot.avgRating ? spot.avgRating.toFixed(2) : 'NEW'}
                     </div>

                     <div className="spot-price">{spot.price}</div>
                  </div>
               </NavLink>
            ))}
         </div>
      </div>
   );
}
