const { gql } = require("apollo-server");

module.exports = gql`
   type Follower {
      username: String
      followedAt: String
   }
   type Message {
      body: String
      username: String
      sentAt: String
   }
   type User {
      id: ID!
      email: String!
      token: String!
      username: String!
      createdAt: String!
      followers: [Follower]
      messages: [Message]
      followerCount: Int!
   }
   input RegisterInput {
      username: String!
      password: String!
      confirmPassword: String!
      email: String!
   }
   type Query {
      getUsers: [User]
      getUser(userId: ID!): User!
   }
   type Mutation {
      register(registerInput: RegisterInput): User!
      login(username: String!, password: String!): User!
      follow(userId: ID!): User!
      sendMessage(body: String, to: ID!): User!
   }
   type Subscription {
      newMessage: Message!
   }
`;
