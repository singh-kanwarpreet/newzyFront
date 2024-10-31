import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message on new submit

    try {
      const response = await axios.post(import.meta.env.VITE_SERVER+'/signup', { email, password });

      if (response.data.success) {
        const userData = { email }; 
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
      } else {
        setErrorMessage(response.data.message); // Show error message if signup fails
      }
    } catch (error) {
      console.error('Signup failed', error);
      setErrorMessage('An error occurred during signup or Account has already been created');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>

              <p className="text-center mt-3">
                Already have an account? <Link to="/auth/login">Login</Link>

              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
