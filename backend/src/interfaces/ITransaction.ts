import { z } from 'zod';
import { ReasonPhrases } from '../utils/HttpStatusCode';

const { isRequired, invalidType } = ReasonPhrases;

export const TransactionSchema = z.object({
  creditedAccountId: z.number({
    required_error: isRequired('creditedAccountId'),
    invalid_type_error: invalidType('creditedAccountId', 'number'),
  }).positive({
    message: 'must be greater than 0',
  }),
  value: z.number({
    required_error: isRequired('value'),
    invalid_type_error: invalidType('value', 'number'),
  }).positive({
    message: 'must be greater than 0',
  }),
});

export type ITransaction = z.infer<typeof TransactionSchema>;