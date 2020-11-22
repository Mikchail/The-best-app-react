import React from 'react'
import md5 from 'js-md5'

export default ({user, width = ''}) => {
  const randomColor = Math.floor(Math.random() * 255 * 255 * 255).toString(16);
  return (
    <img
      src={`https://gravatar.com/avatar/${md5(user.name)}`}
      className="rounded-circle"
      alt={user.name}
      width={width}
    />
  )
}
