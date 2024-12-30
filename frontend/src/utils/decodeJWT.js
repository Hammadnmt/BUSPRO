import { jwtDecode } from "jwt-decode";

export function decode(data) {
  return jwtDecode(data);
}
