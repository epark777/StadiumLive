import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import { useEffect } from 'react';
import './SpotsDetails.css';
import Reviews from '../Reviews';
import { MdStarBorderPurple500 } from 'react-icons/md';

export default function SpotsDetails() {
   const dispatch = useDispatch();
   const { id } = useParams();

   const spot = useSelector((state) => state.spots[id]);

   useEffect(() => {
      const fetch = async () => {
         dispatch(spotActions.getSpotById(id));
         dispatch(spotActions.getSpotReview(id));
      };
      fetch();
   }, [dispatch, id]);

   if (!spot) {
      return <h1>Loading stadium...</h1>;
   }

   const {
      name,
      city,
      state,
      country,
      previewImage,
      description,
      price,
      avgStarRating,
      numReviews,
   } = spot;

   const spotImages = spot.SpotImages;

   const { firstName, lastName } = spot.Owner || {
      firstName: null,
      lastName: null,
   };

   return (
      <div className="spot-view-container">
         <div className="spot-content-container">
            <div className="spot-header">
               <h1 className="spot-name">{name}</h1>
               <div className="spot-location">
                  <h2 className="city-state">
                     {city}, {state}
                  </h2>
                  <h3 className="spot-country">{country}</h3>
               </div>
            </div>

            <div className="spot-images-container">
               <div className="spot-preview-image">
                  <img src={previewImage} className="preview-img"></img>
               </div>
               {spotImages ? (
                  <div className="non-preview-image">
                     {spotImages.map((image) => (
                        <img
                           key={image.id}
                           src={image.url}
                           className="non-prev"
                        ></img>
                     ))}
                  </div>
               ) : null}
            </div>
            <div className="bottom-row">
               <div className="spot-info-container">
                  <div className="spot-desc">
                     <h2>
                        Hosted by: {firstName} {lastName}
                     </h2>
                     <p>{description}</p>
                  </div>
               </div>

               <div className="spot-booking-container">
                  <div className="spot-price">
                     <h2>${price}</h2>
                  </div>
                  <div className="spot-reviews-ratings">
                     <MdStarBorderPurple500 />

                     {numReviews
                        ? `${avgStarRating.toFixed(2)} · ${numReviews} review${
                             numReviews !== 1 ? 's' : ''
                          }`
                        : 'NEW'}
                  </div>
                  <button
                     onClick={() => alert('Feature Coming Soon!')}
                     className="reserve-button"
                  >
                     Reserve
                  </button>
               </div>
            </div>
         </div>
         <hr className="line" />
         <h2 className='review-header'>
            <MdStarBorderPurple500 />
            {numReviews
               ? `${avgStarRating.toFixed(2)} · ${numReviews} review${
                    numReviews !== 1 ? 's' : ''
                 }`
               : 'NEW'}
         </h2>
         <Reviews />
      </div>
   );
}
