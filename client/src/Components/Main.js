// import logo from '../images/bacancy-technology2.png'
import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
      <>
        <div className="container col-4" ></div>
        <div className="container col-4">
          <input type="button" value="Login" className="btn btn-primary" onClick={() => { this.props.history.push('/') }} />
        </div>
        <div className="container col-4"></div>
      </>
    )
  }
}

export default Main;