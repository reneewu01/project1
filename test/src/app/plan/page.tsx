import { TravelPlanForm } from '@/components/travel-plan-form'
import { PlanResults } from '@/components/plan-results'
import { SharedPlanView } from '@/components/shared-plan-view'
import { Suspense } from 'react'

interface PlanPageProps {
  searchParams: Promise<{ share?: string }>
}

export default async function PlanPage({ searchParams }: PlanPageProps) {
  const params = await searchParams
  
  // 如果有分享參數，顯示分享的行程視圖
  if (params.share) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">載入中...</p>
          </div>
        </div>
      }>
        <SharedPlanView />
      </Suspense>
    )
  }

  // 否則顯示正常的行程規劃頁面
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            智能行程規劃
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            告訴我們您的偏好，AI 將為您量身打造完美旅程
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TravelPlanForm />
          </div>
          <div className="lg:col-span-2">
            <PlanResults />
          </div>
        </div>
      </div>
    </div>
  )
} 