const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.get("/", (req, res) => {
  res.send(
    <form action="/profil" method="post" encType='multipart/from-data'>
      <input type='file' name='avatar' />
      <input type='submit' />
    </form>
  );
});

app.post("/profile", upload.single("avatar"), function (req, res, next) => {
  
  if(req.file)
});

// GET API/ Read Route
app.get("/read", (req, res) => {
  const data = fs.readFileSync("./1.json", "utf-8");
  // console.log(data, typeof data);

  // converting json data ---- parse ----> js object
  const jsData = JSON.parse(data);
  console.log(jsData, typeof jsData);

  console.log(jsData.student);

  res.send({ data: jsData });
});

app.listen(8080, () => {
  console.log("Server started");
});
