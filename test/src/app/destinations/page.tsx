import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  MapPin, 
  Star, 
  Filter,
  Globe,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const destinations = [
  {
    id: 'lijiang',
    name: '雲南麗江',
    region: '亞洲',
    country: '中國',
    description: '探索世界文化遺產古城，體驗納西族文化',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 1247,
    price: 'NT$ 15,000',
    duration: '5-7天',
    tags: ['文化遺產', '自然風光', '美食'],
    highlights: ['麗江古城', '玉龍雪山', '瀘沽湖']
  },
  {
    id: 'tokyo',
    name: '日本東京',
    region: '亞洲',
    country: '日本',
    description: '現代與傳統的完美融合，體驗日本獨特文化',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 2156,
    price: 'NT$ 25,000',
    duration: '6-8天',
    tags: ['現代都市', '美食', '購物'],
    highlights: ['淺草寺', '明治神宮', '原宿澀谷']
  },
  {
    id: 'bangkok',
    name: '泰國曼谷',
    region: '亞洲',
    country: '泰國',
    description: '熱情奔放的東南亞風情，豐富的美食文化',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c079365?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 1893,
    price: 'NT$ 12,000',
    duration: '4-6天',
    tags: ['寺廟', '美食', '夜生活'],
    highlights: ['大皇宮', '臥佛寺', '泰式美食']
  },
  {
    id: 'paris',
    name: '法國巴黎',
    region: '歐洲',
    country: '法國',
    description: '浪漫之都，藝術與時尚的完美結合',
    image: 'https://images.unsplash.com/photo-1502602898534-37ddbbd1061e?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 3421,
    price: 'NT$ 45,000',
    duration: '7-10天',
    tags: ['藝術', '時尚', '美食'],
    highlights: ['艾菲爾鐵塔', '羅浮宮', '凱旋門']
  },
  {
    id: 'seoul',
    name: '韓國首爾',
    region: '亞洲',
    country: '韓國',
    description: '韓流文化中心，現代科技與傳統文化的碰撞',
    image: 'https://images.unsplash.com/photo-1538489949608-cbc2d241d238?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 1567,
    price: 'NT$ 18,000',
    duration: '5-7天',
    tags: ['韓流', '美食', '購物'],
    highlights: ['景福宮', '明洞', '弘大']
  },
  {
    id: 'singapore',
    name: '新加坡',
    region: '亞洲',
    country: '新加坡',
    description: '花園城市，多元文化的國際大都會',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 2341,
    price: 'NT$ 22,000',
    duration: '4-6天',
    tags: ['現代都市', '美食', '購物'],
    highlights: ['濱海灣金沙', '聖淘沙', '牛車水']
  }
]

const regions = ['全部', '亞洲', '歐洲', '美洲', '大洋洲', '非洲']

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* 頁面標題 */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            探索全球目的地
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            發現世界各地的精彩景點，體驗不同文化的魅力
          </p>
        </div>

        {/* 搜尋和篩選 */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜尋目的地..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>篩選</span>
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <Button
                key={region}
                variant={region === '全部' ? 'default' : 'outline'}
                size="sm"
              >
                <Globe className="h-4 w-4 mr-2" />
                {region}
              </Button>
            ))}
          </div>
        </div>

        {/* 目的地網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur rounded-full px-2 py-1 text-xs font-medium">
                  {destination.duration}
                </div>
                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur rounded-full px-2 py-1 text-xs font-medium">
                  {destination.region}
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{destination.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {destination.country}
                    </CardDescription>
                    <CardDescription className="mt-2">
                      {destination.description}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({destination.reviews} 評價)
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">景點亮點</h4>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.map((highlight, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-primary">
                      {destination.price}
                    </div>
                    <Button asChild size="sm">
                      <Link href={`/destinations/${destination.id}`}>
                        查看詳情
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {destination.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 載入更多 */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            載入更多目的地
          </Button>
        </div>
      </div>
    </div>
  )
} 