import fs from "fs";
import moment from "moment";
import SockJS from "sockjs-client";
let singleSock = null;
const onClose = () => {
  console.log("retry connect");
  listen();
};
const OUR_USER_ID = 26076146;
const onCustomerReply = body => {
  console.log("on customer reply");
};

const onUserTyping = body => {
  console.log("on user typing message");
};

const onUserRead = body => {
  console.log("on user read message");
};
const deliveryResponse = message => {
  console.log("message reached");
  fs.writeFileSync(
    process.cwd() + "/logs/" + moment().format("x") + ".json",
    message
  );
  const msg = JSON.parse(message);
  if (msg.channel === "user") {
    const { body: data } = msg;
    switch (data.type) {
      case "private": {
        return onCustomerReply(data);
      }
      case "typing": {
        return onUserTyping(data);
      }
      case "user_read": {
        return onUserRead(data);
      }
    }
  }
};
export const listen = () => {
  const sock = new SockJS("https://notifications.freelancer.com");
  singleSock = sock;
  sock.onopen = () => {
    console.log("init socket");
    const authenticate = () => {
      sock.send(
        JSON.stringify({
          channel: "auth",
          body: {
            hash2: "AH4ywNe1a6F+AHRXcSrm3dyTi1cf6dXt9YOebBf3jSE=",
            user_id: 26076146
          }
        })
      );
    };
    authenticate();
  };
  sock.onmessage = event => {
    const { data: message } = event;
    deliveryResponse(message);
  };
  sock.onclose = error => {
    console.log("socket closed because", error.toString());
    onClose();
  };
};
