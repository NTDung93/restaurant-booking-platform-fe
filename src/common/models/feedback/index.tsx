export interface LocationFeedbackResponse {
  id: number;
  content: string;
  rating: number;
  feedbackDate: string;
  numberOfGuest: number;
  image: string;
  locationName: string;
  locationBookingId: number;
  userName: string;
}

export interface LocationFeedbackRequest {
  id: number;
  content: string;
  rating: number;
  image: string;
  locationBookingId: number;
}
