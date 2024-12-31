import { decode } from "../utils/decodeJWT";

export function getUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const decoded_user = decode(user.accessToken);
    // console.log(decoded_user.user.id);
    return decoded_user.user.id;
  } else {
    return null;
  }
}
