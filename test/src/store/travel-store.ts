import { create } from 'zustand';
import { TravelPreferences, TravelPlan, ServiceProvider } from '@/types/travel';

interface TravelState {
  // 用戶偏好
  preferences: TravelPreferences | null;
  setPreferences: (preferences: TravelPreferences) => void;
  
  // 旅遊計劃
  currentPlan: TravelPlan | null;
  savedPlans: TravelPlan[];
  setCurrentPlan: (plan: TravelPlan) => void;
  addSavedPlan: (plan: TravelPlan) => void;
  removeSavedPlan: (planId: string) => void;
  
  // 服務提供商
  serviceProviders: ServiceProvider[];
  setServiceProviders: (providers: ServiceProvider[]) => void;
  
  // UI 狀態
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // 錯誤處理
  error: string | null;
  setError: (error: string | null) => void;
  
  // 主題
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  
  // 語言
  language: string;
  setLanguage: (language: string) => void;
}

export const useTravelStore = create<TravelState>((set, get) => ({
  // 初始狀態
  preferences: null,
  currentPlan: null,
  savedPlans: [],
  serviceProviders: [],
  isLoading: false,
  error: null,
  theme: 'auto',
  language: 'zh-TW',
  
  // Actions
  setPreferences: (preferences) => set({ preferences }),
  
  setCurrentPlan: (plan) => set({ currentPlan: plan }),
  
  addSavedPlan: (plan) => {
    const { savedPlans } = get();
    const existingIndex = savedPlans.findIndex(p => p.id === plan.id);
    
    if (existingIndex >= 0) {
      // 更新現有計劃
      const updatedPlans = [...savedPlans];
      updatedPlans[existingIndex] = plan;
      set({ savedPlans: updatedPlans });
    } else {
      // 添加新計劃
      set({ savedPlans: [...savedPlans, plan] });
    }
  },
  
  removeSavedPlan: (planId) => {
    const { savedPlans } = get();
    set({ savedPlans: savedPlans.filter(p => p.id !== planId) });
  },
  
  setServiceProviders: (providers) => set({ serviceProviders: providers }),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  setTheme: (theme) => set({ theme }),
  
  setLanguage: (language) => set({ language }),
})); 