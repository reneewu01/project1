import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'TWD'): string {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}分鐘`;
  } else if (mins === 0) {
    return `${hours}小時`;
  } else {
    return `${hours}小時${mins}分鐘`;
  }
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function getActivityIcon(type: string): string {
  const icons: Record<string, string> = {
    cultural_heritage: '🏛️',
    nature_landscape: '🏔️',
    outdoor_adventure: '🏃',
    food_experience: '🍽️',
    photography: '📸',
    shopping: '🛍️',
    nightlife: '🌃',
    hot_springs: '♨️',
    beach: '🏖️',
    skiing: '⛷️',
  };
  
  return icons[type] || '🎯';
}

export function getAccommodationIcon(type: string): string {
  const icons: Record<string, string> = {
    hostel: '🏠',
    guesthouse: '🏡',
    hotel: '🏨',
    resort: '🏖️',
    villa: '🏰',
  };
  
  return icons[type] || '🏠';
}

export function getTransportationIcon(type: string): string {
  const icons: Record<string, string> = {
    public_transport: '🚌',
    car_rental: '🚗',
    private_car: '🚙',
    charter_service: '🚐',
  };
  
  return icons[type] || '🚗';
}

export function calculateTotalCost(plan: any): number {
  let total = 0;
  
  // 住宿費用
  if (plan.accommodations) {
    total += plan.accommodations.reduce((sum: number, acc: any) => sum + acc.price, 0);
  }
  
  // 交通費用
  if (plan.transportation) {
    total += plan.transportation.reduce((sum: number, trans: any) => sum + trans.price, 0);
  }
  
  // 活動費用
  if (plan.activities) {
    total += plan.activities.reduce((sum: number, activity: any) => sum + activity.cost, 0);
  }
  
  return total;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
} 