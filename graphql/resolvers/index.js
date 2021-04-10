const usersResolvers = require("./users");
const messagesResolvers = require("./messages");
const postsResolvers = require("./posts");
const commentsResolvers = require("./comments");

module.exports = {
   User: {
      followerCount: (parent) => parent.followers.length,
   },
   Post: {
      commentCount: (parent) => parent.comments.length,
      likeCount: (parent) => parent.likes.length,
   },
   Query: {
      ...usersResolvers.Query,
      ...postsResolvers.Query,
   },
   Mutation: {
      ...usersResolvers.Mutation,
      ...messagesResolvers.Mutation,
      ...postsResolvers.Mutation,
      ...commentsResolvers.Mutation,
   },
   Subscription: {
      ...messagesResolvers.Subscription,
   },
};
