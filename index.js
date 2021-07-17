const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); //to aviod CROS
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || "3333";

const user_Router = require("./routers/user.js");
const product_Router = require("./routers/product.js");
const category_Router = require("./routers/category.js");
const renting_operation_Router = require("./routers/renting_operation.js");

app.use(express.json());
app.use(cors());

app.use(morgan("tiny"));

app.use("/assets/images", express.static("./public/images"));
app.use("/frontend", express.static("frontend"));
//routes
app.use("/api/user", user_Router);
app.use("/api/product", product_Router);
app.use("/api/category", category_Router);
app.use("/api/renting-operation", renting_operation_Router);

app.post("/sendMail", (req, res, next) => {
  console.log("new email request");
  let user = req.body;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "renterific.2021@gmail.com",
      pass: "Abdo123456#",
    },
  });

  var mailOptions = {
    from: "renterific.2021@gmail.com",
    to: user.email,
    subject: "New Password",
    html: `<h1>New Password Message</h1>
    <br> 
    <p>Your new password is <span style="color:blue"> ${user.password}</span>. Please do not share it with others</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email sent: " + info.response);
      res.send(info);
    }
  });
});

//error message
app.use((err, req, res, next) => {
  res.status(404).json({ msg: err });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
