import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Globe, Users } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div className="container">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="h-6 w-6" />
              <span className="text-lg font-medium">準備開始您的旅程了嗎？</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              讓 AI 為您規劃
              <br />
              完美的旅遊體驗
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              立即開始規劃您的下一趟旅程，享受智能化的旅遊規劃服務
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/plan">
                開始規劃旅程
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/destinations">
                探索目的地
                <Globe className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>超過 50,000+ 滿意用戶</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>100+ 全球目的地</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>AI 智能推薦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 