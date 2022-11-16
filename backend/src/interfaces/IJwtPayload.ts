import { JwtPayload } from 'jsonwebtoken';

export default interface IJwtPayload extends JwtPayload {
  id: number;
}
