import {jwtDecode} from "jwt-decode";

export function useDecode(token) {
  const decoded = jwtDecode < { id: string } > (token)
  return decoded
}