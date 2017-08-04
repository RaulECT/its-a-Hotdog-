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
      <div className="photo">
        <img src={this.state.imageUrl} />

        <span className="true">
          It´s a Hot dog ✅
        </span>
      </div>
    )
  }

  renderHeaderNotHotDog() {
    return(
      <div className="photo false">
        <img src={this.state.imageUrl} />

        <span className="true">
          It´s not a Hot dog ❌ !
        </span>
      </div>

    )
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <header>
          <h1>It´s or not a Hot Dog 🌭 !</h1>
        </header>

        <section>
          {this.state.isHotdog ? this.renderHeaderHotdog() : this.renderHeaderNotHotDog()}

          <div>
            <span className="label">
              <label htmlFor="input">Add your photo! 📷</label>
            </span>

            <input
              id="input"
              type="file"
              className="input-file"
              onChange={this.handleUpload}
              ref={node => this.inputElement = node} />
          </div>

          <footer>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Veritatis nesciunt vitae quisquam laborum eveniet non labore
            consequuntur totam architecto rem voluptatibus autem, quidem,
            illo dolorum magnam perspiciatis perferendis explicabo exercitationem!
          </footer>
        </section>
      </div>


    );
  }
}

export default App;
