import {jwtDecode} from "jwt-decode";

export function useDecode(token) {
  console.log('decoder', token);
  
  const decoded = jwtDecode < { id: string } > (token)
  console.log('decode2', decoded);
  
  return decoded
}