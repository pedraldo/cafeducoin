import Router from './_router';
import gamesController from "../controllers/games.controller";
import { verifyJwt } from '../middlewares/jwt.middleware';

Router.get('/games', gamesController.getGames);
Router.get('/games/:id', gamesController.getGameById);
Router.get('/games/:id/history', verifyJwt, gamesController.getGameHistory);
Router.post('/games/:id/borrowing', verifyJwt, gamesController.postGameBorrowing);