import React, { useContext } from 'react';
import firebase from 'firebase';
import firebaseConfig from '../../secret/firebase.config'; // git ignore this file...please use a firebase git ignore file
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const history = useHistory();
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }


    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const signedInUser = { name: displayName, email, image: photoURL };
                setLoggedInUser(signedInUser);
                sessionStorage.setItem('user', JSON.stringify(signedInUser));
                storeAuthToken();
            }).catch((error) => {
                console.log(error)
            });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
            sessionStorage.setItem('token', idToken);
            history.replace(from);
        }).catch(function (error) {
            console.log(error)
        });
    }

    return (
        <div className='card'>
            <h1>Please sign in to go navigate the page</h1>
            <button onClick={handleGoogleSignIn}>Google SignIn</button>
        </div>
    );
};

export default Login;