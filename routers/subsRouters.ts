// const { ensureAuthenticated } = require("../middleware/checkAuth");
import express from "express";
import * as database from "../controller/postController";
import { getSubs } from "../fake-db";
const router = express.Router();

router.get("/list", async (req, res) => {
  const subslist = getSubs().sort();
  res.render("subs", {subs: subslist});
});

router.get("/show/:subname", async (req, res) => {
  // ⭐ TODO

  res.render("sub");
});

export default router;
