import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, MapPin } from 'lucide-react'
import Link from 'next/link'

const destinations = [
  {
    id: 'lijiang',
    name: '雲南麗江',
    description: '探索世界文化遺產古城，體驗納西族文化',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 1247,
    price: 'NT$ 15,000',
    duration: '5-7天',
    tags: ['文化遺產', '自然風光', '美食']
  },
  {
    id: 'tokyo',
    name: '日本東京',
    description: '現代與傳統的完美融合，體驗日本獨特文化',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 2156,
    price: 'NT$ 25,000',
    duration: '6-8天',
    tags: ['現代都市', '美食', '購物']
  },
  {
    id: 'bangkok',
    name: '泰國曼谷',
    description: '熱情奔放的東南亞風情，豐富的美食文化',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c079365?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 1893,
    price: 'NT$ 12,000',
    duration: '4-6天',
    tags: ['寺廟', '美食', '夜生活']
  },
  {
    id: 'paris',
    name: '法國巴黎',
    description: '浪漫之都，藝術與時尚的完美結合',
    image: 'https://images.unsplash.com/photo-1502602898534-37ddbbd1061e?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 3421,
    price: 'NT$ 45,000',
    duration: '7-10天',
    tags: ['藝術', '時尚', '美食']
  },
  {
    id: 'seoul',
    name: '韓國首爾',
    description: '韓流文化中心，現代科技與傳統文化的碰撞',
    image: 'https://images.unsplash.com/photo-1538489949608-cbc2d241d238?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 1567,
    price: 'NT$ 18,000',
    duration: '5-7天',
    tags: ['韓流', '美食', '購物']
  },
  {
    id: 'singapore',
    name: '新加坡',
    description: '花園城市，多元文化的國際大都會',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 2341,
    price: 'NT$ 22,000',
    duration: '4-6天',
    tags: ['現代都市', '美食', '購物']
  }
]

export function PopularDestinations() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            熱門目的地
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            探索全球最受歡迎的旅遊目的地，體驗不同文化的魅力
          </p>
        </div>

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
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{destination.name}</CardTitle>
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
                <div className="flex items-center justify-between mb-4">
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
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/destinations">
              查看更多目的地
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 