export interface TravelPreferences {
  departure: string;
  destination: string;
  travelDays: number;
  departureDate: string;
  travelers: {
    adults: number;
    children: number;
    seniors: number;
  };
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  accommodation: AccommodationType[];
  transportation: TransportationType[];
  activities: ActivityType[];
  specialNeeds: SpecialNeed[];
}

export type AccommodationType = 
  | 'hostel' 
  | 'guesthouse' 
  | 'hotel' 
  | 'resort' 
  | 'villa';

export type TransportationType = 
  | 'public_transport' 
  | 'car_rental' 
  | 'private_car' 
  | 'charter_service';

export type ActivityType = 
  | 'cultural_heritage'
  | 'nature_landscape'
  | 'outdoor_adventure'
  | 'food_experience'
  | 'photography'
  | 'shopping'
  | 'nightlife'
  | 'hot_springs'
  | 'beach'
  | 'skiing';

export type SpecialNeed = 
  | 'accessibility'
  | 'dietary_restrictions'
  | 'guide_service'
  | 'pet_friendly'
  | 'child_facilities'
  | 'elderly_friendly'
  | 'language_requirements';

export interface TravelPlan {
  id: string;
  title: string;
  destination: string;
  duration: number;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  itinerary: DayPlan[];
  accommodations: Accommodation[];
  transportation: Transportation[];
  activities: Activity[];
  createdAt: string;
  updatedAt: string;
}

export interface DayPlan {
  day: number;
  date: string;
  activities: Activity[];
  meals: Meal[];
  accommodation: Accommodation;
  transportation: Transportation[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  duration: number;
  cost: number;
  type: ActivityType;
  images: string[];
  rating: number;
  reviews: Review[];
}

export interface Accommodation {
  id: string;
  name: string;
  type: AccommodationType;
  location: string;
  price: number;
  rating: number;
  amenities: string[];
  images: string[];
  reviews: Review[];
}

export interface Transportation {
  id: string;
  type: TransportationType;
  provider: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  bookingUrl?: string;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  location: string;
  cuisine: string;
  price: number;
  dietaryOptions: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface ServiceProvider {
  id: string;
  name: string;
  type: 'travel_agency' | 'hotel' | 'car_rental' | 'guide_service';
  location: string;
  rating: number;
  reviews: Review[];
  services: string[];
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  pricing: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface WeatherInfo {
  date: string;
  temperature: {
    min: number;
    max: number;
    unit: 'celsius' | 'fahrenheit';
  };
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  type: 'emergency' | 'important' | 'general';
  phone: string;
  email?: string;
  location: string;
  language: string[];
  description: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: 'clothing' | 'electronics' | 'toiletries' | 'documents' | 'accessories';
  essential: boolean;
  seasonal: boolean;
  destinationSpecific: boolean;
  activitySpecific: boolean;
}

export interface TravelTip {
  id: string;
  title: string;
  content: string;
  category: 'culture' | 'safety' | 'health' | 'language' | 'general';
  destination: string;
  tags: string[];
} 