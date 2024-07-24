import express from "express";
const router = express.Router()

// controllers
import {
    createMovie,
    getAllMovies,
    getSpecificMovie,
    updateMovie,
    movieReview,
    deleteMovie,
    deleteComment,
    getNewMovies,
    getTopMovies,
    getRandomMovies
} from "../controllers/movieController.js";

// middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";


//public Routes: those routes which will be accessible for all of the users 
router.get('/all-movies', getAllMovies)
router.get('/specific-movie/:id', getSpecificMovie)

//RTK Query endpoints
router.get('/new-movies', getNewMovies);
router.get('/top-movies',getTopMovies);
router.get('/random-movies',getRandomMovies);


//Restricted Routes
router.post("/:id/reviews", authenticate, checkId, movieReview)


// Admin
router.post('/create-movie', authenticate, authorizeAdmin, createMovie);
router.put('/update-movie/:id', authenticate, authorizeAdmin, updateMovie);
//deleting a specific movie
router.delete('/delete-movie/:id', authenticate, authorizeAdmin, deleteMovie);
router.delete('/delete-comment', authenticate, authorizeAdmin, deleteComment);

export default router;