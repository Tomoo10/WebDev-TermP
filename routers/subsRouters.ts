// const { ensureAuthenticated } = require("../middleware/checkAuth");
import express from "express";
// import * as database from "../controller/postController";
import { getSubs,getPosts } from "../fake-db";
const router = express.Router();

router.get("/list", async (req, res) => {
  const subslist = getSubs().sort();
  res.render("subs", {subs: subslist});
});

router.get("/show/:subname", async (req, res) => {
  const subname = req.params.subname
  const posts = await getPosts(20).filter((post) => post.subgroup == req.params.subname)
  res.render("sub", { posts,subname });
});

export default router;
