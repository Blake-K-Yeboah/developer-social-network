const { UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
   Query: {
      async getPosts() {
         try {
            const posts = await Post.find();
            return posts;
         } catch (err) {
            throw new Error(err);
         }
      },
      async getPost(postId) {
         const post = await Post.findById(postId);
         if (post) {
            return post;
         } else {
            throw new Error("No Post with that ID");
         }
      },
   },
   Mutation: {
      async createPost(_, { body }, context) {
         const { username } = checkAuth(context);

         if (body.trim() === "") {
            throw new UserInputError("Must enter a body");
         }

         const newPost = new Post({
            body,
            createdAt: new Date().toISOString(),
            username,
         });

         const post = await newPost.save();

         return post;
      },
   },
};
