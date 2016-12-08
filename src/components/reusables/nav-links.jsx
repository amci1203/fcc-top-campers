import React from 'react'

export default function Links (props) {
  const links = props.links.map((item, index) => {
    return <li className='link' key={index}><a href={'#' + item}>{item}</a></li>
  })
  return (<ul>{links}</ul>)
}
