"use client"

import { useTravelStore } from '@/store/travel-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  Hotel,
  Car,
  Heart,
  Shield,
  Sparkles,
  Loader2,
  Download,
  Share2,
  Bookmark
} from 'lucide-react'
import { formatCurrency, formatDate, getActivityIcon, getAccommodationIcon, getTransportationIcon } from '@/lib/utils'

export function PlanResults() {
  const { preferences, isLoading, currentPlan } = useTravelStore()

  if (!preferences) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>行程規劃結果</CardTitle>
          <CardDescription>
            請先填寫旅遊偏好，我們將為您生成智能行程
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>填寫左側表單開始規劃您的旅程</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI 正在為您規劃行程</CardTitle>
          <CardDescription>
            請稍候，我們正在分析您的偏好並生成最佳行程
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
            <p className="text-muted-foreground">AI 智能分析中...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // 模擬生成的行程數據
  const mockPlan = {
    id: 'plan-1',
    title: `${preferences.destination} ${preferences.travelDays}天精選行程`,
    destination: preferences.destination,
    duration: preferences.travelDays,
    budget: preferences.budget,
    totalCost: 35000,
    itinerary: [
      {
        day: 1,
        date: preferences.departureDate,
        activities: [
          {
            id: 'act-1',
            name: '抵達目的地',
            description: '抵達機場，辦理入住手續',
            location: preferences.destination,
            duration: 120,
            cost: 0,
            type: 'cultural_heritage' as const,
            images: [],
            rating: 0,
            reviews: []
          },
          {
            id: 'act-2',
            name: '市區觀光',
            description: '探索市中心景點，體驗當地文化',
            location: preferences.destination,
            duration: 240,
            cost: 2000,
            type: 'cultural_heritage' as const,
            images: [],
            rating: 4.5,
            reviews: []
          }
        ],
        meals: [
          {
            id: 'meal-1',
            name: '當地特色餐廳',
            type: 'dinner' as const,
            location: preferences.destination,
            cuisine: '當地特色',
            price: 800,
            dietaryOptions: ['素食', '無麩質']
          }
        ],
        accommodation: {
          id: 'acc-1',
          name: '精選飯店',
          type: 'hotel' as const,
          location: preferences.destination,
          price: 2500,
          rating: 4.3,
          amenities: ['WiFi', '健身房', '餐廳'],
          images: [],
          reviews: []
        },
        transportation: [
          {
            id: 'trans-1',
            type: 'public_transport' as const,
            provider: '當地交通',
            from: '機場',
            to: '市區',
            departureTime: '14:00',
            arrivalTime: '14:30',
            price: 300,
            bookingUrl: '#'
          }
        ]
      }
    ],
    accommodations: [
      {
        id: 'acc-1',
        name: '精選飯店',
        type: 'hotel' as const,
        location: preferences.destination,
        price: 2500,
        rating: 4.3,
        amenities: ['WiFi', '健身房', '餐廳'],
        images: [],
        reviews: []
      }
    ],
    transportation: [
      {
        id: 'trans-1',
        type: 'public_transport' as const,
        provider: '當地交通',
        from: '機場',
        to: '市區',
        departureTime: '14:00',
        arrivalTime: '14:30',
        price: 300,
        bookingUrl: '#'
      }
    ],
    activities: [
      {
        id: 'act-1',
        name: '市區觀光',
        description: '探索市中心景點，體驗當地文化',
        location: preferences.destination,
        duration: 240,
        cost: 2000,
        type: 'cultural_heritage' as const,
        images: [],
        rating: 4.5,
        reviews: []
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  return (
    <div className="space-y-6">
      {/* 行程概覽 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{mockPlan.title}</CardTitle>
              <CardDescription>
                根據您的偏好生成的智能行程
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                收藏
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                分享
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                下載
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{mockPlan.duration}天</p>
                <p className="text-xs text-muted-foreground">旅遊天數</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  {preferences.travelers.adults + preferences.travelers.children + preferences.travelers.seniors}人
                </p>
                <p className="text-xs text-muted-foreground">旅客人數</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{formatCurrency(mockPlan.totalCost)}</p>
                <p className="text-xs text-muted-foreground">總預算</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{mockPlan.destination}</p>
                <p className="text-xs text-muted-foreground">目的地</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 每日行程 */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">每日行程</h3>
        {mockPlan.itinerary.map((day, index) => (
          <Card key={day.day}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {day.day}
                </span>
                <span>第 {day.day} 天 - {formatDate(day.date)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 活動 */}
              <div>
                <h4 className="font-semibold mb-2">活動安排</h4>
                <div className="space-y-2">
                  {day.activities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                      <div className="flex-1">
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                          <span>{activity.duration}分鐘</span>
                          <span>{formatCurrency(activity.cost)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 餐飲 */}
              <div>
                <h4 className="font-semibold mb-2">餐飲安排</h4>
                <div className="space-y-2">
                  {day.meals.map((meal) => (
                    <div key={meal.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <span className="text-2xl">🍽️</span>
                      <div className="flex-1">
                        <p className="font-medium">{meal.name}</p>
                        <p className="text-sm text-muted-foreground">{meal.cuisine}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                          <span>{meal.type}</span>
                          <span>{formatCurrency(meal.price)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 住宿 */}
              <div>
                <h4 className="font-semibold mb-2">住宿安排</h4>
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <span className="text-2xl">{getAccommodationIcon(day.accommodation.type)}</span>
                  <div className="flex-1">
                    <p className="font-medium">{day.accommodation.name}</p>
                    <p className="text-sm text-muted-foreground">{day.accommodation.location}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                      <span>⭐ {day.accommodation.rating}</span>
                      <span>{formatCurrency(day.accommodation.price)}/晚</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 交通 */}
              <div>
                <h4 className="font-semibold mb-2">交通安排</h4>
                <div className="space-y-2">
                  {day.transportation.map((trans) => (
                    <div key={trans.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <span className="text-2xl">{getTransportationIcon(trans.type)}</span>
                      <div className="flex-1">
                        <p className="font-medium">{trans.provider}</p>
                        <p className="text-sm text-muted-foreground">
                          {trans.from} → {trans.to}
                        </p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                          <span>{trans.departureTime} - {trans.arrivalTime}</span>
                          <span>{formatCurrency(trans.price)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 預訂按鈕 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1" size="lg">
              <Sparkles className="mr-2 h-5 w-5" />
              立即預訂
            </Button>
            <Button variant="outline" className="flex-1" size="lg">
              調整行程
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 