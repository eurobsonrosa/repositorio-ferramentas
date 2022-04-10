import React, { Component } from 'react'
import Forms from '../components/forms';
import Repositorio from '../components/repositorio';


class App extends Component {
  state = { showPopup: false };
  
  openPopupHandler = () => {
    const button = document.getElementById('btn-add-Tool')
    if (button) button.style.display ='none'
    this.setState({ showPopup: true });
  }

  closePopupHandler = () => {
    const button = document.getElementById('btn-add-Tool')
    if (button) button.style.display ='block'
    return this.setState({ showPopup: false });
  }

  render() {
    const rep = <Repositorio/>
    const forms = (<div>
      <div><button id='btn-close-Tool'onClick={this.closePopupHandler}>Close</button></div>
      <Forms /></div>)
    let popup = this.state.showPopup ? forms : rep;

    return (
      <div className="mainApp">
        <button id='btn-add-Tool' onClick={this.openPopupHandler}>Add Tool</button>
        {popup}
      </div>
    );
  }
}

export default App

