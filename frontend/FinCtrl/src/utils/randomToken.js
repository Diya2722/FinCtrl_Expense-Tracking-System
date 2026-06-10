import crypto from "crypto";

const randomToken = () => crypto.randomBytes(20).toString("hex");

export default randomToken;
