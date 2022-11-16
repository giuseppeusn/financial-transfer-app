import { Users } from "@prisma/client";

interface IUser {
  username: string;
  token: string;
}

export default IUser;