const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const filterController = require("../controllers/filters");

router.get("/trending", wrapAsync(filterController.trending))
router.get("/rooms", wrapAsync(filterController.rooms));
router.get("/mountains", wrapAsync(filterController.mountains));
router.get("/farms", wrapAsync(filterController.farms));
router.get("/arctics", wrapAsync(filterController.arctics));
router.get("/beaches", wrapAsync(filterController.beaches));
router.get("/cities", wrapAsync(filterController.cities));
router.get("/pools", wrapAsync(filterController.pools));
router.get("/campings", wrapAsync(filterController.campings));
router.get("/domes", wrapAsync(filterController.domes));
router.get("/boats", wrapAsync(filterController.boats));

module.exports = router;