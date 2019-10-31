import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render(){
    return (
      <header className="Header">
        <Link to="/">
          <h1 className="Branding">
            <img src={logo} alt="Social network logo" className="Logo" />
            Social Network
          </h1>
        </Link>
      </header>
    );
  }
}
