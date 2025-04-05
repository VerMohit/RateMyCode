import { Router } from "express";
import * as userController from './users';
import * as postController from './posts';

const router = Router();

router.get('/getUsers', userController.getUsers);
router.get('/getUser/:username', userController.getUserByUsername);
// router.patch('/updateUser/:username', userController.updateUserByUsername);


router.get('/getPosts', postController.getPosts);
router.get('/getPosts/:username', postController.getPostsByUser);
// router.get('/getPosts/:id', postController.getPostsById);

// router.get('./getPosts', postController.getPosts);
// router.get('./getPost/:id', postController.getPostsById);
// router.post('./addNewPost', postController.newPost);
// router.put('./updatePost/:id', postController.newPost);

export default router;