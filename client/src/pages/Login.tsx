import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation
import Auth from '../utils/auth';  // Import the Auth utility for managing authentication state
import { login } from "../api/authAPI";  // Import the login function from the API
import { UserLogin } from "../interfaces/UserLogin";  // Import the interface for UserLogin

const Login = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook
  // State to manage the login form data
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: ''
  });

  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API endpoint with loginData
      const data = await login(loginData);
      // If login is successful, call Auth.login to store the token in localStorage
      Auth.login(data.token);
      navigate('/home');  // Adjust the path according to your home route
    } catch (err) {
      console.error('Failed to login', err);  // Log any errors that occur during login
    }
  };

    // Function to navigate to the sign-up page
    const handleSignUp = () => {
      navigate('/signup');  // Redirect to the sign-up page
    };
  

  return (
    <div className='form-container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* Username input field */}
        <div className="form-group">
          <label>Username</label>
          <input 
            className="form-input"
            type='text'
            name='username'
            value={loginData.username || ''}
            onChange={handleChange}
          />
        </div>
        {/* Password input field */}
        <div className="form-group">
          <label>Password</label>
          <input 
            className="form-input"
            type='password'
            name='password'
            value={loginData.password || ''}
            onChange={handleChange}
          />
        </div>
        {/* Submit button for the login form */}
        <div className="form-group">
          <button className="btn btn-primary" type='submit'>Login</button>
        </div>
        <div className="form-group">
        <button className="btn btn-secondary" onClick={handleSignUp}>Sign Up</button>
      </div>
      </form>
    </div>
  )
};

export default Login;
