import { z } from 'zod';
import { ReasonPhrases } from '../utils/HttpStatusCode';

const { isRequired, invalidType, invalidLength } = ReasonPhrases;

export const LoginSchema = z.object({
  username: z.string({
    required_error: isRequired('Username'),
    invalid_type_error: invalidType('Username', 'string'),
  }).min(3, {
    message: invalidLength('Username', 3),
  }),
  password: z.string({
    required_error: isRequired('Password'),
    invalid_type_error: invalidType('Password', 'string'),
  }).min(8, {
    message: invalidLength('Password', 8),
  }).regex(/(?=.*\d)(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter and one number',
  }),
});

export type ILogin = z.infer<typeof LoginSchema>;