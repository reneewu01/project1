"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTravelStore } from '@/store/travel-store'
import { 
  Plane, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Globe,
  User,
  Heart,
  Settings
} from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme, language, setLanguage } = useTravelStore()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const toggleLanguage = () => {
    setLanguage(language === 'zh-TW' ? 'en-US' : 'zh-TW')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Plane className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">智慧旅遊</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            首頁
          </Link>
          <Link href="/plan" className="text-sm font-medium hover:text-primary transition-colors">
            行程規劃
          </Link>
          <Link href="/destinations" className="text-sm font-medium hover:text-primary transition-colors">
            目的地
          </Link>
          <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
            服務
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            關於我們
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="切換主題"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            aria-label="切換語言"
          >
            <Globe className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" aria-label="收藏">
            <Heart className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" aria-label="設定">
            <Settings className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" aria-label="用戶">
            <User className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="開啟選單"
        >
          {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            <Link 
              href="/" 
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              首頁
            </Link>
            <Link 
              href="/plan" 
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              行程規劃
            </Link>
            <Link 
              href="/destinations" 
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              目的地
            </Link>
            <Link 
              href="/services" 
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              服務
            </Link>
            <Link 
              href="/about" 
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              關於我們
            </Link>
            
            <div className="flex items-center space-x-2 pt-4 border-t">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="切換主題"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                aria-label="切換語言"
              >
                <Globe className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="icon" aria-label="收藏">
                <Heart className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="icon" aria-label="設定">
                <Settings className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="icon" aria-label="用戶">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 