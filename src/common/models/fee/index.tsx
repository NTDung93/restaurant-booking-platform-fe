export interface MonthlyCommissionPayment {
  id: number;
  userId: number;
  month: number;
  year: number;
  fixedAmount: number;
  totalAmount: number;
  totalBooking: number;
  isPaid: boolean;
  paidAt: string;
  expiresAt: Date;
  transactionId: number;
}
