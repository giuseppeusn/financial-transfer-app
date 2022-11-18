import { z } from 'zod';
import { ReasonPhrases } from '../utils/HttpStatusCode';

const { isRequired, invalidType, invalidLength } = ReasonPhrases;

export const RegisterSchema = z.object({
  username: z.string({
    required_error: isRequired('username'),
    invalid_type_error: invalidType('username', 'string'),
  }).min(3, {
    message: invalidLength('username', 3),
  }),
  password: z.string({
    required_error: isRequired('password'),
    invalid_type_error: invalidType('password', 'string'),
  }).min(8, {
    message: invalidLength('password', 8),
  }).regex(/(?=.*\d)(?=.*[A-Z])/, {
    message: 'password must contain at least one uppercase letter and one number',
  }),
});

export type IRegister = z.infer<typeof RegisterSchema>;