import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx'; // Make sure this path is correct

function Login() {
  const navigate = useNavigate();
  // We need both setToken and setUser from context
  const { setToken, setUser } = useContext(AppContext);

  const [state, setState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // --- THIS IS YOUR NEW BACKEND URL ---
  const url = "http://localhost:8081/api/auth";

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    let data = { email, password };
    let endpoint = state === 'Login' ? '/login' : '/signup';

    if (state === 'Sign up') {
      data.name = name;
    }

    try {
      const response = await axios.post(url + endpoint, data);

      if (endpoint === '/signup') {
        // --- SIGN UP SUCCESS ---
        setError('Account created! Please log in.');
        setState('Login');
      } else {
        // --- LOGIN SUCCESS ---
        // 1. Get token and user data from response
        const { token, ...userData } = response.data;

        // 2. Set token in context and localStorage
        setToken(token);
        localStorage.setItem("token", token);
        
        // 3. Set user object in context and localStorage
        // This is the step that was failing before
        setUser(userData); 
        localStorage.setItem("user", JSON.stringify(userData));

        // 4. Go to homepage
        navigate("/");
      }

    } catch (err) {
      // --- ERROR HANDLING ---
      let errorMsg = 'An error occurred. Please try again.';
      if (err.response && err.response.data) {
        // Get error from backend (e.g., "Email is already in use!")
        errorMsg = typeof err.response.data === 'string' ? err.response.data : err.response.data.message;
      }
      setError(errorMsg);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[-340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg bg-white'>
        
        <p className='text-2xl font-semibold text-gray-800'>
          {state}
        </p>

        <p>
          {state === 'Sign up' ? "Create an account to get started." : "Please log in to book an appointment."}
        </p>

        {state === 'Sign up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input 
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              type='text'
              onChange={(e)=> setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input 
            className='border border-zinc-300 rounded w-full p-2 mt-1' 
            type='email' 
            onChange={(e)=> setEmail(e.target.value)} 
            value={email}
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input 
            className='border border-zinc-300 rounded w-full p-2 mt-1' 
            type='password' 
            onChange={(e)=> setPassword(e.target.value)} 
            value={password}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm w-full text-center">{error}</p>}

        <button 
          type='submit' 
          className={`bg-blue-600 text-white w-full py-2 rounded-md text-base mt-2 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? 'Processing...' : (state === 'Sign up' ? "Create Account" : "Login")}
        </button>

        {state === "Sign up" ? (
          <p>
            Already have an account?{" "}
            <span 
              onClick={() => { setState('Login'); setError(''); }} 
              className='text-blue-500 underline cursor-pointer'
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span 
              onClick={() => { setState('Sign up'); setError(''); }} 
              className='text-blue-500 underline cursor-pointer'
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login
