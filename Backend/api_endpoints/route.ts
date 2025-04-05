import { Router } from "express";
import * as userController from './users';
// import * as postController from './posts.ts';

const router = Router();


// router.get('/getUser/:username', userController.getUserByUsername);
router.get('/getUsers', userController.getUsers);
router.get('/getUser/:username', userController.getUserByUsername);

// router.patch('/updateUser/:username', _user.updateUserByUsername);

// router.get('./getPosts', postController.getPosts);
// router.get('./getPost/:id', postController.getPostsById);
// router.post('./addNewPost', postController.newPost);
// router.put('./updatePost/:id', postController.newPost);

export default router;