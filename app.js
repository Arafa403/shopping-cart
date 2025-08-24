// app.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Shopping = require("./models/shopping"); // موديلك
const app = express();

// استخدم PORT من البيئة أو 5000 محليًا
const port = process.env.PORT || 5000;

// الاتصال بقاعدة البيانات
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shoppingDB"
)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// إعدادات المحرك hbs
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", async (req, res) => {
  try {
    const products = await Shopping.find();
    res.render("index", { arr: products });
  } catch (err) {
    console.error(err);
    res.status(500).send("حدث خطأ في السيرفر");
  }
});

app.get("/products", (req, res) => {
  res.render("products");
});

app.post("/user/add", async (req, res) => {
  try {
    await Shopping.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("حدث خطأ أثناء إضافة المنتج");
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const product = await Shopping.findById(req.params.id);
    if (!product) return res.status(404).send("المنتج غير موجود");
    res.render("user/view", { obj: product });
  } catch (err) {
    console.error(err);
    res.status(500).send("حدث خطأ في السيرفر");
  }
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
