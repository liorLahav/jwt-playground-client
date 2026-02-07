export interface IAuthOptions {
  userName: string;
  password: string;
  storedLocation: "cookies" | "localStorage";
  alg: null | "HS256" | "none";
  exp: true | false;
  sameSite: "none" | "lax" | "strict";
  secure: true | false;
  httpOnly: true | false;
}
