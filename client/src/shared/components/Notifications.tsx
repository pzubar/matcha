import React, { useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { Snackbar } from '@material-ui/core'
import { Message } from '../types'
import { WHO_AM_I } from '../graphql/queries'
import { MESSAGE_SENT } from '../../chat/graphql/subscriptions'

interface MessageSent {
  messageSent: Message
}

const Notifications = () => {
  const [open, setOpen] = useState(false)
  const { data: userData } = useQuery(WHO_AM_I)
  const { data: messageSentData, error } = useSubscription<MessageSent>(
    MESSAGE_SENT,
    {
      variables: { receiverId: userData?.whoAmI?.id },
      shouldResubscribe: true,
      skip: !userData?.whoAmI?.id
    }
  )

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  React.useEffect(() => {
    if (messageSentData?.messageSent) {
      setOpen(true)
    }
  }, [messageSentData])

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message="Note archived"
    />
  )
}

export default Notifications
