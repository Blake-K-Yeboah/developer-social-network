const { UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
   Mutation: {
      async createComment(_, { body, postId }, context) {
         const { username } = checkAuth(context);

         if (body.trim() === "") {
            throw new UserInputError("Comment must have a body.");
         }

         const post = await Post.findById(postId);

         if (!post) {
            throw new Error("No post with that id.");
         }

         post.comments.push({
            body,
            username,
            createdAt: new Date().toISOString(),
         });

         const updatedPost = await post.save();
         return updatedPost;
      },
   },
};
