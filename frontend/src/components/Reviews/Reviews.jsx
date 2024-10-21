import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotById, getSpotReview } from '../../store/spots';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ReviewFormModal from '../ReviewsFormModal';
import DeleteFormModal from '../DeleteFormModal';
import './Reviews.css'

export default function Reviews() {
   const dispatch = useDispatch();
   const { id: spotId } = useParams();
   const sessionUser = useSelector((state) => state.session.user);
   const spot = useSelector((state) => state.spots[spotId]);

   const reviews = spot?.Reviews || [];
   const owner = spot?.ownerId;

   useEffect(() => {
      const getSpotData = async () => {
         dispatch(getSpotReview(spotId));
         dispatch(getSpotById(spotId));
      };
      getSpotData();
   }, [dispatch, spotId]);

   const hasReview =
      sessionUser &&
      reviews.some((review) => review.User.id === sessionUser.id);

   const formatDate = (dateString) => {
      const date = new Date(dateString);
      const months = [
         'January',
         'February',
         'March',
         'April',
         'May',
         'June',
         'July',
         'August',
         'September',
         'October',
         'November',
         'December',
      ];
      return `${months[date.getMonth()]}, ${date.getFullYear()}`;
   };

   const refreshReviews = async () => {
      if (spotId) {
         await dispatch(getSpotReview(spotId));
      }
   };

   return (
      <div className="review-container">
         {sessionUser && sessionUser.id !== owner && !hasReview && (
            <OpenModalButton
               buttonText="Post your review"
               modalComponent={
                  <ReviewFormModal
                     spotId={spotId}
                     onReviewPost={refreshReviews}
                  />
               }
            ></OpenModalButton>
         )}

         {reviews.length === 0 ? (
            <h3>Be the first to post a review!</h3>
         ) : (
            reviews
               .slice()
               .reverse()
               .map(({ id: reviewId, review, createdAt, User }) => (
                  <div className="review-content" key={reviewId}>
                     <h2>{User.firstName}</h2>
                     <h3>{formatDate(createdAt)}</h3>
                     <p>{review}</p>
                     <div className="user-review">
                        {sessionUser && sessionUser.id === User.id && (
                           <OpenModalButton
                              buttonText="Delete"
                              modalComponent={
                                 <DeleteFormModal
                                    id={reviewId}
                                    item={'Review'}
                                    spotId={spotId}
                                    onReviewDelete={refreshReviews}
                                 />
                              }
                           ></OpenModalButton>
                        )}
                     </div>
                  </div>
               ))
         )}
      </div>
   );
}
