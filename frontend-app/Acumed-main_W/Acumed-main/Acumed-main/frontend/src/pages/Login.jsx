import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from '../assets/assets';

function Login() {
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(AppContext);

  const [state, setState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://vitalsync-backend-dwat.onrender.com';
  const url = `${API_BASE_URL}/api/auth`;

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
        setError('Account created successfully! Please log in.');
        setState('Login');
      } else {
        const { token, ...userData } = response.data;
        setToken(token);
        localStorage.setItem("token", token);
        setUser(userData); 
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      }

    } catch (err) {
      console.error("Auth error:", err);
      let errorMsg = 'Invalid email or password. Please try again.';
      if (err.response && err.response.data) {
        if (typeof err.response.data === 'string') {
          errorMsg = err.response.data;
        } else if (err.response.data.message) {
          errorMsg = err.response.data.message;
        } else if (err.response.data.error) {
          errorMsg = err.response.data.error;
        }
      } else if (err.request) {
        errorMsg = 'Server is waking up... Please wait 5 seconds and click Sign In again.';
      }
      setError(errorMsg);
    }
    setLoading(false);
  };

  return (
    <div className='min-h-[85vh] flex items-center justify-center py-12 px-4'>
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-2xl shadow-blue-500/10 flex flex-col gap-6">
        
        {/* Header Logo */}
        <div className="flex flex-col items-center gap-2 text-center">
          <img 
            onClick={() => navigate('/')} 
            src={assets.logo} 
            alt="VitalSync Logo" 
            className="h-10 cursor-pointer mb-2"
          />
          <h1 className='text-2xl font-extrabold text-slate-900 tracking-tight'>
            {state === 'Sign up' ? 'Create Your VitalSync Account' : 'Welcome Back to VitalSync'}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            {state === 'Sign up' ? "Join VitalSync to book instant appointments with doctors." : "Sign in to access your consultations and health record."}
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
          {state === 'Sign up' && (
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold uppercase tracking-wider text-slate-600'>Full Name</label>
              <input 
                className='w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none'
                type='text'
                placeholder='e.g. Sarah Jenkins'
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-bold uppercase tracking-wider text-slate-600'>Email Address</label>
            <input 
              className='w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none' 
              type='email' 
              placeholder='you@example.com'
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              required
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-bold uppercase tracking-wider text-slate-600'>Password</label>
            <input 
              className='w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none' 
              type='password' 
              placeholder='••••••••'
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              required
            />
          </div>

          {error && (
            <div className={`p-3 rounded-xl text-xs font-semibold text-center ${error.includes('created') ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
              {error}
            </div>
          )}

          <button 
            type='submit' 
            className={`w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3.5 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 mt-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : (state === 'Sign up' ? "Create Account" : "Sign In")}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="text-center text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
          {state === "Sign up" ? (
            <p>
              Already have an account?{" "}
              <button 
                type="button"
                onClick={() => { setState('Login'); setError(''); }} 
                className='text-blue-600 hover:underline font-bold ml-1'
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button 
                type="button"
                onClick={() => { setState('Sign up'); setError(''); }} 
                className='text-blue-600 hover:underline font-bold ml-1'
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
