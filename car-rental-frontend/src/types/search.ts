export interface Car {
  id: number;
  name: string;
  type: string;
  category: string;
  fuel: string;
  transmission: string;
  image: string;
  passengers: number;
  bags: number;
}

export interface Agency {
  name: string;
  code?: string;
  logo: string;
  rating: number;
}

export interface Provider {
  name: string;
  logo: string;
}

export interface CarResult {
  car: Car;
  agency: Agency;
  provider: Provider;
  price: number;
  pickup_location: string;
  fuel_policy: string;
  free_cancellation: boolean;
  unlimited_mileage: boolean;
}

export interface ApiResponse {
  page: number;
  limit: number;
  count: number;
  total_pages: number;
  results: CarResult[];
}

export interface Filters {
  car_types: string[];
  fuel_types: string[];
  categories: string[];
  agencies: Agency[];
  price_range: {
    min: number;
    max: number;
  };
}

export interface SearchFilters {
  car_type?: string;
  category?: string;
  fuel?: string;
  agency?: string;
  min_price?: number;
  max_price?: number;
  free_cancellation?: boolean;
  pickup_location?: string;  
  dropoff_location?: string; 
  unlimited_mileage?: boolean;
  sort_by?: "price_asc" | "price_desc" | "rating" | "name";
  page?: number;
  limit?: number;
}