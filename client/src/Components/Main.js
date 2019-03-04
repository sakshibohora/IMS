// import React from 'react';
// const Main = ({ title }) => (<main>{title}</main>);
// export default Main;
import logo from '../images/bacancy-technology2.png'
import React, { Component } from 'react';

class Main extends Component {
   
    render(){

    return (
        <>
        <input type="button" value="Login" className="btn btn-primary" onClick={()=>{this.props.history.push('/login')}}/>
        </>
    )
}
}

export default Main;