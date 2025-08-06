# 🌍 智慧旅遊諮詢網站

一個基於 Next.js 15+ 和 AI 技術的智能旅遊規劃平台，提供個人化的旅遊行程規劃、住宿推薦、交通安排等全方位服務。

## ✨ 主要功能

### 🎯 智能表單系統
- **基本資訊收集**: 出發地、目的地、旅遊天數、出發日期
- **進階偏好設定**: 旅客人數、預算範圍、住宿偏好、交通方式
- **興趣活動選擇**: 文化遺產、自然風光、戶外探險、美食體驗等
- **特殊需求記錄**: 無障礙設施、飲食限制、導遊服務等

### 🏢 服務提供商推薦系統
- **智能旅行社推薦**: 根據預算和需求智能匹配
- **住宿智能推薦**: 地理位置篩選、設施篩選、真實評價
- **租車服務優化**: 車型分類、取還車地點選擇、保險方案
- **導遊服務升級**: 語言能力標示、專業領域、服務評價

### 🗺️ 智能行程規劃系統
- **AI 智能規劃**: 根據用戶偏好自動生成最佳行程
- **多種行程模式**: 悠閒度假型、深度探索型、快速觀光型
- **季節性調整**: 根據旅遊季節自動調整行程
- **天氣整合**: 即時天氣資訊影響行程安排

### 💡 旅遊建議系統
- **智能打包建議**: 季節性打包、目的地特色、活動類型
- **旅遊貼士升級**: 文化禮儀、安全提醒、健康建議
- **緊急聯絡系統**: 分級聯絡、多語言支援、即時翻譯

## 🚀 技術架構

### 前端技術
- **Next.js 15+**: App Router、React Server Components (RSC)、SSR
- **TypeScript**: 強類型支援
- **Tailwind CSS**: 響應式設計
- **Zustand**: 狀態管理
- **React Hook Form**: 表單處理
- **Zod**: 資料驗證
- **Lucide React**: 圖標庫
- **Framer Motion**: 動畫效果

### UI 組件
- **Radix UI**: 無障礙組件庫
- **Shadcn/ui**: 現代化 UI 組件
- **Class Variance Authority**: 組件變體管理

### 開發工具
- **ESLint**: 程式碼品質檢查
- **Prettier**: 程式碼格式化
- **TypeScript**: 型別檢查

## 📦 安裝與運行

### 前置需求
- Node.js 18+ 
- npm 或 yarn

### 安裝依賴
```bash
npm install
# 或
yarn install
```

### 開發環境
```bash
npm run dev
# 或
yarn dev
```

### 建置專案
```bash
npm run build
# 或
yarn build
```

### 啟動生產環境
```bash
npm run start
# 或
yarn start
```

## 🏗️ 專案結構

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全域樣式
│   ├── layout.tsx         # 根佈局
│   ├── page.tsx           # 首頁
│   └── plan/              # 行程規劃頁面
├── components/             # React 組件
│   ├── ui/                # 基礎 UI 組件
│   ├── hero.tsx           # 首頁英雄區塊
│   ├── features.tsx       # 特色功能
│   ├── header.tsx         # 頁面標題
│   ├── footer.tsx         # 頁面底部
│   └── ...                # 其他組件
├── lib/                    # 工具函數
│   └── utils.ts           # 通用工具函數
├── store/                  # 狀態管理
│   └── travel-store.ts    # 旅遊相關狀態
└── types/                  # TypeScript 型別定義
    └── travel.ts          # 旅遊相關型別
```

## 🎨 設計特色

### 響應式設計
- 支援手機、平板、桌面完整適配
- 移動優先的設計理念
- 流暢的觸控體驗

### 無障礙設計
- 支援螢幕閱讀器
- 鍵盤導航支援
- 高對比度模式
- 減少動畫模式

### 主題支援
- 明亮/暗黑主題切換
- 自動主題偵測
- 自定義主題色彩

### PWA 支援
- 可安裝為手機應用
- 離線功能支援
- 推送通知

## 🔧 環境變數

創建 `.env.local` 檔案：

```env
# Mapbox API (可選)
MAPBOX_ACCESS_TOKEN=your_mapbox_token

# 其他 API 金鑰
NEXT_PUBLIC_API_URL=your_api_url
```

## 📱 功能特色

### AI 智能規劃
- 根據用戶偏好自動生成行程
- 考慮季節、天氣、交通等因素
- 智能推薦景點和活動

### 個人化服務
- 支援不同旅客人數和年齡層
- 特殊需求處理（無障礙、飲食限制等）
- 預算範圍智能匹配

### 即時資訊
- 天氣資訊整合
- 交通狀況更新
- 價格變動追蹤

### 社交功能
- 行程分享
- 用戶評價系統
- 收藏功能

## 🚀 部署

### Vercel 部署
```bash
npm run build
vercel --prod
```

### Docker 部署
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 貢獻指南

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權

本專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 檔案

## 📞 聯絡資訊

- 專案維護者: 智慧旅遊團隊
- 電子郵件: info@smarttravel.com
- 專案連結: [https://github.com/your-username/smart-travel-advisor](https://github.com/your-username/smart-travel-advisor)

## 🙏 致謝

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Zustand](https://zustand-demo.pmnd.rs/) - 狀態管理
- [Radix UI](https://www.radix-ui.com/) - UI 組件庫
- [Lucide](https://lucide.dev/) - 圖標庫

---

**智慧旅遊諮詢網站** - 讓 AI 為您規劃完美旅程！🌍✈️ 