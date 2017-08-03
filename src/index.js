import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase'

firebase.initializeApp( {
    apiKey: "AIzaSyC1fSopbqi5h2991p-ES1DTkvEjtpN4xgw",
    authDomain: "hotdog-b79ca.firebaseapp.com",
    databaseURL: "https://hotdog-b79ca.firebaseio.com",
    projectId: "hotdog-b79ca",
    storageBucket: "hotdog-b79ca.appspot.com",
    messagingSenderId: "301207206906"
} )

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
