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
   type Comment {
      body: String
      username: String
      createdAt: String
   }
   type Like {
      username: String
      likedAt: String
   }
   type Post {
      id: ID!
      body: String!
      createdAt: String!
      username: String!
      comments: [Comment]
      likes: [Like]
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
      getPosts: [Post]
      getPost(postId: ID!): Post!
   }
   type Mutation {
      register(registerInput: RegisterInput): User!
      login(username: String!, password: String!): User!
      follow(userId: ID!): User!
      sendMessage(body: String, to: ID!): User!
      createPost(body: String): Post!
   }
   type Subscription {
      newMessage: Message!
   }
`;
