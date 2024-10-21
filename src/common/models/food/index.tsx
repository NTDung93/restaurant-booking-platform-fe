export interface Food {
  id: number;
  name: string;
  price: number;
  description: string;
  status: string;
  image: string;
  quantity: number;
  category: FoodCategory[];
}

export interface FoodCategory {
  id: number;
  image: string;
  name: string;
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
