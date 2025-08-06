import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Search, 
  Brain, 
  Calendar, 
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: "輸入偏好",
    description: "告訴我們您的目的地、預算、旅遊天數和特殊需求",
    color: "text-blue-600"
  },
  {
    icon: Brain,
    title: "AI 智能分析",
    description: "我們的 AI 系統會分析您的需求並生成最佳行程建議",
    color: "text-purple-600"
  },
  {
    icon: Calendar,
    title: "查看行程",
    description: "瀏覽詳細的行程安排，包含景點、住宿和交通資訊",
    color: "text-green-600"
  },
  {
    icon: CheckCircle,
    title: "確認預訂",
    description: "一鍵預訂所有服務，享受無縫的旅遊體驗",
    color: "text-orange-600"
  }
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            如何使用智慧旅遊？
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            簡單四步驟，輕鬆規劃您的完美旅程
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
              
              {/* 連接箭頭 */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-6 py-3 rounded-full">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">開始您的智慧旅遊體驗</span>
          </div>
        </div>
      </div>
    </section>
  )
} 