import express from "express";
import uniqid from "uniqid";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const reviewsRouter = express.Router();

const reviewsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "reviews.json"
);

const getReviews = () => JSON.parse(fs.readFileSync(reviewsJSONPath));
const writeReviews = (content) =>
  fs.writeFileSync(reviewsJSONPath, JSON.stringify(content));

//1. POST
reviewsRouter.post("/", (req, res) => {
  try {
    const newReview = {
      ...req.body,
      productId: req.params.productId,
      id: uniqid(),
      createdAt: new Date(),
    };
    const reviews = getReviews();
    reviews.push(newReview);
    writeReviews(reviews);
    res.status(201).send({ id: newReview.id });
  } catch (error) {
    console.log(error);
  }
});

//2. GET
reviewsRouter.get("/", (req, res) => {
  try {
    const reviews = getReviews();
    res.send(reviews);
  } catch (error) {
    console.log(error);
  }
});

//3. GET by id
reviewsRouter.get("/:reviewID", (req, res) => {
  try {
    const reviews = getReviews();
    const review = reviews.find((r) => r.id === req.params.reviewID);
    res.send(review);
  } catch (error) {
    console.log(error);
  }
});

//4. PUT
reviewsRouter.put("/:reviewID", (req, res) => {
  try {
    const reviews = getReviews();
    const index = reviews.findIndex((r) => r.id === req.params.reviewID);
    const modifiedReview = reviews[index];
    const updatedBody = req.body;
    const updatedReview = { ...modifiedReview, ...updatedBody };
    reviews[index] = updatedReview;
    writeReviews(reviews);
    res.send(updatedReview);
  } catch (error) {
    console.log(error);
  }
});

//5. DELETE
reviewsRouter.delete("/:reviewID", (req, res) => {
  try {
    const reviews = getReviews();
    const filteredReviews = reviews.filter((r) => r.id !== req.params.reviewID);
    writeReviews(filteredReviews);
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
});

export default reviewsRouter;
