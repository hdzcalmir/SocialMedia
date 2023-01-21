import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import { useState } from 'react';

function Login() {

    // imporatli smo login funkciju iz auth contexta gdje smo u biti kreirali jedan layer zastite pri loginu
    const {login} = useContext(AuthContext);

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    })

    const [err, setErr] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => { 
        e.preventDefault();
        setInputs(state=>({...state, [e.target.name]: e.target.value}));
     }

    const handleLogin = async (e) => { 

        e.preventDefault();

        try {
          await login(inputs);
          // nakon uspjesnog logina redirecta nas na homepage
          navigate('/');

        }catch(err) {
            setErr(err);
        }
     }

  return (
    <div className='login'>
        <div className="card">
            <div className="left">
                <h1>Hello World.</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet rem inventore iste dolore? 
                    Vitae, quaerat beatae!
                </p>
                <span>Don't have an account?</span>
                <Link to="/register"><button>Register</button></Link>
            </div>
            <div className="right">
                <h1>Login</h1>
                <form action="">
                    <input type="text" placeholder='Username' name='username' onChange={handleChange}/>
                    <input type="password" placeholder='Password' name='password' onChange={handleChange}/>
                    {err && err.response.data}
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login