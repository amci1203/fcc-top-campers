import React from 'react';

const links = ['Why?'],
      linksJSX = () => {
        let JSXString = ``;
        links.each (link) => {
          return (<li><a href='# + {link}'></a></li>)
        }
      }


export default function MainNav (props) {
  return (
    <nav className='main-nav'>
      <div className='wrapper'>
        <h1 className='main-nav__heading'>{ props.candidateName }</h1>
        <button className='main-nav__toggle' />
        <div className='main-nav__nav-links'>
        <ul>
          {

          }
        </ul>
        </div>
      </div>
    </nav>
  )
}
