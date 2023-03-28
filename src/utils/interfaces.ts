export interface LoginReq {
  device_name: string
  email: string
  password: string
}

export interface PropertiesReq {
  page: 1
  per_page: number

}

//I convert the json from the http response to a ts interface
export interface LoginResponse {
  data: {
    accessToken: {
      name: string,
      abilities: [string],
      tokenable_id: number,
      tokenable_type: string,
      updated_at: string,
      created_at: string,
      id: number
    },
    plainTextToken: string
  },
  message: string

}

export interface Property {
  id: number;
  owner_id: number;
  team_id: number | null;
  crm_id: number | null;
  type: string;
  name: string;
  address: string | null;
  address_details: string | null;
  address_fields: string | null;
  latitude: number | null;
  longitude: number | null;
  bathrooms_count: number | null;
  rooms_count: number | null;
  room_management: boolean;
  reference: string | null;
  register_number: string | null;
  last_alteration: string | null;
  last_check_in: string | null;
  fee_amount: number | null;
  fee_percentage: number | null;
  purchase_price: number | null;
  refurbishment_price: number | null;
  taxes: number | null;
  register_valuation: number | null;
  management_fee: number | null;
  notary: number | null;
  management: number | null;
  current_valuation: number | null;
  state_valuation: number | null;
  cadastral_valuation: number | null;
  rental_price_index: number | null;
  constructed_area: string;
  usable_area: string | null;
  extras: string | null;
  comments: string | null;
  cleaning_expense: number | null;
  created_at: string;
  updated_at: string;
  common_area: string | null;
  active_contract_tenants_count: number;
  occupied_rooms_count: number;
  collections: string[];
  media: any[];
  tags: any[];
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PropertyResponse {
  current_page: number;
  data: Property[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}