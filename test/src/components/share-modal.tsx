"use client"

import { useState } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Share2, 
  Copy, 
  Check, 
  Mail, 
  MessageCircle, 
  Facebook, 
  Twitter,
  Instagram,
  Link
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShareModalProps {
  children: React.ReactNode
  planData?: any
  className?: string
}

export function ShareModal({ children, planData, className }: ShareModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareMethod, setShareMethod] = useState<'link' | 'social'>('link')

  // 生成分享連結
  const generateShareLink = () => {
    const baseUrl = window.location.origin
    const planId = planData?.id || 'demo-plan'
    return `${baseUrl}/plan?share=${planId}`
  }

  const shareLink = generateShareLink()

  // 複製連結
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  // 分享到社交媒體
  const shareToSocial = (platform: string) => {
    const text = `查看我的智能旅遊行程規劃！${shareLink}`
    const encodedText = encodeURIComponent(text)
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      instagram: `https://www.instagram.com/`,
      email: `mailto:?subject=旅遊行程分享&body=${encodedText}`,
      sms: `sms:?body=${encodedText}`
    }

    const url = urls[platform as keyof typeof urls]
    if (url) {
      window.open(url, '_blank', 'width=600,height=400')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5" />
            <span>分享行程</span>
          </DialogTitle>
          <DialogDescription>
            將您的智能旅遊行程分享給朋友和家人
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 分享方式切換 */}
          <div className="flex space-x-2">
            <Button
              variant={shareMethod === 'link' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShareMethod('link')}
              className="flex-1"
            >
              <Link className="h-4 w-4 mr-2" />
              複製連結
            </Button>
            <Button
              variant={shareMethod === 'social' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShareMethod('social')}
              className="flex-1"
            >
              <Share2 className="h-4 w-4 mr-2" />
              社交分享
            </Button>
          </div>

          {shareMethod === 'link' ? (
            /* 連結分享 */
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  value={shareLink}
                  readOnly
                  className="flex-1"
                  placeholder="生成分享連結..."
                />
                <Button
                  onClick={copyLink}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "min-w-[80px]",
                    copied && "bg-green-50 border-green-200 text-green-700"
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      已複製
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      複製
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                點擊複製按鈕將連結複製到剪貼簿
              </p>
            </div>
          ) : (
            /* 社交媒體分享 */
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => shareToSocial('facebook')}
                  variant="outline"
                  className="h-12"
                >
                  <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                  Facebook
                </Button>
                <Button
                  onClick={() => shareToSocial('twitter')}
                  variant="outline"
                  className="h-12"
                >
                  <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                  Twitter
                </Button>
                <Button
                  onClick={() => shareToSocial('email')}
                  variant="outline"
                  className="h-12"
                >
                  <Mail className="h-4 w-4 mr-2 text-gray-600" />
                  電子郵件
                </Button>
                <Button
                  onClick={() => shareToSocial('sms')}
                  variant="outline"
                  className="h-12"
                >
                  <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
                  簡訊
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                選擇您偏好的分享方式
              </p>
            </div>
          )}

          {/* 行程資訊預覽 */}
          {planData && (
            <div className="border rounded-lg p-3 bg-muted/30">
              <h4 className="font-medium text-sm mb-2">行程預覽</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>目的地：{planData.destination}</p>
                <p>天數：{planData.duration}天</p>
                <p>預算：{planData.totalCost ? `NT$ ${planData.totalCost.toLocaleString()}` : '未設定'}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 