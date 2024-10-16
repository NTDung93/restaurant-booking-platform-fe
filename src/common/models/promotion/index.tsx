export interface Promotion {
  id: number;
  title: string;
  description: string;
  status: string;
  promotionType: string;
  image: string;
  startDate: string;
  endDate: string;
  discountValue: number;
  maxDiscount: number;
  freeItem: string;
  minBill: number;
  minPeople: number;
  startHourTime: string;
  endHourTime: string;
  usable: boolean;
}
