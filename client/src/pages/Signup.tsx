import { useState, FormEvent, ChangeEvent } from "react";
// import Auth from '../utils/auth';
import { signup } from "../api/authAPI";
import { UserLogin } from "../interfaces/UserLogin";

const Signup = () => {
  // State to manage the sign-up form data
  const [signUpData, setSignUpData] = useState<UserLogin>({
    username: '',
    password: '',
  });

  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value
    });
  };

  // Handle form submission for sign-up
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the sign-up API endpoint with signUpData
      const data = await signup(signUpData);
   
      alert(data.newUser.username+' Registered');
      window.location.assign('/');
    } catch (err) {
      console.error('Failed to sign up', err);  // Log any errors that occur during sign-up
    }
  };

  return (
    <div className='form-container'>
      <form className='form sign-up-form' onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {/* Username input field */}
        <div className="form-group">
          <label>Username</label>
          <input 
            className="form-input"
            type='text'
            name='username'
            value={signUpData.username || ''}
            onChange={handleChange}
            required
          />
        </div>
        {/* Password input field */}
        <div className="form-group">
          <label>Password</label>
          <input 
            className="form-input"
            type='password'
            name='password'
            value={signUpData.password || ''}
            onChange={handleChange}
            required
          />
        </div>
        {/* Submit button for the sign-up form */}
        <div className="form-group">
          <button className="btn btn-primary" type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
