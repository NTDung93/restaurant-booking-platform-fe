export interface Food {
  id: number;
  name: string;
  price: number;
  description: string;
  status: string;
  image: string;
  quantity: number;
}

export interface AddFood {
  id: number;
  name: string;
  price: number;
  description: string;
  status: string;
  image: string;
  foodCategoryId: number;
  locationId: number;
}
