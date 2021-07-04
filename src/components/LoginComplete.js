import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';


const cardStyle={
    marginTop:'50px', 
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    flexDirection: 'column',
    border:'1px solid',
    borderRadius:'5px',
    padding:'15px'
}

const LoginComplete = () => {
    const [loggedInUser, setLoggedInUser, token, setToken] = useContext(UserContext)

    const history = useHistory();


    const handleLogout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        setToken(null);
        setLoggedInUser('');
        history.push('/');
    }

    return (
        <div className='card'>
            <p style={{color:'green'}}>SIGN IN COMPLETE...</p>

            <div style={cardStyle}>
                <img src={loggedInUser.image} style={{ width: '100px', hieght: '100px', borderRadius: '50%' }} />
                <div>
                    <p><strong>Name:</strong> {loggedInUser.name} </p>
                    <p><strong>Email:</strong> {loggedInUser.email} </p>
                </div>
                <button onClick={handleLogout}>Logout</button>
            </div>

        </div>
    );
};

export default LoginComplete;