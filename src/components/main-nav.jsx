import React from 'react';

import Links from './reusables/nav-links.jsx';

export default class MainNav extends React.Component {
  constructor () {
    super();
    this.state = {
      isOpen: "close",
    };
    this.addClickListenerToPageLock();
  }

  addClickListenerToPageLock() {
    let _ = this;
    document.documentElement.onClick = (event) => {
      if (document.documentElement.classList.contains('page-lock')) _.toggleNav();
    }
  }

  toggleNav() {
    let css = "";
    if (this.state.isOpen === "close") css = "open";
    else css = "close";
    this.setState({ isOpen : css });
    document.documentElement.classList.toggle('page-lock')
  }

  render (props) {
    return (
      <nav className='main-nav visible'>
        <div className={'wrapper ' + this.state.isOpen}>
          <h1 className='main-nav__heading'><a href='http://allen-mcintoshii.com'>{ this.props.candidateName }</a></h1>
          <button className='main-nav__toggle' onClick={ this.toggleNav.bind(this) } >
            <span className='main-nav__toggle__middle' />
          </button>
          <div className='main-nav__nav-links '>
            <Links links={['about', 'skills', 'contacts']}/>
          </div>
        </div>
      </nav>
    )
  }
}
