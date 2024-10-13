export interface foodBookings {
  foodId: number;
  quantity: number;
}
export interface Booking {
  id: number;
  name: string;
  address: string;
  phone: string;
  bookingDate: string;
  bookingTime: string;
  numberOfAdult: number;
  numberOfChildren: number;
  locationId: number;
  voucherId: number;
  promotionId: number;
  foodBookings: foodBookings[];
}
