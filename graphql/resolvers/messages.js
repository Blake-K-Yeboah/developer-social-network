const User = require("../../models/User");
const checkAuth = require("../../utils/check-auth");

module.exports = {
   Mutation: {
      async sendMessage(_, { body, to }, context) {
         const fromUser = checkAuth(context);
         const toUser = await User.findById(to);

         if (toUser) {
            const message = {
               body,
               username: fromUser.username,
               sentAt: new Date().toISOString(),
            };

            toUser.messages.push(message);

            await toUser.save();

            context.pubsub.publish("NEW_MESSAGE", {
               newMessage: message,
            });

            return toUser;
         } else {
            throw new Error("User doesn't exist");
         }
      },
   },
   Subscription: {
      newMessage: {
         subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_MESSAGE"),
      },
   },
};
