const { Schema, model } = require("mongoose");

const postSchema = new Schema({
   body: String,
   createdAt: String,
   username: String,
   comments: [
      {
         body: String,
         username: String,
         createdAt: String,
      },
   ],
   likes: [
      {
         username: String,
         likedAt: String,
      },
   ],
});

module.exports = model("posts", postSchema);
