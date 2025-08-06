import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: "張小明",
    location: "台北",
    rating: 5,
    comment: "智慧旅遊的 AI 規劃功能真的太棒了！幫我規劃的日本東京行程完美符合我的預算和偏好，省去了很多規劃時間。",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    trip: "日本東京 7天"
  },
  {
    name: "李美玲",
    location: "高雄",
    rating: 5,
    comment: "第一次使用智慧旅遊就愛上了！住宿推薦很準確，交通安排也很貼心。整個旅程都很順利，會推薦給朋友。",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    trip: "泰國曼谷 5天"
  },
  {
    name: "王建國",
    location: "台中",
    rating: 4,
    comment: "作為一個經常出差的人，智慧旅遊的商務旅遊功能很實用。行程安排合理，還考慮到了工作需求。",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    trip: "新加坡 4天"
  },
  {
    name: "陳雅婷",
    location: "台南",
    rating: 5,
    comment: "帶著家人出遊，智慧旅遊的親子功能很貼心。推薦的景點都很適合孩子，住宿也有兒童設施。",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    trip: "韓國首爾 6天"
  },
  {
    name: "劉志豪",
    location: "新竹",
    rating: 4,
    comment: "預算有限但想要好的體驗，智慧旅遊的經濟型推薦很實用。找到了性價比很高的住宿和交通方案。",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    trip: "雲南麗江 5天"
  },
  {
    name: "林佳慧",
    location: "桃園",
    rating: 5,
    comment: "智慧旅遊的無障礙設施推薦功能對我們很有幫助。整個旅程都很順利，服務人員也很友善。",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    trip: "法國巴黎 8天"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            用戶真實評價
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            聽聽其他旅行者的真實體驗分享
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{testimonial.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-sm text-primary font-medium">
                      {testimonial.trip}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-6 w-6 text-muted-foreground/30" />
                  <CardDescription className="text-base leading-relaxed pl-4">
                    "{testimonial.comment}"
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.8</span>
              <span>/ 5.0</span>
            </div>
            <span>•</span>
            <span>超過 10,000+ 用戶評價</span>
            <span>•</span>
            <span>98% 推薦率</span>
          </div>
        </div>
      </div>
    </section>
  )
} 