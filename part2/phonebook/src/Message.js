import React from 'react'

export default ({ message, background, foreground }) => (
  <div
    style={{
      padding: '5px',
      color: foreground,
      borderRadius: '3px',
      marginBottom: '12px',
      background: background,
      border: `1px solid ${foreground}`,
    }}
  >
    {message}
  </div>
)
