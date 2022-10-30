import {
  NotificationTypeEnum,
  UserRecord,
  NotificationRecord,
  Notification,
  NotificationTypeRecord,
  PhotoCommentNotification,
  PhotoBody,
  PostReactionNotification,
  LinkBody,
  JoinGroupNotification,
  PrivateMessageNotification,
  MessageBody,
  FollowedNotification
} from '../types/Types'

export function buildNotifications(
  notis: NotificationRecord[],
  users: UserRecord[],
  notificationTypes: NotificationTypeRecord[]
): Notification[] {
  console.log(
    `🚀 ~ notis: NotificationRecord[],
  users: UserRecord[],
  notificationTypes: NotificationTypeRecord[]`,
    notis,
    users,
    notificationTypes
  )
  const notifications: Notification[] = []

  notis.forEach((noti) => {
    const user = users.find((user) => {
      return user.id === noti.userId
    })

    if (!user) {
      console.error('User not found')

      return
    }

    const type = notificationTypes.find((type) => {
      // console.log(
      //   `🚀 ~ notis.forEach ~ type`,
      //   type
      // NotificationTypeEnum[type.typeEnum as keyof typeof NotificationTypeEnum]
      // NotificationTypeEnum[type.typeEnum as typeof NotificationTypeEnum]
      // )

      return type.id === noti.typeId
    })

    // const typeEnum: NotificationTypeEnum = type?.typeEnum as NotificationTypeEnum

    // console.log(`🚀 ~ notis.forEach ~ typeEnum`, typeEnum)

    // console.log(`🚀 ~ notis.forEach ~ typeof typeEnum`, typeof typeEnum)

    if (!type) {
      console.error('Notification type not found')

      return
    }

    switch (type.typeEnum) {
      // case NotificationTypeEnum.COMMENTED_PICTURE:
      case 'COMMENTED_PICTURE':
        notifications.push(
          new PhotoCommentNotification(noti.id, user, type, noti.when, noti.body as PhotoBody)
        )
        break
      case 'REACTED_POST':
        notifications.push(
          new PostReactionNotification(noti.id, user, type, noti.when, noti.body as LinkBody)
        )
        break
      case 'JOIN_GROUP':
        notifications.push(
          new JoinGroupNotification(noti.id, user, type, noti.when, noti.body as LinkBody)
        )
        break
      case 'LEAVE_GROUP':
        notifications.push(
          new JoinGroupNotification(noti.id, user, type, noti.when, noti.body as LinkBody)
        )
        break
      case 'PRIVATE_MESSAGE':
        notifications.push(
          new PrivateMessageNotification(noti.id, user, type, noti.when, noti.body as MessageBody)
        )
        break
      case 'FOLLOWED_YOU':
        notifications.push(new FollowedNotification(noti.id, user, type, noti.when))
        break
      default:
        console.error('Notification type not found')
        break
    }
  })

  return notifications
}
