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
  Bookmark,
  Clock,
  Utensils,
  Bed,
  Plane
} from 'lucide-react'
import { formatCurrency, formatDate, getActivityIcon, getAccommodationIcon, getTransportationIcon } from '@/lib/utils'
import { ShareModal } from '@/components/share-modal'

interface PlanResultsProps {
  shareId?: string
}

export function PlanResults({ shareId }: PlanResultsProps) {
  const { preferences, isLoading, currentPlan } = useTravelStore()

  // 如果有分享ID，顯示分享的行程
  if (shareId) {
    const sharedPlan = {
      id: shareId,
      title: '東京文化之旅',
      destination: '東京',
      duration: 5,
      budget: 50000,
      totalCost: 45000,
      travelers: {
        adults: 2,
        children: 0,
        seniors: 0
      },
      itinerary: [
        {
          day: 1,
          date: '2024-03-15',
          activities: [
            {
              id: 'act-1-1',
              name: '抵達東京',
              description: '抵達成田機場，辦理入住手續',
              type: 'sightseeing',
              duration: 120,
              cost: 0,
              rating: 4.5
            },
            {
              id: 'act-1-2',
              name: '淺草寺參觀',
              description: '參觀東京最古老的寺廟',
              type: 'cultural',
              duration: 180,
              cost: 0,
              rating: 4.8
            }
          ],
          meals: [
            {
              id: 'meal-1-1',
              name: '拉麵午餐',
              description: '品嚐正宗日式拉麵',
              type: 'lunch',
              cost: 1200
            }
          ],
          accommodation: {
            id: 'acc-1',
            name: '東京希爾頓酒店',
            type: 'hotel',
            cost: 8000,
            rating: 4.6
          },
          transportation: [
            {
              id: 'trans-1-1',
              name: '機場快線',
              type: 'train',
              cost: 3000,
              duration: 60
            }
          ]
        }
      ]
    }

    return (
      <div className="space-y-6">
        {/* 行程概覽 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{sharedPlan.title}</CardTitle>
                <CardDescription>
                  分享的智能旅遊行程
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  收藏
                </Button>
                <ShareModal planData={sharedPlan}>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    分享
                  </Button>
                </ShareModal>
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
                  <p className="text-sm font-medium">{sharedPlan.duration}天</p>
                  <p className="text-xs text-muted-foreground">旅遊天數</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {sharedPlan.travelers.adults + sharedPlan.travelers.children + sharedPlan.travelers.seniors}人
                  </p>
                  <p className="text-xs text-muted-foreground">旅客人數</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{formatCurrency(sharedPlan.totalCost)}</p>
                  <p className="text-xs text-muted-foreground">總預算</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{sharedPlan.destination}</p>
                  <p className="text-xs text-muted-foreground">目的地</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 每日行程 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">每日行程</h3>
          {sharedPlan.itinerary.map((day) => (
            <Card key={day.day} className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {day.day}
                  </span>
                  <span>第 {day.day} 天 - {formatDate(day.date)}</span>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {day.activities.reduce((sum, act) => sum + act.duration, 0)}分鐘
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 活動 */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    活動安排
                  </h4>
                  <div className="space-y-3">
                    {day.activities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                        <span className="text-2xl mt-1">{getActivityIcon(activity.type)}</span>
                        <div className="flex-1">
                          <p className="font-medium">{activity.name}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>⏱️ {activity.duration}分鐘</span>
                            <span>💰 {formatCurrency(activity.cost)}</span>
                            <span>⭐ {activity.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 餐飲 */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Utensils className="h-4 w-4 mr-2" />
                    餐飲安排
                  </h4>
                  <div className="space-y-3">
                    {day.meals.map((meal) => (
                      <div key={meal.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                        <span className="text-2xl mt-1">🍽️</span>
                        <div className="flex-1">
                          <p className="font-medium">{meal.name}</p>
                          <p className="text-sm text-muted-foreground">{meal.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>💰 {formatCurrency(meal.cost)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 住宿 */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Bed className="h-4 w-4 mr-2" />
                    住宿安排
                  </h4>
                  <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <span className="text-2xl mt-1">{getAccommodationIcon(day.accommodation.type)}</span>
                    <div className="flex-1">
                      <p className="font-medium">{day.accommodation.name}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>💰 {formatCurrency(day.accommodation.cost)}</span>
                        <span>⭐ {day.accommodation.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 交通 */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Plane className="h-4 w-4 mr-2" />
                    交通安排
                  </h4>
                  <div className="space-y-3">
                    {day.transportation.map((transport) => (
                      <div key={transport.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                        <span className="text-2xl mt-1">{getTransportationIcon(transport.type)}</span>
                        <div className="flex-1">
                          <p className="font-medium">{transport.name}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>⏱️ {transport.duration}分鐘</span>
                            <span>💰 {formatCurrency(transport.cost)}</span>
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
      </div>
    )
  }

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

  // 生成完整的每日行程數據
  const generateDailyItinerary = () => {
    const days = []
    const startDate = new Date(preferences.departureDate)
    
    for (let day = 1; day <= preferences.travelDays; day++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + day - 1)
      
      const dayPlan = {
        day,
        date: currentDate.toISOString().split('T')[0],
        activities: generateActivities(day),
        meals: generateMeals(day),
        accommodation: generateAccommodation(day),
        transportation: generateTransportation(day)
      }
      days.push(dayPlan)
    }
    
    return days
  }

  const generateActivities = (day: number) => {
    const activities = []
    
    if (day === 1) {
      // 第一天：抵達和市區觀光
      activities.push(
        {
          id: `act-${day}-1`,
          name: '抵達目的地',
          description: '抵達機場，辦理入住手續，休息調整',
          location: preferences.destination,
          duration: 120,
          cost: 0,
          type: 'cultural_heritage' as const,
          images: [],
          rating: 0,
          reviews: []
        },
        {
          id: `act-${day}-2`,
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
      )
    } else if (day === 2) {
      // 第二天：深度文化體驗
      activities.push(
        {
          id: `act-${day}-1`,
          name: '文化遺產探索',
          description: '參觀當地重要文化遺產和歷史建築',
          location: preferences.destination,
          duration: 180,
          cost: 1500,
          type: 'cultural_heritage' as const,
          images: [],
          rating: 4.7,
          reviews: []
        },
        {
          id: `act-${day}-2`,
          name: '當地美食體驗',
          description: '品嚐當地特色美食，了解飲食文化',
          location: preferences.destination,
          duration: 120,
          cost: 1200,
          type: 'food_experience' as const,
          images: [],
          rating: 4.6,
          reviews: []
        }
      )
    } else if (day === 3) {
      // 第三天：自然風光
      activities.push(
        {
          id: `act-${day}-1`,
          name: '自然景觀遊覽',
          description: '探索當地自然風光和戶外景點',
          location: preferences.destination,
          duration: 300,
          cost: 1800,
          type: 'nature_landscape' as const,
          images: [],
          rating: 4.8,
          reviews: []
        },
        {
          id: `act-${day}-2`,
          name: '戶外探險活動',
          description: '參與戶外探險活動，體驗刺激冒險',
          location: preferences.destination,
          duration: 240,
          cost: 2500,
          type: 'outdoor_adventure' as const,
          images: [],
          rating: 4.9,
          reviews: []
        }
      )
    } else if (day === 4) {
      // 第四天：購物和休閒
      activities.push(
        {
          id: `act-${day}-1`,
          name: '購物體驗',
          description: '在當地特色商店和市集購物',
          location: preferences.destination,
          duration: 180,
          cost: 1000,
          type: 'shopping' as const,
          images: [],
          rating: 4.4,
          reviews: []
        },
        {
          id: `act-${day}-2`,
          name: '休閒放鬆',
          description: '享受當地休閒設施，放鬆身心',
          location: preferences.destination,
          duration: 120,
          cost: 800,
          type: 'food_experience' as const,
          images: [],
          rating: 4.3,
          reviews: []
        }
      )
    } else {
      // 其他天數：混合活動
      const activityTypes = ['cultural_heritage', 'nature_landscape', 'food_experience', 'shopping', 'photography']
      const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)]
      
      activities.push(
        {
          id: `act-${day}-1`,
          name: `第${day}天特色活動`,
          description: `體驗當地特色活動和文化體驗`,
          location: preferences.destination,
          duration: 240,
          cost: 1500 + (day * 100),
          type: randomType as any,
          images: [],
          rating: 4.5 + (Math.random() * 0.4),
          reviews: []
        }
      )
    }
    
    return activities
  }

  const generateMeals = (day: number) => {
    const meals = []
    
    // 早餐
    meals.push({
      id: `meal-${day}-1`,
      name: '飯店早餐',
      type: 'breakfast' as const,
      location: preferences.destination,
      cuisine: '國際美食',
      price: 300,
      dietaryOptions: ['素食', '無麩質']
    })
    
    // 午餐
    meals.push({
      id: `meal-${day}-2`,
      name: '當地特色餐廳',
      type: 'lunch' as const,
      location: preferences.destination,
      cuisine: '當地特色',
      price: 600,
      dietaryOptions: ['素食', '無麩質', '清真']
    })
    
    // 晚餐
    meals.push({
      id: `meal-${day}-3`,
      name: '精選晚餐',
      type: 'dinner' as const,
      location: preferences.destination,
      cuisine: '精緻料理',
      price: 800,
      dietaryOptions: ['素食', '無麩質', '海鮮']
    })
    
    return meals
  }

  const generateAccommodation = (day: number) => {
    return {
      id: `acc-${day}`,
      name: day === 1 ? '機場附近飯店' : '市中心精選飯店',
      type: 'hotel' as const,
      location: preferences.destination,
      price: day === 1 ? 2800 : 2500,
      rating: 4.3 + (Math.random() * 0.4),
      amenities: ['WiFi', '健身房', '餐廳', '游泳池'],
      images: [],
      reviews: []
    }
  }

  const generateTransportation = (day: number) => {
    const transportation = []
    
    if (day === 1) {
      // 第一天：機場到市區
      transportation.push({
        id: `trans-${day}-1`,
        type: 'public_transport' as const,
        provider: '機場快線',
        from: '機場',
        to: '市區',
        departureTime: '14:00',
        arrivalTime: '14:30',
        price: 300,
        bookingUrl: '#'
      })
    } else if (day === preferences.travelDays) {
      // 最後一天：市區到機場
      transportation.push({
        id: `trans-${day}-1`,
        type: 'public_transport' as const,
        provider: '機場快線',
        from: '市區',
        to: '機場',
        departureTime: '10:00',
        arrivalTime: '10:30',
        price: 300,
        bookingUrl: '#'
      })
    } else {
      // 其他天數：市區交通
      transportation.push({
        id: `trans-${day}-1`,
        type: 'public_transport' as const,
        provider: '當地交通',
        from: '飯店',
        to: '景點',
        departureTime: '09:00',
        arrivalTime: '09:15',
        price: 150,
        bookingUrl: '#'
      })
    }
    
    return transportation
  }

  const mockPlan = {
    id: 'plan-1',
    title: `${preferences.destination} ${preferences.travelDays}天精選行程`,
    destination: preferences.destination,
    duration: preferences.travelDays,
    budget: preferences.budget,
    totalCost: 35000,
    itinerary: generateDailyItinerary(),
    accommodations: [],
    transportation: [],
    activities: [],
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
              <ShareModal planData={mockPlan}>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  分享
                </Button>
              </ShareModal>
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
          <Card key={day.day} className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {day.day}
                </span>
                <span>第 {day.day} 天 - {formatDate(day.date)}</span>
                <span className="text-sm text-muted-foreground ml-auto">
                  {day.activities.reduce((sum, act) => sum + act.duration, 0)}分鐘
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 活動 */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  活動安排
                </h4>
                <div className="space-y-3">
                  {day.activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                      <span className="text-2xl mt-1">{getActivityIcon(activity.type)}</span>
                      <div className="flex-1">
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>⏱️ {activity.duration}分鐘</span>
                          <span>💰 {formatCurrency(activity.cost)}</span>
                          <span>⭐ {activity.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 餐飲 */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Utensils className="h-4 w-4 mr-2" />
                  餐飲安排
                </h4>
                <div className="space-y-2">
                  {day.meals.map((meal) => (
                    <div key={meal.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <span className="text-2xl">🍽️</span>
                      <div className="flex-1">
                        <p className="font-medium">{meal.name}</p>
                        <p className="text-sm text-muted-foreground">{meal.cuisine}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                          <span className="capitalize">{meal.type}</span>
                          <span>💰 {formatCurrency(meal.price)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 住宿 */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Bed className="h-4 w-4 mr-2" />
                  住宿安排
                </h4>
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <span className="text-2xl">{getAccommodationIcon(day.accommodation.type)}</span>
                  <div className="flex-1">
                    <p className="font-medium">{day.accommodation.name}</p>
                    <p className="text-sm text-muted-foreground">{day.accommodation.location}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                      <span>⭐ {day.accommodation.rating.toFixed(1)}</span>
                      <span>💰 {formatCurrency(day.accommodation.price)}/晚</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 交通 */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Plane className="h-4 w-4 mr-2" />
                  交通安排
                </h4>
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
                          <span>🕐 {trans.departureTime} - {trans.arrivalTime}</span>
                          <span>💰 {formatCurrency(trans.price)}</span>
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