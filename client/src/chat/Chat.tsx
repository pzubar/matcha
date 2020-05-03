import React, { useCallback, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CONVERSATION, GET_MESSAGES } from './graphql/queries'
import { Message } from '../shared/types'
import MessagesSideBar from './MessagesSideBar'
import { LinearProgress, Grid, Container } from '@material-ui/core'
import TextComposer from './TextComposer'
import { useParams } from 'react-router-dom'
import { SEND_MESSAGE } from './graphql/mutations'

interface MessagesData {
  messages: Array<Message>
}

export default () => {
  const { interlocutorId } = useParams()
  const { data: messagesData, loading: messagesLoading, error: e } = useQuery<
    MessagesData
  >(GET_MESSAGES)
  const { data: conversation, loading: conversationLoading } = useQuery<
    MessagesData
  >(GET_CONVERSATION, {
    variables: { interlocutorId: Number(interlocutorId) },
    skip: !interlocutorId
  })
  const [sendMessage, { data, loading, error }] = useMutation(SEND_MESSAGE)
  const onMessageSend = useCallback(async (messageText: string) => {
    debugger
    await sendMessage({
      variables: {
        input: { message: messageText, receiverId: Number(interlocutorId) }
      }
    })
    debugger
  }, [])

  useEffect(() => {
    const c = conversation
    debugger
  }, [conversation])

  return (
    <Container>
      {e && e}
      {messagesLoading ||
        (conversationLoading && <LinearProgress variant="query" />)}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          {messagesData?.messages && (
            <MessagesSideBar messages={messagesData.messages} />
          )}
        </Grid>
        <Grid item xs={12} md={9}>
          <TextComposer onSend={onMessageSend} />
        </Grid>
      </Grid>
    </Container>
  )
}
