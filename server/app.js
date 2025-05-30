const express = require("express")
const app = express()
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const cors = require('cors')
const sendOtp = require('./Controllers/sendotp')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173", // Update as per frontend origin
    credentials: true
}))


app.get('/', (req, res) => {
    res.send('Hello')
})


app.post('/create', async (req, res) => {
  try {
    const { name, username, email, age, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This Email Is Already Registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    let user = await userModel.create({
      name, username, email, age, password: hash, otp, otpExpires
    });

    await sendOtp( email, otp );

    res.status(201).json({ message: "OTP sent to email. Please verify to complete registration." });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


app.get('/getusers', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const existUser = await userModel.findOne({ email })
        if (!existUser) {
            return res.status(400).json({ message: "This Email Is Not Registered" })
        }
        bcrypt.compare(password, existUser.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email: existUser.email, userdid: existUser._id }, 'key')
                res.cookie("token", token)
                res.status(201).json({ message: "You Can Login", token })
            } else {
               res.status(401).json({ message: "Incorrect Email Or Password" })
            }
        })
    } catch (error) {
        console.error("Error Login user:", error)
        res.status(500).json({ message: "Server error", error })
    }
})

app.post('/verify-otp', async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (user.isVerified) {
        return res.status(400).json({ message: "User already verified" });
      }
  
      if (user.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
  
      if (user.otpExpires < new Date()) {
        return res.status(400).json({ message: "OTP has expired" });
      }
  
      user.isVerified = true;
      user.otp = null;
      user.otpExpires = null;
      await user.save();
  
      res.status(200).json({ message: "Account verified successfully" });
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  

app.get('/mail', sendOtp)

app.listen(3000, () => console.log("Server running on http://localhost:3000"))