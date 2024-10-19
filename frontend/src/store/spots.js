import { csrfFetch } from './csrf';

const FETCH_SPOTS = 'spots/fetchSpots';
const ADD_SPOT = 'spots/addSpot';
const MODIFY_SPOT = 'spots/modifySpot';
const REMOVE_SPOT = 'spots/removeSpot';
const FETCH_ID = 'spots/fetchByID';
const FETCH_REVIEWS = 'spots/fetchReviews';

const fetchAllSpots = (spots) =>{
    return {
        type: FETCH_SPOTS,
        payload: spots,
    }
};

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        payload: spot,
    }
}

;

const modifySpot = (spot) => {
    return {
        type: MODIFY_SPOT,
        payload: spot,
    }
};

const removeSpot = (id) => {
    return {
        type: REMOVE_SPOT,
        payload: id,
    }
};

const fetchReview = (reviews) => {
    return {
        type: FETCH_REVIEWS,
        payload: reviews,
    }
};

const fetchByID = (spot) => {
    return {
        type: FETCH_ID,
        payload: spot,
    }
};

const handleImages = async (spotId, images) => {
   const imgArray = Object.entries(images);
   for (const [key, value] of imgArray) {
      if (value) {
         const imageOptions = {
            method: 'POST',
            body: JSON.stringify({ url: value, preview: key === 'prev' }),
         };
         await csrfFetch(`/api/spots/${spotId}/images`, imageOptions);
      }
   }
};

export const getAllSpots = () => async (dispatch) => {
   const res = await csrfFetch('/api/spots');
   console.log("fetching all spots")
   if (res.ok) {
      const data = await res.json();
      dispatch(fetchAllSpots(data.Spots));
      console.log("fetched spots:", data.Spots)
      return data.Spots;
   } else {
      const error = await res.json();
      return error;
   }
};

export const getCurrentSpots = () => async (dispatch) => {
   const res = await csrfFetch('/api/spots/current');
   if (res.ok) {
      const data = await res.json();
      dispatch(fetchAllSpots(data.Spots));
      return data.Spots;
   } else {
      const error = await res.json();
      return error;
   }
};

export const getSpotById = (id) => async (dispatch) => {
   const res = await csrfFetch(`/api/spots/${id}`);
   if (res.ok) {
      const data = await res.json();
      dispatch(fetchByID(data[0]));
      return data[0];
   } else {
      const error = await res.json();
      return error;
   }
};

export const getSpotReview = (spotId) => async (dispatch) => {
   const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
   if (res.ok) {
      const { Reviews } = await res.json();
      const getReview = Reviews.map((review) => ({
         ...review,
         ReviewImages: review.ReviewImages.reduce((acc, img, idx) => {
            acc[idx] = img;
            return acc;
         }, {}),
      }));
      dispatch(fetchReview({ id: spotId, Reviews: getReview }));
   } else {
      const error = await res.json();
      return error;
   }
};

export const newSpot = (spot, image) => async (dispatch) => {
   const res = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot),
   });

   if (res.ok) {
      const data = await res.json();
      await handleImages(data.id, image);
      dispatch(addSpot(data));
      return `/spots/${data.id}`;
   }

   return res;
};

export const editSpot = (spot, images, spotId) => async (dispatch) => {
   const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot),
   });

   if (res.ok) {
      const updatedSpot = await res.json();

      if (images) {
         await handleImages(updatedSpot.id, { prev: images });
      }

      dispatch(modifySpot(updatedSpot));

      return updatedSpot;
   } else {
      const error = await res.json();
      return error;
   }
};

export const deleteSpot = (spotId) => async (dispatch) => {
   const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE',
   });

   if (res.ok) {
      dispatch(removeSpot(spotId));
      return dispatch(getAllSpots());
   } else {
      const error = await res.json();
      return error;
   }
};

export const makeReview = (review, spotId) => async (dispatch) => {
   const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
   });

   if (res.ok) {
      const newReview = await res.json();
      await dispatch(getSpotById(spotId));
      await dispatch(getSpotReview(spotId));
      return newReview;
   } else {
      const error = await res.json();
      return error;
   }
};

export const deleteReview = (reviewId, spotId) => async (dispatch) => {
   const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
   });

   if (res.ok) {
      await dispatch(getSpotById(spotId));
      await dispatch(getSpotReview(spotId));
   } else {
      const error = await res.json();
      return error;
   }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_SPOTS: {
        console.log("reducer payload:", action.payload)
         const newState = {...state};
         action.payload.forEach((spot) => {
            newState[spot.id] = spot;
         });
         console.log("New state after FETCH_SPOTS:", newState);
         return newState;
      }
      case ADD_SPOT:
         return { ...state, [action.payload.id]: action.payload };

      case MODIFY_SPOT:
         return { ...state, [action.payload.id]: action.payload };

      case REMOVE_SPOT: {
         const newState = { ...state };
         delete newState[action.payload];
         return newState;
      }

      case FETCH_ID:
         return {
            ...state,
            [action.payload.id]: {
               ...state[action.payload.id],
               ...action.payload,
            },
         };


      case FETCH_REVIEWS:
         return {
            ...state,
            [action.payload.id]: {
               ...state[action.payload.id],
               Reviews: action.payload.Reviews,
            },
         };

      default:
         return state;
   }
};

export default spotsReducer;
