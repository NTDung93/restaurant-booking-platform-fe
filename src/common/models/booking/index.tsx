export interface foodBookings {
  foodId: number;
  quantity: number;
}

export interface FoodBookingResponse {
  foodId: number;
  foodName: string;
  quantity: number;
  amount: number;
}

export interface LocationBookingRequest {
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

export interface LocationBookingResponse {
  id: number;
  name: string;
  address: string;
  phone: string;
  amount: number;
  bookingDate: string;
  bookingTime: string;
  numberOfAdult: number;
  numberOfChildren: number;
  freeItem: number;
  status: string;
  foodBookings: FoodBookingResponse[];
}

export interface BookingLocation {
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
  status: string;
  amount: number;
  foodBookings: foodBookings[];
}
