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
      async getPost(_, { postId }) {
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
      async deletePost(_, { postId }, context) {
         const { username } = checkAuth(context);

         const post = await Post.findById(postId);

         if (!post) {
            throw new Error("No post with that id.");
         }

         if (post.username === username) {
            await post.delete();
            return post;
         } else {
            throw new Error("You must be the owner of the post to delete it.");
         }
      },
      async editPost(_, { newBody, postId }, context) {
         const { username } = checkAuth(context);

         if (newBody.trim() === "") {
            throw new UserInputError("Must enter a body");
         }

         if (!post) {
            throw new Error("No post with that id.");
         }

         const post = await Post.findById(postId);

         if (post.username === username) {
            post.body = newBody;
            const updatedPost = post.save();
            return updatedPost;
         } else {
            throw new Error("You must be the owner of the post to delete it.");
         }
      },
      async likePost(_, { postId }, context) {
         const { username } = checkAuth(context);
         const post = await Post.findById(postId);

         if (!post) {
            throw new Error("No post with that id.");
         }

         if (post.likes.find((like) => like.username === username)) {
            post.likes = post.likes.filter(
               (like) => like.username !== username
            );
         } else {
            post.likes.push({
               username,
               likedAt: new Date().toISOString(),
            });
         }

         const updatedPost = post.save();
         return updatedPost;
      },
   },
};
