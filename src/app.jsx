import React from 'react';
import { render } from 'react-dom';

import MainHeader from './components/main-header.jsx';
import MainNav from './components/main-nav.jsx';

function main (props) {
  return(
    <div>
      <MainNav candidateName='Allen McIntosh' />
      <MainHeader />
    </div>
  )
}

render(React.createElement(main), document.getElementById('app'))
