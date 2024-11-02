export interface LocationSearchCriteria {
  pageNo: number;
  pageSize: number;
  sortBy: string;
  sortDir: string;
  status: string[];
  searchText: string | undefined;
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
  bannerImage: string;
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
  bannerImage: string;
}

export interface LocationResponse {
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
  bannerImage: string;
  brand: BrandResponse;
  category: CategoryResponse[];
  tag: TagResponse[];
}

export interface BrandResponse {
  id: number;
  name: string;
  status: string;
  image: string;
  createBy: string;
}

export interface CategoryResponse {
  id: number;
  name: string;
  status: string;
  image: string;
  createBy: string;
}

export interface TagResponse {
  id: number;
  name: string;
}

export interface LocationRequest {
  id: number;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  description: string;
  image: string;
  status: string;
  userId: number;
  brandId: number;
  categoryId: number[];
  tagId: number[];
}
