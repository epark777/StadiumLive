import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
   const dispatch = useDispatch();
   const [email, setEmail] = useState('');
   const [username, setUsername] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [errors, setErrors] = useState({});
   const { closeModal } = useModal();
   const [disabled, setDisabled] = useState(true);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
         setErrors({});
         return dispatch(
            sessionActions.signup({
               email,
               username,
               firstName,
               lastName,
               password,
            }),
         )
            .then(() => {
              resetErrors();
              closeModal();
            }) 
            .catch(async (res) => {
               const data = await res.json();
               if (data?.errors) {
                  setErrors(data.errors);
               }
            });
      }
      return setErrors({
         confirmPassword:
            'Confirm Password field must be the same as the Password field',
      });
   };

   useEffect(() => {
      if (
         email.length &&
         username.length >= 4 &&
         firstName.length &&
         lastName.length &&
         password.length >= 6 &&
         confirmPassword.length >= 6
      ) {
         setDisabled(false);
      } else {
         setDisabled(true);
      }
   }, [email, username, firstName, lastName, password, confirmPassword]);

   const resetErrors = () => {
      setErrors({});
      setEmail('');
      setUsername('');
      setFirstName('');
      setLastName('');
      setPassword('');
      setConfirmPassword('');
   };

   return (
      <div className="signup-page">
         <h1 className="signup-header">Sign Up</h1>
         <form onSubmit={handleSubmit} className="signup-form">
            <label className="signup-label">
               <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </label>
            {errors.email && <p>{errors.email}</p>}
            <label className="signup-label">
               <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
               />
            </label>
            {errors.username && <p>{errors.username}</p>}
            <label className="signup-label">
               <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
               />
            </label>
            {errors.firstName && <p>{errors.firstName}</p>}
            <label className="signup-label">
               <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
               />
            </label>
            {errors.lastName && <p>{errors.lastName}</p>}
            <label className="signup-label">
               <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </label>
            {errors.password && <p>{errors.password}</p>}
            <label className="signup-label">
               <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
               />
            </label>
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <button type="submit" disabled={disabled}>
               Sign Up
            </button>
         </form>
      </div>
   );
}

export default SignupFormModal;
