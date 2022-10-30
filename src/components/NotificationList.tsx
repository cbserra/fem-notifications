import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Notification, NotificationStatus } from 'types/Types'

import NotificationCard from './NotificationCard'

function NotificationList(props: {
  notifications: Notification[]
  notificationStatus: NotificationStatus[]
}) {
  const { notifications, notificationStatus: notificationStatuses } = props

  useEffect(() => {
    console.log(notifications)
  }, [])

  return (
    <div>
      NotificationList
      {props.notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notiStatus={notificationStatuses.find((status) => (status.notiId = notification.id))}
          notification={notification}
        />
      ))}
    </div>
  )
}

NotificationList.propTypes = {}

export default NotificationList
