const express = require("express");
const multer = require("multer");
const { UserController, PostController } = require("../controllers");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// Показываем, где хранить файлы

const uploadDestination = "uploads";

const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

// Роуты пользователя
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/user/:id", authenticateToken, UserController.getUserById);
router.put("/user/:id", authenticateToken, UserController.updateUser);
router.get("/current", authenticateToken, UserController.current);

// Роуты постов
router.post("/posts", authenticateToken, PostController.createPost);
router.get("/posts", authenticateToken, PostController.getAllPosts);
router.get("/posts/:id", authenticateToken, PostController.getPostById);
router.delete("/posts/:id", authenticateToken, PostController.deletePost);

module.exports = router;
 