const admin = require("firebase-admin");
const axios = require("axios");
const { API_BASE_URL } = require("../../config");

export default function handler(req, res) {
  if (req.method == "POST") {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          JSON.parse(process.env.FIREBASE_ADMIN)
        ),
        databaseURL: process.env.FIREBASE_URL,
      });
    } else {
      admin.app();
    }
    admin
      .auth()
      .verifyIdToken(req.body.user)
      .then(async (user) => {
        fetch(`${API_BASE_URL}/u/auth/otp-verify/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + req.body.token,
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify({
            phone_no: user.phone_number,
            secret: process.env.OTP_SECRET,
          }),
        })
          .then((x) => {
            console.log(x);
            res.json(x);
          })
          .catch((x) => {
            console.log(x);
            res.json(x);
          });
      })
      .catch(res.json);
  } else {
    res.status(200).end("Method Not Found");
  }
}