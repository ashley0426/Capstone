// ██╗░░░░░██╗███╗░░██╗██╗░░██╗░██████╗
// ██║░░░░░██║████╗░██║██║░██╔╝██╔════╝
// ██║░░░░░██║██╔██╗██║█████═╝░╚█████╗░
// ██║░░░░░██║██║╚████║██╔═██╗░░╚═══██╗
// ███████╗██║██║░╚███║██║░╚██╗██████╔╝
// ╚══════╝╚═╝╚═╝░░╚══╝╚═╝░░╚═╝╚═════╝░

// https://transform.tools/json-to-typescript



export interface ToursRoot {
    response: ToursResponse
    search: ToursSearch
    tours: Tour[]; 
}

export interface ToursResponse {
    phrase: string
    status: number
    timestamp: number
}

export interface ToursSearch {
    results: number
}
export interface CityCountry {
    city_name: string;
    country_name: string;
}
export interface Tour {
    booking_url: string;
    categories: string[];
    currency: string;
    description: string;
    destination_cities: string[];
    end_city: CityCountry;
    id: string;
    images: string[];
    max_group: number;
    price_total: number;
    rating: number;
    start_city: CityCountry;
    thumbnail_image: string;
    tour_length_days: number;
    tour_name: string;
}