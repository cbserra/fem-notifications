type HeaderProps = {
  unreadCount: number
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>
  markAllRead: () => void
}

const Header = (props: HeaderProps) => {
  const { unreadCount, setUnreadCount, markAllRead } = props

  return (
    <header className="flex justify-between">
      <div className="heading-unreads w-1/2">
        <h1 className="text-heading flex justify-start gap-x-4">
          Notifications
          <span className="unread-count text-noti-count bg-blue rounded-[.6rem] text-white py-2 px-4">
            {unreadCount}
          </span>
        </h1>
      </div>
      <button className="btn-mark-read" onClick={markAllRead}>
        Mark all as read
      </button>
    </header>
  )
}

export default Header
