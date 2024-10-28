export interface AdsResponse {
  id: number;
  name: string;
  price: number;
  description: string;
  type: string;
  level: number;
  status: string;
  image: string;
  duration: number;
}

export interface AdsRegistration {
  locationId: number;
  adsId: number;
  bannerImage: string;
}

export interface AdsResponses {
  id: number;
  registrationDate: Date;
  expireDate: Date;
  status: string;
  ads: AdsResponse;
}
