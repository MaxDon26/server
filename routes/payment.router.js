const express = require("express");
const router = express.Router({ mergeParams: true });
const axios = require("axios");

router.post("/", async (req, res) => {
  const { userId, access } = req.body;
  console.log(userId);
  try {
    const { data } = await axios.patch(
      ` https://freelancer-99d6f-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json?auth=${access}`,
      {
        isActive: true,
      }
    );

    res.json(data);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
