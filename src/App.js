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
    firebase.database().ref('/uploads/').on('value', snapshot => {
      this.setState({ isHotdog: snapshot.val().photo.isHotdog })
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

  renderHeaderHotdog() {
    return(
      <header>
        Its hot dog 🌭!
      </header>
    )
  }

  renderHeaderNotHotDog() {
    return(
      <header>
        Not Hotdog! ❌
      </header>
    )
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        {this.state.isHotdog ? this.renderHeaderHotdog() : this.renderHeaderNotHotDog()}

        <label htmlFor="inputElement">📷</label>
        <input
          id="inputElement"
          type="file"
          onChange={this.handleUpload}
          ref={node => this.inputElement = node}
        />

        <figure>
          <img src={this.state.imageUrl} />
        </figure>
      </div>
    );
  }
}

export default App;
