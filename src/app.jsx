import React from 'react';
import { render } from 'react-dom';

import MainNav from './components/main-nav.jsx';
import MainHeader from './components/main-header.jsx';
import Why from './components/why-section.jsx';

function main (props) {
  return(
    <div>
      <MainNav candidateName='Allen McIntosh II' />
      <div id='landing'>
        <MainHeader />
        <Why />
      </div>
    </div>
  )
}

render(React.createElement(main), document.getElementById('app'))
