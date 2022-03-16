import Product from "./product.js";
import Review from "./review.js";

//defining relationship
// 1. what methods to use? hasMany, belongsTo
// 2. pick method and undersatnd TRAGET & SOURCE model
// 3. on the the other method switch TARGET & SOURCE model

Review.belongsTo(Product, { onDelete: "CASCADE" }); // allows to include Review on Product
Product.hasMany(Review, { onDelete: "CASCADE" }); // allows to include Review in Product

export { Review, Product };