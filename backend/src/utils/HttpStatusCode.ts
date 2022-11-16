import { IReasonPhrases } from '../interfaces/IReasonPhrases';

export const ReasonPhrases: IReasonPhrases = {
  isRequired: (field) => `${field} is required`,
  invalidType: (field, type) => `${field} must be a ${type}`,
  invalidLength: (field, length) => `${field} must be at least ${length} characters`,
};

export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
};