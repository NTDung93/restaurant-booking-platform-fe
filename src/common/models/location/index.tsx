export interface LocationSearchCriteria {
  pageNo: number;
  pageSize: number;
  sortBy: string;
  sortDir: string;
  status: string[];
  searchText: string;
  searchNearBy: boolean;
  latitude?: number | undefined;
  longitude?: number | undefined;
}

export interface LocationResponseLazy {
  id: number;
  name: string;
  categoryName: string[];
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
export interface LocationResponseLazyDetail {
  id: number;
  name: string;
  categoryName: string[];
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
  image: string[];
}
