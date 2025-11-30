import axios from "axios";
import type { ApiResponse, Filters, SearchFilters } from "@/types/search";

// Clean trailing slashes
const base = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const API_BASE = base.replace(/\/+$/, "");

// Define typed params for API
type CarApiParams = Partial<SearchFilters> & {
  page?: number;
  limit?: number;
};

export async function fetchCars(filters: SearchFilters): Promise<ApiResponse> {
  const params: CarApiParams = {
    page: filters.page || 1,
    limit: filters.limit || 12,
  };

  if (filters.car_type) params.car_type = filters.car_type;
  if (filters.category) params.category = filters.category;
  if (filters.fuel) params.fuel = filters.fuel;
  if (filters.min_price) params.min_price = filters.min_price;
  if (filters.max_price) params.max_price = filters.max_price;
  if (filters.free_cancellation) params.free_cancellation = true;
  if (filters.unlimited_mileage) params.unlimited_mileage = true;
  if (filters.sort_by) params.sort_by = filters.sort_by;
  if (filters.agency) params.agency = filters.agency;
  if (filters.pickup_location) params.pickup_location = filters.pickup_location;
  if (filters.dropoff_location) params.dropoff_location = filters.dropoff_location;

  const response = await axios.get<ApiResponse>(`${API_BASE}/cars/`, { params });
  return response.data;
}

export async function fetchFilters(): Promise<Filters> {
  const response = await axios.get<Filters>(`${API_BASE}/filters/`);
  return response.data;
}
