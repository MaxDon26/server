const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.router"));
router.use("/payment", require("./payment.router"));

module.exports = router;
