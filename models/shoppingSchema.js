const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingSchema = new Schema({
    productName: { type: String, required: true },
    images: [{ type: String }],
    descriptions: [{ type: String }],
    videoPath: { type: String }
});

module.exports = mongoose.model("Shopping", shoppingSchema);
