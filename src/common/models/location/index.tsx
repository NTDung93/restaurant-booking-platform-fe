export interface LocationSearchCriteria {
  pageNo: number;
  pageSize: number;
  sortBy: string;
  sortDir: string;
  status: string[];
  name: string;
  brandName: string;
  categoryName: string[];
  tagName: string[];
  searchNearBy: boolean;
  latitude: number | null;
  longitude: number | null;
}

export interface LocationResponseLazy {
  id: number;
  name: string;
  address: string;
  phone: string;
  onSuggest: number;
  onSale: number;
  onBanner: number;
  view: number;
  rating: number;
  latitude: number;
  longitude: number;
  distance: string;
  description: string;
  status: string;
  image: string;
}
