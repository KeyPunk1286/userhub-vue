export interface UserDataResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  details: string;
}

export interface LoginResponse {
  userData: UserDataResponse;
  jwt: string;
}
