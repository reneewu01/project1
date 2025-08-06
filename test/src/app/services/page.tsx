import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plane, 
  Hotel, 
  Car, 
  Users,
  Shield,
  MapPin,
  Star,
  Clock,
  DollarSign,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: 'flights',
    name: '機票預訂',
    icon: Plane,
    description: '全球航空公司機票預訂，包含即時價格比較和最佳路線推薦',
    features: [
      '即時價格比較',
      '最佳路線推薦',
      '靈活日期搜尋',
      '行李追蹤',
      '24/7 客服支援'
    ],
    price: '從 NT$ 2,000 起',
    rating: 4.8,
    reviews: 15420,
    color: 'text-blue-600'
  },
  {
    id: 'hotels',
    name: '住宿預訂',
    icon: Hotel,
    description: '全球超過 200 萬間住宿選擇，從經濟型到豪華型應有盡有',
    features: [
      '200萬+ 住宿選擇',
      '真實用戶評價',
      '即時房價查詢',
      '免費取消政策',
      '會員專屬優惠'
    ],
    price: '從 NT$ 500 起',
    rating: 4.7,
    reviews: 23450,
    color: 'text-green-600'
  },
  {
    id: 'car-rental',
    name: '租車服務',
    icon: Car,
    description: '全球租車服務，支援異地還車和各種車型選擇',
    features: [
      '全球租車網路',
      '異地還車服務',
      '全險保障',
      'GPS 導航',
      '兒童安全座椅'
    ],
    price: '從 NT$ 800 起',
    rating: 4.6,
    reviews: 8920,
    color: 'text-purple-600'
  },
  {
    id: 'tours',
    name: '導遊服務',
    icon: Users,
    description: '專業導遊服務，提供多語言導覽和客製化行程',
    features: [
      '專業認證導遊',
      '多語言服務',
      '客製化行程',
      '小團精緻遊',
      '文化深度體驗'
    ],
    price: '從 NT$ 1,500 起',
    rating: 4.9,
    reviews: 5670,
    color: 'text-orange-600'
  },
  {
    id: 'insurance',
    name: '旅遊保險',
    icon: Shield,
    description: '全方位旅遊保險，保障您的旅程安全',
    features: [
      '醫療費用保障',
      '行李遺失賠償',
      '航班延誤補償',
      '緊急醫療協助',
      '24小時救援服務'
    ],
    price: '從 NT$ 200 起',
    rating: 4.8,
    reviews: 12340,
    color: 'text-red-600'
  },
  {
    id: 'transfers',
    name: '機場接送',
    icon: MapPin,
    description: '機場接送服務，提供舒適安全的交通選擇',
    features: [
      '準時接送服務',
      '多種車型選擇',
      '兒童安全座椅',
      '行李協助',
      '即時追蹤'
    ],
    price: '從 NT$ 300 起',
    rating: 4.7,
    reviews: 7890,
    color: 'text-teal-600'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* 頁面標題 */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">
            全方位旅遊服務
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            從機票預訂到住宿安排，從租車服務到導遊陪同，我們提供一站式旅遊服務
          </p>
        </div>

        {/* 服務網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{service.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({service.reviews.toLocaleString()} 評價)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">服務特色</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-lg font-bold text-primary">{service.price}</p>
                    <p className="text-xs text-muted-foreground">每晚/每人</p>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/services/${service.id}`}>
                      了解更多
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 服務優勢 */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">為什麼選擇我們的服務？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">最優價格</h3>
              <p className="text-sm text-muted-foreground">
                保證提供市場最優惠價格，如有更便宜價格，我們將補償差額
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">安全保障</h3>
              <p className="text-sm text-muted-foreground">
                所有服務都經過嚴格篩選，確保安全可靠
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">24/7 支援</h3>
              <p className="text-sm text-muted-foreground">
                全天候客服支援，隨時為您解決問題
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">用戶評價</h3>
              <p className="text-sm text-muted-foreground">
                超過 50 萬用戶的正面評價，值得信賴
              </p>
            </div>
          </div>
        </div>

        {/* 聯絡我們 */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">需要客製化服務？</h3>
              <p className="text-muted-foreground mb-6">
                如果您有特殊需求或想要客製化服務，請聯絡我們的專業團隊
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  立即諮詢
                </Button>
                <Button variant="outline" size="lg">
                  查看更多服務
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 