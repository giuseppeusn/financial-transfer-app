import { Decimal } from "@prisma/client/runtime";

interface TransactionManagement {
  id: number;
  name: string | undefined;
  value: Decimal;
  type: string;
  date: string;
  hour: string;
}

export default TransactionManagement;