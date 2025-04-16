import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { getPosts, addPost, getSubs, getPost, editPost, addComment, deletePost, deleteComment} from "../fake-db";


router.get("/", async (req, res) => {
  const posts = await getPosts(20);
  const user = await req.user;
  res.render("posts", { posts, user });
});

router.get("/create", ensureAuthenticated, (req, res) => {
  const subs = getSubs();
  res.render("createPosts", { subs });
});

router.post("/create", ensureAuthenticated, async (req, res) => {
  const creator = await req.user as { id: number; uname: string; password: string };
  console.log(creator.id, typeof creator.id)
  const { title, link, description, subgroup } = req.body
  await addPost(title, link, creator.id,description, subgroup)
  // console.log(getPosts())
  res.redirect("/")

});

router.get("/show/:postid", async (req, res) => {
  const postId = Number(await req.params.postid);
  const post = await getPost(postId);
  const user = await req.user;
  res.render("individualPost", { post, user });
});

router.get("/edit/:postid", ensureAuthenticated, async (req, res) => {
  const postId = Number(req.params.postid);
  const post = getPost(postId);
  const subs = getSubs();

  res.render("editPost", { post, subs });
});

router.post("/edit/:postid", ensureAuthenticated, async (req, res) => {
  const postId = Number(req.params.postid);
  const { title, link, description, subgroup } = req.body;

  editPost(postId, { title, link, description, subgroup });
  res.redirect(`/posts/show/${postId}`);
});

router.get("/deleteconfirm/:postid", ensureAuthenticated, async (req, res) => {
  const postId = Number(req.params.postid);
  const post = getPost(postId);

  res.render("confirmDelete", { post });
});

router.post("/delete/:postid", ensureAuthenticated, async (req, res) => {
  const postId = Number(req.params.postid);
  const post = getPost(postId);

  if (req.body.confirm === "yes") {
    deletePost(postId);
    res.redirect(`/subs/show/${post.subgroup}`);
  } else {
    res.redirect(`/posts/show/${postId}`);
  }
});

router.post("/comment-create/:postid", ensureAuthenticated, async (req, res) => {
  const postId = Number(req.params.postid);
  const user = await req.user as {id: number; uname: string; password: string };
  const description = req.body.description;

  await addComment(postId, user.id, description);
  res.redirect(`/posts/show/${postId}`);
  }
);

export default router;
