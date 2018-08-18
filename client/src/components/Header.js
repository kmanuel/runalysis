import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            Home
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="#">
                Some
              </a>
            </li>
            <li>
              <a href="#">
                Other
              </a>
            </li>
            <li>
              <a href="#">
                Stuff
              </a>
            </li>
          </ul>
        </div>

      </nav>
    );
  }
}

export default Header;
