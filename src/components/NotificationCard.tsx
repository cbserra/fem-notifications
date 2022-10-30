import cx from 'classnames'

import {
  LinkBody,
  MessageBody,
  Notification,
  NotificationBody,
  NotificationStatus,
  NotificationTypeRecord,
  PhotoBody,
  UserRecord
} from '../types/Types'

// async
function buildFollowedBody(noti: Notification, isUnread: boolean): JSX.Element {
  // Promise<JSX.Element> {
  const { type } = noti

  return (
    <div
      className={cx({
        "after:text-red after:content-['•']": isUnread
      })}
    >
      {type.typeValue}
      {isUnread ? (
        <span className="text-noti-count bg-blue rounded-[.6rem] text-white py-2 px-4" />
      ) : null}
    </div>
  )
}
// async
function buildBody(noti: Notification, isUnread: boolean): JSX.Element {
  // Promise<JSX.Element> {
  const { user, type, body, when } = noti

  switch (type.typeEnum) {
    case 'COMMENTED_PICTURE':
      return (
        <>
          {type.typeValue}
          <img
            alt={(body as PhotoBody).photoUrl}
            src={`/src/assets/images/${(body as PhotoBody).photoUrl}`}
          />
        </>
      )

    case 'REACTED_POST':
    case 'JOIN_GROUP':
    case 'LEAVE_GROUP':
      return (
        <>
          {type.typeValue}
          <a href={(body as LinkBody).linkUrl}>{(body as LinkBody).linkTitle}</a>
        </>
      )

    case 'FOLLOWED_YOU':
      return buildFollowedBody(noti, isUnread)

    case 'PRIVATE_MESSAGE':
      return (
        <>
          {type.typeValue}
          {isUnread ? (
            <span className="text-noti-count bg-blue rounded-[.6rem] text-white py-2 px-4">
              New
            </span>
          ) : null}
          <div>
            <p>{(body as MessageBody).message}</p>
          </div>
        </>
      )

    default:
      return <></>
  }
}

const NotificationCard = (props: {
  notification: Notification
  notiStatus: NotificationStatus | undefined
}) => {
  const { notification, notiStatus } = props
  const { user, type, body, when } = notification

  return (
    <div
      className={cx('noti-card flex', {
        "after:text-red after:content-['•']": notiStatus?.isUnread
      })}
    >
      <img
        alt={user.name}
        className="noti-card--avatar rounded-full"
        src={`/src/assets/images/${user.avatar}`}
      />
      <p>
        <span>{user.name}</span>
        <span>{buildBody(notification, notiStatus?.isUnread || false)}</span>
      </p>
      <div className="text-noti-when">
        <p>{when}</p>
      </div>
    </div>
  )
}

export default NotificationCard
