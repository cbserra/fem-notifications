export enum NotificationTypeEnum {
  JOIN_GROUP = 'has joined your group',
  LEAVE_GROUP = 'left the group',
  PRIVATE_MESSAGE = 'sent you a private message',
  COMMENTED_POST = 'commented on your post',
  COMMENTED_PICTURE = 'commented on your picture',
  LIKED_POST = 'liked your post',
  FOLLOWED_YOU = 'followed you',
  REACTED_POST = 'reacted to your recent post'
}

export interface NotificationTypeRecord {
  id: number
  typeEnum: string
  typeValue: string
}

export interface NotificationRecord {
  id: number
  userId: number
  typeId: number
  typeEnum: string
  body?: LinkBody | MessageBody | PhotoBody | undefined
  when: string
}

export interface UserRecord {
  id: number
  name: string
  avatar: string
}

export interface NotificationInterface {
  id: number
  user: UserRecord
  type: NotificationTypeRecord
  when: string
}

interface LinkNotificationInterface extends NotificationInterface {
  body: LinkBody
}

interface PhotoNotificationInterface extends NotificationInterface {
  body: PhotoBody
}

interface MessageNotificationInterface extends NotificationInterface {
  body: MessageBody
}

export class Notification implements NotificationInterface {
  id: number
  user: UserRecord
  type: NotificationTypeRecord
  body?: NotificationBody
  when: string

  constructor(id: number, user: UserRecord, type: NotificationTypeRecord, when: string) {
    this.id = id
    this.user = user
    this.type = type
    this.when = when
  }
}

class LinkNotification extends Notification implements LinkNotificationInterface {
  body: LinkBody

  constructor(
    id: number,
    user: UserRecord,
    type: NotificationTypeRecord,
    when: string,
    body: LinkBody
  ) {
    super(id, user, type, when)

    this.body = body
  }
}

class MessageNotification extends Notification implements MessageNotificationInterface {
  body: MessageBody

  constructor(
    id: number,
    user: UserRecord,
    type: NotificationTypeRecord,
    when: string,
    body: MessageBody
  ) {
    super(id, user, type, when)
    this.body = body
  }
}

class PhotoNotification extends Notification implements PhotoNotificationInterface {
  body: PhotoBody

  constructor(
    id: number,
    user: UserRecord,
    type: NotificationTypeRecord,
    when: string,
    body: PhotoBody
  ) {
    super(id, user, type, when)

    this.body = body
  }
}

export class PhotoCommentNotification extends PhotoNotification {
  constructor(
    id: number,
    user: UserRecord,
    type: NotificationTypeRecord,
    when: string,
    body: PhotoBody
  ) {
    super(id, user, type, when, body)
  }
}

export class JoinGroupNotification extends LinkNotification {
  constructor(
    id: number,
    user: UserRecord,
    type: NotificationTypeRecord,
    when: string,
    body: LinkBody
  ) {
    super(id, user, type, when, body)
  }
}

export class LeaveGroupNotification extends LinkNotification {
  constructor(
    id: number,
    user: UserRecord,
    type: NotificationTypeRecord,
    when: string,
    body: LinkBody
  ) {
    super(id, user, type, when, body)
  }
}

export class PrivateMessageNotification extends MessageNotification {
  constructor(
    id: number,
    user: UserRecord,
    type: NotificationTypeRecord,
    when: string,
    body: MessageBody
  ) {
    super(id, user, type, when, body)
  }
}

export class PostReactionNotification extends LinkNotification {
  constructor(
    id: number,
    user: UserRecord,
    type: NotificationTypeRecord,
    when: string,
    body: LinkBody
  ) {
    super(id, user, type, when, body)
  }
}

export class FollowedNotification extends Notification {
  constructor(id: number, user: UserRecord, type: NotificationTypeRecord, when: string) {
    super(id, user, type, when)
  }
}

export interface NotificationStatus {
  notiId: number
  isUnread: boolean
}

export interface NotificationState {
  notifications: Notification[]
}

export type LinkBody = {
  linkUrl: string
  linkTitle: string
}

export type MessageBody = {
  message: string
}

export type PhotoBody = {
  photoUrl: string
}

export type NotificationBody = LinkBody | MessageBody | PhotoBody | undefined
