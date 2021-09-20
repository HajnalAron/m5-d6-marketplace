// Product modell:
//    {
//     "_id": "5d318e1a8541744830bef139", //SERVER GENERATED
//     "name": "3310",  //REQUIRED
//     "description": "somthing longer", //REQUIRED
//     "brand": "nokia", //REQUIRED
//     "imageUrl":"https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
//     "price": 100, //REQUIRED
//     "category": "smartphones" //REQUIRED
//     "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
//     "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
// }

import fs from "fs-extra";
import uniqid from "uniqid";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const productsFile = join(
  dirname(fileURLToPath(import.meta.url)),
  "products.json"
);

const reviewsFile = join(
  process.cwd(), 'src/services/reviews/reviews.json'
)

export const readProductsFile = async () => {
  return JSON.parse(await fs.readFile(productsFile));
};

export const writeProductsFile = async (dataToWrite) => {
  await fs.readFile(productsFile, JSON.stringify(dataToWrite));
};

export const makeNewProduct = (productData) => {
  return {
    ...productData,
    id: uniqid(),
    createdAt: new Date()
  };
};

export const updateProduct = async (productId, newProductData) => {
  let products = await readProductsFile();
  let productToUpdateIndex = getProductIndexById(productId);
  products[productToUpdateIndex] = {
    ...products[productToUpdateIndex],
    ...newProductData,
    updatedAt: new Date()
  };
  await writeProductsFile(products);
  return products[productToUpdateIndex];
};

export const getProductById = async (idToFind) => {
  let products = await readProductsFile();
  let productToFind = products.find((product) => product.id === idToFind);
  return productToFind;
};

export const getProductIndexById = async (idToFind) => {
  let products = await readProductsFile();
  let productToFind = products.findIndex((product) => product.id === idToFind);
  return productToFind;
};

export const filterOutProduct = async (idToFilter) => {
  let products = await readProductsFile();
  let productsFilteredOut = products.filter(
    (product) => product.id !== idToFilter
  );
  await writeProductsFile(productsFilteredOut);
};

export const filterOutReviews = async (idToFilter) => {
  const reviews = JSON.parse(await fs.readFile(reviewsFile))
  const filteredReviews = reviews.filter(r => r.id === idToFilter)
  return filteredReviews
}
