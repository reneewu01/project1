"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  Hotel,
  Car,
  Heart,
  Shield,
  Sparkles
} from 'lucide-react'
import { TravelPreferences, AccommodationType, TransportationType, ActivityType, SpecialNeed } from '@/types/travel'
import { useTravelStore } from '@/store/travel-store'

const formSchema = z.object({
  departure: z.string().min(1, '請輸入出發地'),
  destination: z.string().min(1, '請輸入目的地'),
  departureDate: z.string().min(1, '請選擇出發日期'),
  travelDays: z.number().min(1, '請輸入旅遊天數').max(30, '旅遊天數不能超過30天'),
  adults: z.number().min(1, '至少需要1位成人'),
  children: z.number().min(0, '兒童人數不能為負數'),
  seniors: z.number().min(0, '長者人數不能為負數'),
  budgetMin: z.number().min(1000, '最低預算為1,000元'),
  budgetMax: z.number().min(1000, '最高預算為1,000元'),
  currency: z.string().default('TWD')
})

type FormData = z.infer<typeof formSchema>

const accommodationOptions: { value: AccommodationType; label: string; icon: string }[] = [
  { value: 'hostel', label: '青年旅館', icon: '🏠' },
  { value: 'guesthouse', label: '民宿', icon: '🏡' },
  { value: 'hotel', label: '飯店', icon: '🏨' },
  { value: 'resort', label: '度假村', icon: '🏖️' },
  { value: 'villa', label: '別墅', icon: '🏰' }
]

const transportationOptions: { value: TransportationType; label: string; icon: string }[] = [
  { value: 'public_transport', label: '大眾運輸', icon: '🚌' },
  { value: 'car_rental', label: '租車自駕', icon: '🚗' },
  { value: 'private_car', label: '私人專車', icon: '🚙' },
  { value: 'charter_service', label: '包車服務', icon: '🚐' }
]

const activityOptions: { value: ActivityType; label: string; icon: string }[] = [
  { value: 'cultural_heritage', label: '文化遺產', icon: '🏛️' },
  { value: 'nature_landscape', label: '自然風光', icon: '🏔️' },
  { value: 'outdoor_adventure', label: '戶外探險', icon: '🏃' },
  { value: 'food_experience', label: '美食體驗', icon: '🍽️' },
  { value: 'photography', label: '攝影', icon: '📸' },
  { value: 'shopping', label: '購物', icon: '🛍️' },
  { value: 'nightlife', label: '夜生活', icon: '🌃' },
  { value: 'hot_springs', label: '溫泉', icon: '♨️' },
  { value: 'beach', label: '海灘', icon: '🏖️' },
  { value: 'skiing', label: '滑雪', icon: '⛷️' }
]

const specialNeedOptions: { value: SpecialNeed; label: string; icon: string }[] = [
  { value: 'accessibility', label: '無障礙設施', icon: '♿' },
  { value: 'dietary_restrictions', label: '飲食限制', icon: '🥗' },
  { value: 'guide_service', label: '導遊服務', icon: '👨‍💼' },
  { value: 'pet_friendly', label: '寵物友善', icon: '🐕' },
  { value: 'child_facilities', label: '兒童設施', icon: '👶' },
  { value: 'elderly_friendly', label: '長者友善', icon: '👴' },
  { value: 'language_requirements', label: '語言需求', icon: '🗣️' }
]

export function TravelPlanForm() {
  const [selectedAccommodations, setSelectedAccommodations] = useState<AccommodationType[]>(['hotel'])
  const [selectedTransportation, setSelectedTransportation] = useState<TransportationType[]>(['public_transport'])
  const [selectedActivities, setSelectedActivities] = useState<ActivityType[]>(['cultural_heritage', 'food_experience'])
  const [selectedSpecialNeeds, setSelectedSpecialNeeds] = useState<SpecialNeed[]>([])
  
  const { setPreferences, setIsLoading } = useTravelStore()
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departure: '',
      destination: '',
      departureDate: '',
      travelDays: 7,
      adults: 2,
      children: 0,
      seniors: 0,
      budgetMin: 10000,
      budgetMax: 50000,
      currency: 'TWD'
    }
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    
    const preferences: TravelPreferences = {
      departure: data.departure,
      destination: data.destination,
      travelDays: data.travelDays,
      departureDate: data.departureDate,
      travelers: {
        adults: data.adults,
        children: data.children,
        seniors: data.seniors
      },
      budget: {
        min: data.budgetMin,
        max: data.budgetMax,
        currency: data.currency
      },
      accommodation: selectedAccommodations,
      transportation: selectedTransportation,
      activities: selectedActivities,
      specialNeeds: selectedSpecialNeeds
    }
    
    setPreferences(preferences)
    
    // 模擬 AI 處理時間
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const toggleAccommodation = (type: AccommodationType) => {
    setSelectedAccommodations(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const toggleTransportation = (type: TransportationType) => {
    setSelectedTransportation(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const toggleActivity = (type: ActivityType) => {
    setSelectedActivities(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const toggleSpecialNeed = (type: SpecialNeed) => {
    setSelectedSpecialNeeds(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>旅遊偏好設定</span>
        </CardTitle>
        <CardDescription>
          填寫您的旅遊偏好，AI 將為您生成最佳行程
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* 基本資訊 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">基本資訊</h3>
            
            <div className="space-y-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="出發地"
                  {...form.register('departure')}
                  className="pl-10"
                />
                {form.formState.errors.departure && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.departure.message}</p>
                )}
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="目的地"
                  {...form.register('destination')}
                  className="pl-10"
                />
                {form.formState.errors.destination && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.destination.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    {...form.register('departureDate')}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="旅遊天數"
                    {...form.register('travelDays', { valueAsNumber: true })}
                    className="pl-10"
                    min="1"
                    max="30"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 旅客人數 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>旅客人數</span>
            </h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium">成人</label>
                <Input
                  type="number"
                  {...form.register('adults', { valueAsNumber: true })}
                  min="1"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">兒童</label>
                <Input
                  type="number"
                  {...form.register('children', { valueAsNumber: true })}
                  min="0"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">長者</label>
                <Input
                  type="number"
                  {...form.register('seniors', { valueAsNumber: true })}
                  min="0"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* 預算範圍 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>預算範圍</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">最低預算</label>
                <Input
                  type="number"
                  {...form.register('budgetMin', { valueAsNumber: true })}
                  min="1000"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">最高預算</label>
                <Input
                  type="number"
                  {...form.register('budgetMax', { valueAsNumber: true })}
                  min="1000"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* 住宿偏好 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center space-x-2">
              <Hotel className="h-5 w-5" />
              <span>住宿偏好</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {accommodationOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={selectedAccommodations.includes(option.value) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleAccommodation(option.value)}
                  className="justify-start"
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 交通方式 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center space-x-2">
              <Car className="h-5 w-5" />
              <span>交通方式</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {transportationOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={selectedTransportation.includes(option.value) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTransportation(option.value)}
                  className="justify-start"
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 興趣活動 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span>興趣活動</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {activityOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={selectedActivities.includes(option.value) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleActivity(option.value)}
                  className="justify-start"
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 特殊需求 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>特殊需求</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {specialNeedOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={selectedSpecialNeeds.includes(option.value) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSpecialNeed(option.value)}
                  className="justify-start"
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Sparkles className="mr-2 h-5 w-5" />
            生成智能行程
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 