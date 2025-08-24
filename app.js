// app.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Shopping = require("./models/shopping"); // الموديل
const app = express();

// استخدام PORT من البيئة أو 3000 محليًا
const PORT = process.env.PORT || 3000;

// الاتصال بقاعدة البيانات (Atlas)
const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://Arafa:Arafa123@cluster0.zdjypgk.mongodb.net/3rafa_data?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// إعدادات المحرك hbs
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// ميدل وير
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  Shopping.find()
    .then(result => res.render("index", { arr: result }))
    .catch(err => console.log(err));
});

app.get("/products", (req, res) => {
  res.render("products");
});

app.post("/user/add", (req, res) => {
  Shopping.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err));
});

app.get("/user/:id", (req, res) => {
  Shopping.findById(req.params.id)
    .then(result => res.render("user/view", { obj: result }))
    .catch(err => console.log(err));
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
