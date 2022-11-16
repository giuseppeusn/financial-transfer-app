import { Decimal } from "@prisma/client/runtime";

interface TransactionManagement {
  name: string | undefined;
  value: Decimal;
  data: string;
  hour: string;
}

export default TransactionManagement;