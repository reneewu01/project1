"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Plane,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { TravelPreferences } from '@/types/travel'
import { useTravelStore } from '@/store/travel-store'

export function Hero() {
  const [searchData, setSearchData] = useState({
    departure: '',
    destination: '',
    departureDate: '',
    travelers: 1
  })
  
  const { setPreferences } = useTravelStore()

  const handleSearch = () => {
    const preferences: TravelPreferences = {
      departure: searchData.departure,
      destination: searchData.destination,
      travelDays: 7, // 預設7天
      departureDate: searchData.departureDate,
      travelers: {
        adults: searchData.travelers,
        children: 0,
        seniors: 0
      },
      budget: {
        min: 10000,
        max: 50000,
        currency: 'TWD'
      },
      accommodation: ['hotel'],
      transportation: ['public_transport'],
      activities: ['cultural_heritage', 'food_experience'],
      specialNeeds: []
    }
    
    setPreferences(preferences)
    // 導向到行程規劃頁面
    window.location.href = '/plan'
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center space-y-8">
          {/* 主標題 */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Sparkles className="h-6 w-6" />
              <span className="text-sm font-medium">AI 智能旅遊規劃</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              探索世界，
              <span className="text-primary">智慧規劃</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              讓 AI 為您量身打造完美旅程，從行程規劃到住宿推薦，一站式解決所有旅遊需求
            </p>
          </div>

          {/* 搜尋表單 */}
          <Card className="max-w-4xl mx-auto p-6 shadow-lg">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="出發地"
                    value={searchData.departure}
                    onChange={(e) => setSearchData({...searchData, departure: e.target.value})}
                    className="pl-10"
                  />
                </div>
                
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="目的地"
                    value={searchData.destination}
                    onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                    className="pl-10"
                  />
                </div>
                
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    value={searchData.departureDate}
                    onChange={(e) => setSearchData({...searchData, departureDate: e.target.value})}
                    className="pl-10"
                  />
                </div>
                
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="旅客人數"
                    value={searchData.travelers}
                    onChange={(e) => setSearchData({...searchData, travelers: parseInt(e.target.value) || 1})}
                    className="pl-10"
                    min="1"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSearch}
                className="w-full mt-4 h-12 text-lg"
                size="lg"
              >
                <Search className="mr-2 h-5 w-5" />
                開始規劃旅程
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          {/* 特色標籤 */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4" />
              <span>AI 智能推薦</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-500/10 text-green-600 px-4 py-2 rounded-full">
              <Plane className="h-4 w-4" />
              <span>即時預訂</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-500/10 text-purple-600 px-4 py-2 rounded-full">
              <MapPin className="h-4 w-4" />
              <span>全球目的地</span>
            </div>
            <div className="flex items-center space-x-2 bg-orange-500/10 text-orange-600 px-4 py-2 rounded-full">
              <Users className="h-4 w-4" />
              <span>個人化服務</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 