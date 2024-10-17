import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
     const dispatch = useDispatch();
     const [credential, setCredential] = useState('');
     const [password, setPassword] = useState('');
     const [errors, setErrors] = useState({});
     const { closeModal } = useModal();

     const handleSubmit = (e) => {
          e.preventDefault();
          setErrors({});
          return dispatch(sessionActions.login({ credential, password }))
               .then(closeModal)
               .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                         setErrors(data.errors);
                    }
               });
     };

     const disable = (credential, password) => {
          if (credential.length < 4 || password.length < 6) {
               return true;
          } else {
               return false;
          }
     };

     return (
          <div className="login-page">
               <h1>Log In</h1>
               <form onSubmit={handleSubmit}>
                    <label>
                         <input
                              type="text"
                              placeholder='Username or Email'
                              value={credential}
                              onChange={(e) => setCredential(e.target.value)}
                              required
                         />
                    </label>
                    <label>
                         <input
                              type="password"
                              placeholder='password'
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                         />
                    </label>
                    {errors.credential && <p>{errors.credential}</p>}
                    <button
                         type="submit"
                         disabled={disable(credential, password)}
                    >
                         Log In
                    </button>
                    <button 
                    type='submit'
                    onClick={() => {
                      setCredential('demo@user.io')
                      setPassword('password')
                    }}>Login to Demo</button>
               </form>
          </div>
     );
}

export default LoginFormModal;
