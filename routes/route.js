const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const db = require("../data/database");
const ObjectId = mongodb.ObjectId;
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.get("/index", async (req, res) => {
  const posts = await db
    .getDb()
    .collection("posts")
    .find({}, { title: 1, summary: 1, "author.name": 1 })
    .toArray();
  res.render("index", { posts: posts });
});

router.get("/form", async (req, res) => {
  const authors = await db.getDb().collection("authors").find().toArray();
  res.render("form", { authors: authors });
});
router.post("/index", async (req, res) => {
  console.log(req.body);
  const authorId = new ObjectId(req.body.author);
  const author = await db
    .getDb()
    .collection("authors")
    .findOne({ _id: authorId });
  const newpost = {
    title: req.body.Title,
    summary: req.body.Summary,
    content: req.body.Content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.name,
    },
  };
  const result = await db.getDb().collection("posts").insertOne(newpost);
  console.log(result);

  res.redirect("/index");
});
router.get("/index/update/:id", async (req, res) => {
  const postId = req.params.id;
  const post = await db
    .getDb()
    .collection("posts")
    .findOne(
      { _id: new ObjectId(postId) },
      { title: 1, summary: 1, content: 1 }
    );
  if (!post) {
    return res.status(404).send("Post Didnt found");
  }
  res.render("update", { post: post });
});
router.get("/index/post-detail/:id", async (req, res) => {
  const postId = req.params.id;
  const detail = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: new ObjectId(postId) }, { summary: 0 });
  if (!detail) {
    return res.status(404).send("Post Didnt found");
  }
  res.render("post-detail", { detail: detail });
});
router.post("/post/edit/:id", async (req, res) => {
  console.log(req.body);
  const postId = new ObjectId(req.params.id);
  const posts = await db
    .getDb()
    .collection("posts")
    .updateOne(
      { _id: postId },
      {
        $set: {
          title: req.body.Title,
          summary: req.body.Summary,
          content: req.body.Content,
        },
      }
    );
  res.redirect("/index");
});
router.post("/post/delete/:id", async (req, res) => {
  const postId = new ObjectId(req.params.id);

  const post = await db.getDb()
  .collection("posts").deleteOne({ _id: postId });
  res.redirect('/index')
});

module.exports = router;
