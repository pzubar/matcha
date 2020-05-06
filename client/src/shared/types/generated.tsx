import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};


export type LoginInputData = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
   __typename?: 'LoginResponse';
  token: Scalars['String'];
};

export type Message = {
   __typename?: 'Message';
  id: Scalars['Int'];
  message: Scalars['String'];
  interlocutorId: Scalars['Float'];
  type?: Maybe<Scalars['String']>;
  interlocutorName: Scalars['String'];
  senderId?: Maybe<Scalars['Int']>;
  receiverId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
};

export type MessageInputData = {
  message: Scalars['String'];
  receiverId: Scalars['Int'];
};

export type Mutation = {
   __typename?: 'Mutation';
  signUp: LoginResponse;
  login: LoginResponse;
  sendMessage: Message;
};


export type MutationSignUpArgs = {
  signUpUserData: SignUpUserData;
};


export type MutationLoginArgs = {
  loginInputData: LoginInputData;
};


export type MutationSendMessageArgs = {
  messageInputData: MessageInputData;
};

export type Query = {
   __typename?: 'Query';
  whoAmI: User;
  user: User;
  users: Array<User>;
  messages: Array<Message>;
  conversation: Array<Message>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryConversationArgs = {
  interlocutorId: Scalars['Int'];
};

export type SignUpUserData = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type Subscription = {
   __typename?: 'Subscription';
  messageSent: Message;
};


export type SubscriptionMessageSentArgs = {
  receiverId: Scalars['Int'];
};

export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  username: Scalars['String'];
  distance?: Maybe<Scalars['Int']>;
};


