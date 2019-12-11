import React from 'react'

const Audio = ({ src }) => {
  if (true) return null

  return (
    <audio autoPlay>
      <source src={src} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  )
}

export default Audio
