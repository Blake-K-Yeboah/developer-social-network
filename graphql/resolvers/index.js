const usersResolvers = require("./users");
const messagesResolvers = require("./messages");

module.exports = {
   User: {
      followerCount: (parent) => parent.followers.length,
   },
   Query: {
      ...usersResolvers.Query,
   },
   Mutation: {
      ...usersResolvers.Mutation,
      ...messagesResolvers.Mutation,
   },
   Subscription: {
      ...messagesResolvers.Subscription,
   },
};
