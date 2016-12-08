import React from 'react';

import Links from './reusables/nav-links.jsx';

export default function MainNav (props) {
  return (
    <nav className='main-nav'>
      <div className='wrapper'>
        <h1 className='main-nav__heading'><a href='http://allen-mcintoshii.com'>{ props.candidateName }</a></h1>
        <button className='main-nav__toggle' ><span className='main-nav__toggle__middle' /></button>
        <div className='main-nav__nav-links'>
          <Links links={['about', 'skills', 'contacts']}/>
        </div>
      </div>
    </nav>
  )
}
