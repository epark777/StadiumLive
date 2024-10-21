import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSpot, getSpotById } from '../../store/spots';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateSpot.css';

export default function UpdateSpot() {
   const dispatch = useDispatch();
   const nav = useNavigate();
   const { id } = useParams();
   const spot = useSelector((state) => state.spots[id]);

   const [country, setCountry] = useState('');
   const [address, setAddress] = useState('');
   const [city, setCity] = useState('');
   const [state, setState] = useState('');
   const [price, setPrice] = useState('');
   const [description, setDescription] = useState('');
   const [name, setName] = useState('');
   const [images, setImages] = useState([]);
   const [errors, setErrors] = useState({});

   useEffect(() => {
      if (spot) {
         setCountry(spot.country);
         setAddress(spot.address);
         setCity(spot.city);
         setState(spot.state);
         setDescription(spot.description);
         setPrice(spot.price);
         setName(spot.name);
         if (spot.SpotImages && spot.SpotImages.length > 0){
            setImages(spot.SpotImages);
         } else {
            setImages([])
         }

      } else {
         dispatch(getSpotById(id));
      }
   }, [dispatch, id, spot]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      setErrors({});
      let err = {};
      if (!country) {
        err.country = 'Country is required';
     }
     if (!address) {
        err.address = 'Street Address is required';
     }
     if (!city) {
        err.city = 'City is required';
     }
     if (!state) {
        err.state = 'State is required';
     }
     if (!name) {
        err.name = 'Title is required';
     }
     if (name.length > 50) {
        err.name = 'Name must be less than 50 characters';
     }
     if (!price) {
        err.price = 'Price is required';
     }
     if (price < 0) {
        err.price = 'Price must be greater than $0';
     }
     if (description.length < 30) {
        err.description = 'Description needs 30 or more characters';
     }
     if (description.length > 255) {
        err.description = 'Description can not exceed 255 characters';
     }
     if (!images[0]) err.previewImage = 'Preview Image is required';

     const isValidImage = (url) => {
        return (
           url.endsWith('.png') ||
           url.endsWith('.jpg') ||
           url.endsWith('.jpeg')
        );
     };

     const hasInvalidImage =
        images.length > 1 && !images.every(({ url }) => isValidImage(url));

     if (hasInvalidImage) {
        err.image = 'Image URL must end in .png, .jpg, or .jpeg';
     }

     setAddress(err);

      if (Object.keys(err).length > 0) {
         return;
      }

      const spotsDetails = {
         country,
         address,
         city,
         state,
         name,
         price,
         description,
      };
      try {
         const updatedSpot = await dispatch(editSpot(spotsDetails, images[0], id));
         if(updatedSpot) {
            nav(`/spots/${updatedSpot.id}`)
         }
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <div className="create-spot">
         <div className="create-spot-container">
            <div className="create-header">
               <h1>Update Your Spot</h1>
               <h2>Where is your Stadium located?</h2>
               <p>
                  Guests will only get your exact address once they booked a
                  reservation
               </p>
            </div>
            <form className="create-spot-form" onSubmit={handleSubmit}>
               <div className="create-spot-field">
                  <label className="spot-label">Country</label>
                  <input
                     type="text"
                     placeholder="Country"
                     value={country}
                     onChange={(e) => setCountry(e.target.value)}
                  ></input>
                  {errors.country && (
                     <p className="create-spot-error">{errors.country}</p>
                  )}
               </div>
               <div className="create-spot-field">
                  <label className="spot-label">Street Address</label>
                  <input
                     type="text"
                     placeholder="Street Address"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                  ></input>
                  {errors.address && (
                     <p className="create-spot-error">{errors.address}</p>
                  )}
               </div>
               <div className="two-create-spot">
                  <div className="create-spot-field">
                     <label className="spot-label">City</label>
                     <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                     ></input>
                     {errors.city && (
                        <p className="create-spot-error">{errors.city}</p>
                     )}
                  </div>
                  <div className="create-spot-field">
                     <label className="spot-label">State</label>
                     <input
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                     ></input>
                     {errors.state && (
                        <p className="create-spot-error">{errors.state}</p>
                     )}
                  </div>
               </div>
               <hr className="line" />
               <h2>Describe your stadium to your fans</h2>
               <p>
                  Mention the best seats, concession stand, and other amenities
                  that make your stadium the best place to WIN like your
                  favorite team!
               </p>
               <textarea
                  className="create-spot-desc"
                  placeholder="Please write at least 30 characters"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
               ></textarea>
               {errors.description && (
                  <p className="create-spot-error">{errors.description}</p>
               )}
               <hr className="line" />
               <h2>Create a Headline for your Stadium</h2>
               <p>
                  Get the fans to come to your stadium where their favorite
                  teams play, so they feel like they are part of the team!
               </p>
               <input
                  className="create-spot-input"
                  type="text"
                  placeholder="Name of your stadium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               ></input>
               {errors.name && (
                  <p className="create-spot-error">{errors.name}</p>
               )}
               <hr className="line" />
               <h2>Set a base price for your stadium</h2>
               <p>
                  Competitive pricing can help your listing stand out and rank
                  higher in search results.
               </p>
               <input
                  className="create-spot-input"
                  type="number"
                  placeholder="Price per night (USD)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
               ></input>
               {errors.name && (
                  <p className="create-spot-error">{errors.price}</p>
               )}
               <hr className="line" />
               <h2>Get fans excited for your stadium with photos</h2>
               <p>
                  Submit a link to at least one photo to publish your stadium
               </p>
               <input
                  className="create-spot-input"
                  type="text"
                  placeholder="Preview Image URL"
                  onChange={(e) =>
                     setImages([
                        ...images,
                        { url: e.target.value, preview: true },
                        ...images.slice(1),
                     ])
                  }
               ></input>
               {errors.previewImage && (
                  <p className="create-spot-error">{errors.previewImage}</p>
               )}
               <input
                  className="create-spot-input"
                  type="text"
                  placeholder="Image URL"
                  onChange={(e) =>
                     setImages([
                        ...images,
                        { url: e.target.value, preview: true },
                     ])
                  }
               ></input>
               {errors.image && (
                  <p className="create-spot-error">{errors.image}</p>
               )}
               <input
                  className="create-spot-input"
                  type="text"
                  placeholder="Image URL"
                  onChange={(e) =>
                     setImages([
                        ...images,
                        { url: e.target.value, preview: true },
                     ])
                  }
               ></input>
               {errors.image && (
                  <p className="create-spot-error">{errors.image}</p>
               )}
               <input
                  className="create-spot-input"
                  type="text"
                  placeholder="Image URL"
                  onChange={(e) =>
                     setImages([
                        ...images,
                        { url: e.target.value, preview: true },
                     ])
                  }
               ></input>
               {errors.image && (
                  <p className="create-spot-error">{errors.image}</p>
               )}
               <input
                  className="create-spot-input"
                  type="text"
                  placeholder="Image URL"
                  onChange={(e) =>
                     setImages([
                        ...images,
                        { url: e.target.value, preview: true },
                     ])
                  }
               ></input>
               {errors.image && (
                  <p className="create-spot-error">{errors.image}</p>
               )}
               <hr className="line" />
               <div className="create-spot-button">
                  <button type="submit">Update Spot</button>
               </div>
            </form>
         </div>
      </div>
   );
}
