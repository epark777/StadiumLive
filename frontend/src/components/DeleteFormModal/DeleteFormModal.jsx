import { useDispatch } from 'react-redux';
import { deleteReview, deleteSpot, getSpotById, getSpotReview } from '../../store/spots';
import { useModal } from '../../context/Modal';
import './DeleteFormModal.css'

export default function DeleteFormModal({ id, item, spotId }) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();

   const deleteItem = async (e) => {
      e.preventDefault();
      if (item === 'Review') {
         const deleteR = await dispatch(deleteReview(id, spotId));
         console.log("delete review res:", deleteR)
         if (deleteR) {
            await dispatch(getSpotReview(spotId))
            closeModal();
         }
      } 

      if (item === 'Spot') {
         const deleteS = await dispatch(deleteSpot(id));
         if (deleteS) {
            await dispatch(getSpotById(id))
            closeModal();
         }
      }
   };

   return (
      <div className="delete-modal">
         <h1>Confirm Delete</h1>
         <p>Are you sure you want to remove this {item} from the listings?</p>
         <div className="decision-delete">
            <button className="delete-button-yes" onClick={deleteItem}>
               Yes (Delete {item})
            </button>
            <button className="delete-button-no" onClick={closeModal}>
               No (Keep {item})
            </button>
         </div>
      </div>
   );
}
