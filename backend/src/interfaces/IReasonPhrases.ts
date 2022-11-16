export interface IReasonPhrases {
  isRequired: (field: string) => string,
  invalidType: (field: string, type: string) => string,
  invalidLength: (field: string, length: number) => string,
}