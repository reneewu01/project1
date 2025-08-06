"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  Clock,
  Utensils,
  Bed,
  Plane,
  Loader2,
  ArrowLeft,
  Share2
} from 'lucide-react'
import { formatCurrency, formatDate, getActivityIcon, getAccommodationIcon, getTransportationIcon } from '@/lib/utils'
import { ShareModal } from '@/components/share-modal'
import Link from 'next/link'

interface SharedPlanData {
  id: string
  title: string
  destination: string
  duration: number
  totalCost: number
  travelers: {
    adults: number
    children: number
    seniors: number
  }
  itinerary: Array<{
    day: number
    date: string
    activities: Array<{
      id: string
      name: string
      description: string
      type: string
      duration: number
      cost: number
      rating: number
    }>
    meals: Array<{
      id: string
      name: string
      description: string
      type: string
      cost: number
    }>
    accommodation: {
      id: string
      name: string
      type: string
      cost: number
      rating: number
    }
    transportation: Array<{
      id: string
      name: string
      type: string
      cost: number
      duration: number
    }>
  }>
}

export function SharedPlanView() {
  const searchParams = useSearchParams()
  const [planData, setPlanData] = useState<SharedPlanData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const shareId = searchParams.get('share')
    
    if (!shareId) {
      setError('未找到分享的行程')
      setIsLoading(false)
      return
    }

    // 模擬從服務器獲取分享的行程數據
    const fetchSharedPlan = async () => {
      try {
        // 這裡應該是從 API 獲取數據
        // 現在使用模擬數據
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockPlan: SharedPlanData = {
          id: shareId,
          title: '東京文化之旅',
          destination: '東京',
          duration: 5,
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
        
        setPlanData(mockPlan)
      } catch (err) {
        setError('無法載入分享的行程')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSharedPlan()
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
          <p className="text-muted-foreground">載入分享的行程中...</p>
        </div>
      </div>
    )
  }

  if (error || !planData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">行程載入失敗</h1>
            <p className="text-muted-foreground">{error || '無法找到分享的行程'}</p>
          </div>
          <Link href="/plan">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回行程規劃
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* 頁面標題和操作 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              分享的行程
            </h1>
            <p className="text-xl text-muted-foreground">
              查看朋友分享的旅遊行程
            </p>
          </div>
          <div className="flex space-x-2">
            <Link href="/plan">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                規劃自己的行程
              </Button>
            </Link>
            <ShareModal planData={planData}>
              <Button>
                <Share2 className="h-4 w-4 mr-2" />
                分享
              </Button>
            </ShareModal>
          </div>
        </div>

        {/* 行程概覽 */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{planData.title}</CardTitle>
                <CardDescription>
                  分享的智能旅遊行程
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{planData.duration}天</p>
                  <p className="text-xs text-muted-foreground">旅遊天數</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {planData.travelers.adults + planData.travelers.children + planData.travelers.seniors}人
                  </p>
                  <p className="text-xs text-muted-foreground">旅客人數</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{formatCurrency(planData.totalCost)}</p>
                  <p className="text-xs text-muted-foreground">總預算</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{planData.destination}</p>
                  <p className="text-xs text-muted-foreground">目的地</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 每日行程 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">每日行程</h3>
          {planData.itinerary.map((day) => (
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
    </div>
  )
} 