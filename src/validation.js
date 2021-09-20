import { body } from "express-validator"

export const productsValidationMiddleware = [
    body("name").exists().isString().withMessage("name is required and it should be a string"),
    body("description").exists().isString().withMessage("description is required and it should be a string"),
    body("brand").exists().isString().withMessage("brand is required and it should be a string"),
    body("price").exists().isNumeric().withMessage("price is required and it should be a number"),
    body("category").exists().isString().withMessage("category is required and it should be a string"),
]