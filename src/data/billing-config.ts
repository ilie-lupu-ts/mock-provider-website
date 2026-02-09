export type PdfOptions = {
  showIframe: boolean;
  allowDirectDownload: boolean;
  allowBlobOpen: boolean;
};

export type AccountConfig = {
  id: string;
  name: string;
  accountNumber: string;
  pdfOptions: PdfOptions;
};

export type BillStatus = "paid" | "due" | "overdue";

export type BillRecord = {
  id: string;
  billNumber: number;
  accountId: string;
  date: string;
  dueDate: string;
  amount: number;
  status: BillStatus;
  description: string;
  pdfUrl: string;
};

const BASE_URL = import.meta.env.BASE_URL;
export const PDF_URL = `${BASE_URL}dummy.pdf`;

export const accounts: AccountConfig[] = [
  {
    id: "acc-aurora-2",
    name: "Aurora Energy Solutions",
    accountNumber: "004-221-789",
    pdfOptions: {
      showIframe: false,
      allowDirectDownload: false,
      allowBlobOpen: true,
    },
  },
  {
    id: "acc-primrose",
    name: "Primrose Energy",
    accountNumber: "001-482-118",
    pdfOptions: {
      showIframe: true,
      allowDirectDownload: true,
      allowBlobOpen: true,
    },
  },
  {
    id: "acc-northwind",
    name: "Northwind Utilities",
    accountNumber: "002-975-442",
    pdfOptions: {
      showIframe: true,
      allowDirectDownload: false,
      allowBlobOpen: false,
    },
  },
  {
    id: "acc-aurora",
    name: "Aurora Water Works",
    accountNumber: "003-644-330",
    pdfOptions: {
      showIframe: false,
      allowDirectDownload: true,
      allowBlobOpen: false,
    },
  },
];

export const bills: BillRecord[] = [
  {
    id: "bill-2401",
    billNumber: 100001,
    accountId: "acc-aurora-2",
    date: "2026-01-18",
    dueDate: "2026-02-01",
    amount: 126.4,
    status: "paid",
    description: "January electricity statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2402",
    billNumber: 100002,
    accountId: "acc-primrose",
    date: "2025-12-18",
    dueDate: "2026-01-05",
    amount: 133.82,
    status: "paid",
    description: "December electricity statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2403",
    billNumber: 100003,
    accountId: "acc-primrose",
    date: "2025-11-18",
    dueDate: "2025-12-04",
    amount: 118.09,
    status: "paid",
    description: "November electricity statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2404",
    billNumber: 100004,
    accountId: "acc-primrose",
    date: "2025-10-18",
    dueDate: "2025-11-04",
    amount: 141.55,
    status: "paid",
    description: "October electricity statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2405",
    billNumber: 100005,
    accountId: "acc-primrose",
    date: "2025-09-18",
    dueDate: "2025-10-04",
    amount: 98.72,
    status: "paid",
    description: "September electricity statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2501",
    billNumber: 100006,
    accountId: "acc-northwind",
    date: "2026-01-10",
    dueDate: "2026-02-03",
    amount: 86.2,
    status: "due",
    description: "January gas statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2502",
    billNumber: 100007,
    accountId: "acc-northwind",
    date: "2025-12-10",
    dueDate: "2026-01-03",
    amount: 79.14,
    status: "paid",
    description: "December gas statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2503",
    billNumber: 100008,
    accountId: "acc-northwind",
    date: "2025-11-10",
    dueDate: "2025-12-03",
    amount: 88.49,
    status: "paid",
    description: "November gas statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2504",
    billNumber: 100009,
    accountId: "acc-northwind",
    date: "2025-10-10",
    dueDate: "2025-11-03",
    amount: 91.33,
    status: "paid",
    description: "October gas statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2601",
    billNumber: 100010,
    accountId: "acc-aurora",
    date: "2026-01-08",
    dueDate: "2026-02-02",
    amount: 52.65,
    status: "due",
    description: "January water statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2602",
    billNumber: 100011,
    accountId: "acc-aurora",
    date: "2025-12-08",
    dueDate: "2026-01-02",
    amount: 49.88,
    status: "paid",
    description: "December water statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2603",
    billNumber: 100012,
    accountId: "acc-aurora",
    date: "2025-11-08",
    dueDate: "2025-12-02",
    amount: 51.12,
    status: "paid",
    description: "November water statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2604",
    billNumber: 100013,
    accountId: "acc-aurora",
    date: "2025-10-08",
    dueDate: "2025-11-02",
    amount: 53.44,
    status: "paid",
    description: "October water statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2605",
    billNumber: 100014,
    accountId: "acc-aurora",
    date: "2025-09-08",
    dueDate: "2025-10-02",
    amount: 47.93,
    status: "paid",
    description: "September water statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2606",
    billNumber: 100015,
    accountId: "acc-aurora",
    date: "2025-08-08",
    dueDate: "2025-09-02",
    amount: 55.18,
    status: "paid",
    description: "August water statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2607",
    billNumber: 100016,
    accountId: "acc-aurora",
    date: "2025-07-08",
    dueDate: "2025-08-02",
    amount: 54.02,
    status: "paid",
    description: "July water statement",
    pdfUrl: PDF_URL,
  },
  {
    id: "bill-2608",
    billNumber: 100017,
    accountId: "acc-aurora",
    date: "2025-06-08",
    dueDate: "2025-07-02",
    amount: 50.76,
    status: "paid",
    description: "June water statement",
    pdfUrl: PDF_URL,
  },
];

export const getAccountById = (accountId: string) =>
  accounts.find((account) => account.id === accountId);

export const getBillById = (billId: string) =>
  bills.find((bill) => bill.id === billId);

export const getSortedBills = () =>
  [...bills].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

export const PAGE_SIZE = 6;
