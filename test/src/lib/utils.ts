import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 格式化貨幣
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// 格式化日期
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// 獲取活動圖標
export function getActivityIcon(type: string): string {
  const icons: Record<string, string> = {
    'sightseeing': '🏛️',
    'shopping': '🛍️',
    'entertainment': '🎭',
    'outdoor': '🏞️',
    'cultural': '🏺',
    'adventure': '🧗',
    'relaxation': '🧘',
    'food': '🍽️',
    'nightlife': '🌃',
    'default': '📍'
  }
  return icons[type] || icons.default
}

// 獲取住宿圖標
export function getAccommodationIcon(type: string): string {
  const icons: Record<string, string> = {
    'hotel': '🏨',
    'hostel': '🏠',
    'resort': '🏖️',
    'apartment': '🏢',
    'guesthouse': '🏡',
    'camping': '⛺',
    'default': '🛏️'
  }
  return icons[type] || icons.default
}

// 獲取交通圖標
export function getTransportationIcon(type: string): string {
  const icons: Record<string, string> = {
    'plane': '✈️',
    'train': '🚄',
    'bus': '🚌',
    'car': '🚗',
    'bike': '🚲',
    'walk': '🚶',
    'subway': '🚇',
    'taxi': '🚕',
    'boat': '⛴️',
    'default': '🚗'
  }
  return icons[type] || icons.default
}
