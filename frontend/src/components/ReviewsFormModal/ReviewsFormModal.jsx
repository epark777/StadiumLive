import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { makeReview } from '../../store/spots';
import './ReviewsFormModal.css';

export default function ReviewFormModal({ spotId, onReviewPost }) {
   const dispatch = useDispatch();
   const [review, setReview] = useState('');
   const [rating, setRating] = useState(0);
   const [hoverRating, setHoverRating] = useState(0);
   const [disabled, setDisabled] = useState(true);
   const [errors, setErrors] = useState({});
   const { closeModal } = useModal();

   useEffect(() => {
      if (review.length >= 10 && rating >= 1) {
         setDisabled(false);
      } else {
         setDisabled(true);
      }
   }, [review, rating]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      setErrors({});

      let newReview = { review: review, stars: rating };

      return dispatch(makeReview(newReview, spotId))
         .then(async () => {
            await onReviewPost();
            closeModal()
         })
         .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
               setErrors(data.errors);
            } else {
               console.error(res);
               setErrors({
                  message:
                     'But that should not happen under normal circumstances',
               });
            }
         });
   };

   const handleStarClick = (i) => setRating(i);
   const handleStarHover = (i) => setHoverRating(i);
   const handleStarLeave = () => setHoverRating(rating);

   const star = (i) =>
      i <= (hoverRating || rating) ? { color: 'gold' } : { color: 'grey' };


   return (
      <div className="review-modal">
         <h1>How was your stay?</h1>

         <form onSubmit={handleSubmit}>
            <textarea
               className="write-review"
               placeholder="Write your review here..."
               value={review}
               onChange={(e) => setReview(e.target.value)}
            ></textarea>
            {errors.message && <p className="errors">{errors.message}</p>}
            <div className="star-rating">
               {[1, 2, 3, 4, 5].map((i) => (
                  <span
                     key={i}
                     style={star(i)}
                     className="stars"
                     onMouseEnter={() => handleStarHover(i)}
                     onMouseLeave={handleStarLeave}
                     onClick={() => handleStarClick(i)}
                  >
                    ☆ 
                  </span>
               ))}
               <span className="star-label"> Stars</span>
            </div>
            <button className="review-submit" type="submit" disabled={disabled}>
               Submit Review
            </button>
         </form>
      </div>
   );
}
