import './register.scss';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Register() {

    const [inputs, setInputs] = useState({
        username:'',
        email:'',
        password:'',
        name:''
    });

    const [err, setErr] = useState(false);

    const handleChange = (e) => { 
        // console.log(e.target.value);
        // na ovaj nacin sacuvat cemo vrijednosti ostali inputa u state i updejtovat samo onaj input u koji trenutno unosimo, preko njegovo name
        setInputs(state=>({...state, [e.target.name]: e.target.value}));
        // console.log(inputs);
     }

     const handleClick = async (e) => {
        e.preventDefault(); // kako se ne bi osvjezila stranica na klik koristimo e.preventDefault
        
        try {
            await axios.post("http://localhost:8080/server/auth/register", inputs);
        } catch(err) {
            setErr(err);
        }

        // console.log(err.response.data);
    
    }

  return (
    <div className='register'>
        <div className="card">
            <div className="left">
                <h1>Polo Social.</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet rem inventore iste dolore? 
                    Vitae, quaerat beatae!
                </p>
                <span>Don you have an account?</span>
                <Link to="/login"><button>Login</button></Link>
            </div>
            <div className="right">
                <h1>Register</h1>
                <form action="">
                    <input type="text" placeholder='Username' name='username' onChange={handleChange}/>
                    <input type="email" placeholder='Email' name='email' onChange={handleChange}/>
                    <input type="password" placeholder='Password' name='password' onChange={handleChange}/>
                    <input type="text" placeholder='Name' name='name' onChange={handleChange}/>
                    {/* ispisali smo response errora, koji smo ranije definisali */}
                    {err && err.response.data}
                    <button onClick={handleClick}>Register</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register