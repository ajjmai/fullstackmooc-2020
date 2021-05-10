import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state)

  return (
    notification.content && (
      <div className={notification.className}>{notification.content}</div>
    )
  )
}

export default Notification
