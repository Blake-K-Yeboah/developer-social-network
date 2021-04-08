const usersResolvers = require("./users");
const messagesResolvers = require("./messages");
const postsResolvers = require("./posts");

module.exports = {
   User: {
      followerCount: (parent) => parent.followers.length,
   },
   Query: {
      ...usersResolvers.Query,
      ...postsResolvers.Query,
   },
   Mutation: {
      ...usersResolvers.Mutation,
      ...messagesResolvers.Mutation,
      ...postsResolvers.Mutation,
   },
   Subscription: {
      ...messagesResolvers.Subscription,
   },
};
