import Router from "./_router";
import usersController from "../controllers/users.controller";
import { verifyJwt } from '../middlewares/jwt.middleware';

Router.get('/users', verifyJwt, usersController.getUsers);
Router.get('/users/:id', verifyJwt, usersController.getUserById);
Router.get('/users/getUserByEmail', verifyJwt, usersController.getUserByEmail);