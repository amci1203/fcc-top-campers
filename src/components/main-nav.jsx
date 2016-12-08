import React from 'react';

import Links from './nav-links.jsx';

export default function MainNav (props) {
  return (
    <nav className='main-nav'>
      <div className='wrapper'>
        <h1 className='main-nav__heading'>{ props.candidateName }</h1>
        <button className='main-nav__toggle' />
        <div className='main-nav__nav-links'>
          <Links links={['about', 'skills', 'contacts']}/>
        </div>
      </div>
    </nav>
  )
}
