import React, { useCallback, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CONVERSATION, GET_MESSAGES } from './graphql/queries'
import { Message, User } from '../shared/types'
import MessagesSideBar from './MessagesSideBar'
import { LinearProgress, Grid, Container } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { SEND_MESSAGE } from './graphql/mutations'
import Conversation from './Conversation'
import TextComposer from './TextComposer'
import './Chat.scss'

interface MessagesData {
  messages: Array<Message>
}
interface ConversationData {
  conversation: Array<Message>
  user: User
}

export default () => {
  const { interlocutorId } = useParams()
  const { data: messagesData, loading: messagesLoading, error: e } = useQuery<
    MessagesData
  >(GET_MESSAGES)
  const {
    data: conversationData,
    loading: conversationLoading,
    error: conver
  } = useQuery<ConversationData>(GET_CONVERSATION, {
    variables: { interlocutorId: Number(interlocutorId) },
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
  const isLoaderShown = messagesLoading || conversationLoading

  useEffect(() => {
    const c = conversationData
    const er = conver
    debugger
  }, [conversationData, conver])

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
          <Conversation
            interlocutorData={conversationData?.user}
            conversation={conversationData?.conversation}
          />
          <TextComposer onSend={onMessageSend} />
        </Grid>
      </Grid>
    </Container>
  )
}
