const express = require('express');
const router = express.Router();
const catchAsync = require("../utils/catchAsync.js");
const campgrounds = require("../controllers/campgrounds");
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware.js');
const multer  = require('multer')
const {storage} = require('../cloudinary/index.js')
const upload = multer({ storage })

router.route("/")
  .get(catchAsync (campgrounds.index))
  .post(isLoggedIn, upload.array('images'), validateCampground, catchAsync (campgrounds.createCampground));


router.get("/new", isLoggedIn, catchAsync (campgrounds.renderNewForm));

router.route("/:id")
  .get(catchAsync (campgrounds.showCampground))
  .put(isLoggedIn, isAuthor, upload.array('images'), validateCampground, catchAsync (campgrounds.updateCampground))
  .delete(isLoggedIn, catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync (campgrounds.renderEditForm));

module.exports = router;