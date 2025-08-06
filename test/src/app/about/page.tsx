import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Globe, 
  Award, 
  Heart,
  Target,
  Lightbulb,
  Shield,
  Sparkles
} from 'lucide-react'

const team = [
  {
    name: '張小明',
    role: '創始人 & CEO',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    description: '擁有 15 年旅遊業經驗，致力於用科技改變旅遊體驗'
  },
  {
    name: '李美玲',
    role: '技術總監',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    description: 'AI 和機器學習專家，負責智能推薦系統開發'
  },
  {
    name: '王建國',
    role: '產品經理',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    description: '專注於用戶體驗設計，確保產品易用性和功能性'
  },
  {
    name: '陳雅婷',
    role: '客戶服務總監',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    description: '負責客戶關係管理，確保每位用戶都能獲得最佳服務'
  }
]

const values = [
  {
    icon: Target,
    title: '用戶至上',
    description: '我們始終將用戶需求放在首位，致力於提供最優質的旅遊體驗'
  },
  {
    icon: Lightbulb,
    title: '創新驅動',
    description: '運用最新技術，不斷創新服務模式，引領旅遊業發展'
  },
  {
    icon: Shield,
    title: '安全可靠',
    description: '確保所有服務的安全性和可靠性，讓用戶安心出行'
  },
  {
    icon: Heart,
    title: '用心服務',
    description: '以真誠的態度對待每一位用戶，提供貼心的服務體驗'
  }
]

const stats = [
  { number: '50,000+', label: '滿意用戶' },
  { number: '100+', label: '全球目的地' },
  { number: '98%', label: '推薦率' },
  { number: '24/7', label: '客服支援' }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* 頁面標題 */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">
            關於智慧旅遊
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            我們致力於用科技改變旅遊體驗，讓每個人都能享受完美的旅程
          </p>
        </div>

        {/* 公司介紹 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">我們的使命</h2>
            <p className="text-muted-foreground leading-relaxed">
              智慧旅遊成立於 2020 年，是一家專注於智能旅遊規劃的科技公司。我們運用先進的 AI 技術，
              為用戶提供個人化的旅遊規劃服務，讓每個人都能輕鬆規劃完美的旅程。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              我們相信，旅遊不應該是一件複雜的事情。通過智能化的服務，我們希望讓每個人都能享受
              到便捷、安全、有趣的旅遊體驗。
            </p>
            <div className="flex items-center space-x-4">
              <Button size="lg">
                了解更多
              </Button>
              <Button variant="outline" size="lg">
                聯絡我們
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <Sparkles className="h-24 w-24 text-primary" />
            </div>
          </div>
        </div>

        {/* 數據統計 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 核心價值 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">核心價值</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 團隊介紹 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">我們的團隊</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {member.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 獲獎與認證 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">獲獎與認證</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle>2023 年度最佳旅遊平台</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  由台灣旅遊協會頒發，表彰我們在旅遊科技創新方面的傑出貢獻
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>ISO 27001 資訊安全認證</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  通過國際資訊安全管理系統認證，確保用戶資料安全
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>全球合作夥伴認證</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  與全球超過 100 家知名旅遊服務提供商建立合作關係
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 聯絡我們 */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">想要加入我們？</h3>
              <p className="text-muted-foreground mb-6">
                我們正在尋找優秀的人才加入我們的團隊，一起改變旅遊業的未來
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  查看職缺
                </Button>
                <Button variant="outline" size="lg">
                  聯絡我們
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 