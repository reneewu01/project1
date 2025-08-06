import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Brain, 
  Map, 
  Hotel, 
  Car, 
  Users, 
  Shield,
  Smartphone,
  Globe
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: "AI 智能規劃",
    description: "運用先進的 AI 技術，根據您的偏好自動生成最佳行程，節省規劃時間。",
    color: "text-blue-600"
  },
  {
    icon: Map,
    title: "智能地圖導航",
    description: "整合即時地圖服務，提供最佳路線規劃和交通建議。",
    color: "text-green-600"
  },
  {
    icon: Hotel,
    title: "住宿智能推薦",
    description: "根據預算和偏好，推薦最適合的住宿選項，包含真實評價。",
    color: "text-purple-600"
  },
  {
    icon: Car,
    title: "交通安排",
    description: "一站式交通預訂服務，包含機票、租車、包車等多種選擇。",
    color: "text-orange-600"
  },
  {
    icon: Users,
    title: "個人化服務",
    description: "根據旅客人數、年齡、特殊需求提供量身定制的服務。",
    color: "text-pink-600"
  },
  {
    icon: Shield,
    title: "安全保障",
    description: "提供旅遊保險、緊急聯絡、安全提醒等全方位保障。",
    color: "text-red-600"
  },
  {
    icon: Smartphone,
    title: "行動應用",
    description: "支援 PWA 技術，可安裝為手機應用，離線查看行程。",
    color: "text-indigo-600"
  },
  {
    icon: Globe,
    title: "全球目的地",
    description: "涵蓋全球熱門旅遊目的地，提供豐富的旅遊資訊。",
    color: "text-teal-600"
  }
]

export function Features() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            為什麼選擇智慧旅遊？
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            我們提供全方位的智能旅遊服務，讓您的旅程更加完美
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 