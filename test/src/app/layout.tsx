import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '智慧旅遊諮詢網站',
  description: '您的個人化旅遊規劃助手，提供智能行程規劃、住宿推薦、交通安排等全方位旅遊服務。',
  keywords: '旅遊,行程規劃,住宿推薦,交通安排,智能助手',
  authors: [{ name: '智慧旅遊團隊' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: '智慧旅遊諮詢網站',
    description: '您的個人化旅遊規劃助手',
    type: 'website',
    locale: 'zh_TW',
  },
  twitter: {
    card: 'summary_large_image',
    title: '智慧旅遊諮詢網站',
    description: '您的個人化旅遊規劃助手',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 