import { useCallback, useEffect, useState } from 'react'

import {
  NotificationRecord,
  NotificationTypeRecord,
  UserRecord,
  Notification,
  NotificationStatus
} from '../types/Types'
import { buildNotifications } from '../utils/NotificationBuilder'
import userData from '../data/users.json'
import notificationData from '../data/notifications.json'
import notificationTypeData from '../data/notification-types.json'
import notificationStatus from '../data/notification-status.json'
import NotificationContext from '../contexts/NotificationContext'

import Header from './Header'
import NotificationList from './NotificationList'

function App() {
  const [users, setUsers] = useState<UserRecord[]>(userData)
  const [notifications, setNotifications] = useState<NotificationRecord[]>(notificationData)
  const [notificationTypes, setNotificationTypes] =
    useState<NotificationTypeRecord[]>(notificationTypeData)
  const [notificationStatuses, setNotificationStatuses] = useState<NotificationStatus[]>([])
  const [unreadCount, setUnreadCount] = useState<number>(0)

  const [mappedNotifications, setMappedNotifications] = useState<Notification[]>(
    buildNotifications(notifications, users, notificationTypes)
  )

  const markAllRead = useCallback(() => {
    const readNotis = notificationStatuses.map((noti) => {
      return { ...noti, isUnread: false }
    })

    setNotificationStatuses(readNotis)
  }, [notificationStatuses])

  useEffect(() => {
    console.log(users)
    console.log(notificationData)
    console.log(notificationTypes)
    console.log(notificationStatuses)
    console.log(mappedNotifications)
  }, [])

  useEffect(() => {
    const unreadCount = notificationStatuses.filter((noti) => noti.isUnread).length

    setUnreadCount(unreadCount)
  }, [mappedNotifications])

  return (
    // <main className="grid min-h-screen place-content-center bg-gradient-to-b from-blue-700 to-blue-800" />
    <>
      {/* <main className="grid min-h-screen place-content-center bg-gradient-to-b from-blue-700 to-blue-800" /> */}
      <Header markAllRead={markAllRead} setUnreadCount={setUnreadCount} unreadCount={unreadCount} />
      <NotificationList
        notificationStatus={notificationStatuses}
        notifications={mappedNotifications}
      />
    </>
  )
}

export default App
