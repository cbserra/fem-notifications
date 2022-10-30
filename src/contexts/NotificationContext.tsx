/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import {
  NotificationStatus,
  UserRecord,
  NotificationTypeRecord,
  NotificationRecord,
  Notification
} from '../types/Types'
import { buildNotifications } from '../utils/NotificationBuilder'
import userData from '../data/users.json'
import notificationData from '../data/notifications.json'
import notificationTypeData from '../data/notification-types.json'
import notificationStatus from '../data/notification-status.json'

export type NotificationContextData = {
  notifications: NotificationRecord[]
  setNotifications: (notifications: NotificationRecord[]) => void
  mappedNotifications: Notification[]
  setMappedNotifications: (notifications: Notification[]) => void
  notificationStatuses: NotificationStatus[]
  setNotificationStatuses: (notificationStatus: NotificationStatus[]) => void
  users: UserRecord[]
  setUsers: (users: UserRecord[]) => void
  notificationTypes: NotificationTypeRecord[]
  setNotificationTypes: (notificationTypes: NotificationTypeRecord[]) => void
  unreadCount: number
  setUnreadCount: (unreadCount: number) => void
}

const NotificationContext = createContext<NotificationContextData>({
  notifications: [],
  setNotifications: () => {},
  mappedNotifications: [],
  setMappedNotifications: () => {},
  notificationStatuses: [],
  setNotificationStatuses: () => {},
  users: [],
  setUsers: () => {},
  notificationTypes: [],
  setNotificationTypes: () => {},
  unreadCount: 0,
  setUnreadCount: () => {}
})

interface Props {
  children: React.ReactNode
}

export const NotificationProvider: React.FunctionComponent<Props> = (props: {
  children: React.ReactNode
}) => {
  const { children } = props

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

    console.debug(`🚀 ~ useEffect ~ unreadCount`, unreadCount)

    setUnreadCount(unreadCount)
  }, [notificationStatuses])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        mappedNotifications,
        setMappedNotifications,
        notificationStatuses,
        setNotificationStatuses,
        users,
        setUsers,
        notificationTypes,
        setNotificationTypes,
        unreadCount,

        setUnreadCount
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = () => useContext(NotificationContext)
export default NotificationContext
