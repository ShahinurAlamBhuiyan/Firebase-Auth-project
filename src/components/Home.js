import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    return (
        <div className='card'>
            <h1>Click and check your info</h1>
            <p style={{color:'red', fontSize:'14px'}}>You have to login first</p>
            <button onClick={() => history.push('/loginDone')}>Click me</button>
        </div>
    );
};

export default Home;