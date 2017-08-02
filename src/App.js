import React, { Component } from 'react';
import firebase from 'firebase'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    imageUrl: null,
    isHotdog: false
  }

  componentWillMount() {
    firebase.database().ref('/uploads').on('value', snapshot => {
      this.setState( {isHotdog: snapshot.val().photo.isHotdog} )
    })
  }

  handleUpload = ( event ) => {
    const file = event.target.files[0]

    return firebase.database().ref('/uploads/photo').set({
      isHotdog: false
    })
    .then( data => {
      return firebase.storage().ref(`/uploads/${file.name}`).put(file)
      .then( snapshot => {
        this.setState( {imageUrl: snapshot.metadata.downloadURLs[0]} )
      } )
    } )
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
