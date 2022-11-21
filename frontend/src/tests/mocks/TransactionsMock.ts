import Transaction from "../../interfaces/Transaction";

const date = new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
const hour = new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" });

export const transactionsMock: Transaction[] = [
  {
    id: 1,
    date,
    hour,
    name: "test",
    value: "10",
    type: "cash-in"
  },
  {
    id: 2,
    date,
    hour,
    name: "test2",
    value: "10",
    type: "cash-in"
  },
  {
    id: 3,
    date,
    hour,
    name: "test3",
    value: "25",
    type: "cash-out"
  },
  {
    id: 4,
    date,
    hour,
    name: "test4",
    value: "10",
    type: "cash-in"
  },
  {
    id: 5,
    date,
    hour,
    name: "test5",
    value: "10",
    type: "cash-in"
  },
  {
    id: 6,
    date,
    hour,
    name: "test6",
    value: "20",
    type: "cash-out"
  },
  {
    id: 7,
    date,
    hour,
    name: "test7",
    value: "10",
    type: "cash-in"
  },
  {
    id: 8,
    date,
    hour,
    name: "test8",
    value: "10",
    type: "cash-out"
  },
  {
    id: 9,
    date,
    hour,
    name: "test9",
    value: "10",
    type: "cash-out"
  },
  {
    id: 10,
    date,
    hour,
    name: "test10",
    value: "10",
    type: "cash-out"
  },
  {
    id: 11,
    date,
    hour,
    name: "test11",
    value: "10",
    type: "cash-out"
  },
  {
    id: 12,
    date,
    hour,
    name: "test12",
    value: "10",
    type: "cash-out"
  },
  {
    id: 13,
    date,
    hour,
    name: "test13",
    value: "10",
    type: "cash-out"
  },
  {
    id: 14,
    date,
    hour,
    name: "test14",
    value: "10",
    type: "cash-out"
  },
  {
    id: 15,
    date,
    hour,
    name: "test15",
    value: "10",
    type: "cash-out"
  },
]