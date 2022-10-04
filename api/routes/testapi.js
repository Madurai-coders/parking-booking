const router = require("express").Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));


router.post("/", async (req, res) => {
  try {
    const response = await fetch('https://taxdev.munidex.info/pbs2/pbsreq', {
        method: 'post',
        body: JSON.stringify(req.body),
        headers: {'Content-Type': 'application/json'}
    });
    const data = await response.text();
    res.send(data)
    console.log(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;


