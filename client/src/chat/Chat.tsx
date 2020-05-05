import React, { useCallback, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CONVERSATION, GET_MESSAGES, GET_USER } from './graphql/queries'
import { Message } from '../shared/types'
import MessagesSideBar from './MessagesSideBar'
import { LinearProgress, Grid, Container } from '@material-ui/core'
import TextComposer from './TextComposer'
import { useParams } from 'react-router-dom'
import { SEND_MESSAGE } from './graphql/mutations'
import Conversation from './Conversation'
import './Chat.scss'

interface MessagesData {
  messages: Array<Message>
}
interface ConversationData {
  conversation: Array<Message>
}

export default () => {
  const { interlocutorId } = useParams()
  const { data: messagesData, loading: messagesLoading, error: e } = useQuery<
    MessagesData
  >(GET_MESSAGES)
  const { data: conversationData, loading: conversationLoading } = useQuery<
    ConversationData
  >(GET_CONVERSATION, {
    variables: { interlocutorId: Number(interlocutorId) },
    skip: !interlocutorId
  })
  const { data: userData } = useQuery(GET_USER, {
    variables: { userId: Number(interlocutorId) },
    skip: !interlocutorId
  })
  const [sendMessage, { data, loading, error }] = useMutation(SEND_MESSAGE)
  const onMessageSend = useCallback(async (messageText: string) => {
    await sendMessage({
      variables: {
        input: { message: messageText, receiverId: Number(interlocutorId) }
      }
    })
  }, [])

  useEffect(() => {
    const c = conversationData
    debugger
  }, [conversationData])

  const isLoaderShown = messagesLoading || conversationLoading
  return (
    <Container>
      {isLoaderShown && <LinearProgress variant="query" />}
      <Grid container spacing={3} style={{ height: '100vh' }}>
        <Grid item xs={12} md={3}>
          {messagesData?.messages && (
            <MessagesSideBar messages={messagesData.messages} />
          )}
        </Grid>
        <Grid item xs={12} md={9} className={'conversation-wrapper'}>
          <Conversation conversation={conversationData?.conversation} />
          <TextComposer onSend={onMessageSend} />
        </Grid>
      </Grid>
    </Container>
  )
}
