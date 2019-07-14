const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
var socketIOClient = require("socket.io-client");
var constance = require("../../const/constance");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ptmt-kku.firebaseio.com"
});

function createPayload({ title, body, data }) {
  return {
    notification: {
      title,
      body,
      icon: "/Logo-Only.png",
      clickAction: "http://localhost:3001"
    }
    // data: { extra: JSON.stringify(data) }
  };
}

async function sendNotification(notification, noti_token) {
  try {
    let token = noti_token.filter(el => el !== null);
    if (typeof token[0] !== "undefined") {
      const payload = createPayload(notification);
      await admin.messaging().sendToDevice(token, payload, { priority: "high" });
      token.forEach(el => {
        socketIOClient(constance.endpoint).emit("notify", notification);
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  sendNotification
};
