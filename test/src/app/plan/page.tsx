import { TravelPlanForm } from '@/components/travel-plan-form'
import { PlanResults } from '@/components/plan-results'

export default function PlanPage() {
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