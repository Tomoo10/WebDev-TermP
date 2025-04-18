import express from "express";
import passport from "../middleware/passport";
import 'dotenv/config' /* needed to import dotenv for dev mode to work, change the .env mode to prod  or some thing not 'dev' */
const router = express.Router();
const devMode = process.env.MODE === "dev";

router.get("/login", async (req, res) => {
  console.log(devMode)
  res.render("login", { devMode: devMode });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/");
});

export default router;
