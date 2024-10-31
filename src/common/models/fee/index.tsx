export interface MonthlyCommissionPayment {
  id: number;
  userId: number;
  month: number;
  year: number;
  fixedAmount: number;
  totalAmount: number;
  totalBooking: number;
  paid: boolean;
  paidAt: string;
  expiredAt: string;
  transactionId: number;
}
