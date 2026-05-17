'use client'

import { useState } from 'react'
import { Rank } from '@/lib/ranks-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { Check, Crown, Sparkles, Shield, Sword, Star, Zap, Gem } from 'lucide-react'

const rankIcons: Record<string, React.ElementType> = {
  dedliest: Crown,
  elvion: Sparkles,
  eternal: Star,
  imortal: Shield,
  lord: Gem,
  titan: Zap,
  knight: Sword,
}

interface RankCardProps {
  rank: Rank
  featured?: boolean
}

export function RankCard({ rank, featured }: RankCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [isOrdering, setIsOrdering] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const Icon = rankIcons[rank.id] || Crown

  const handleOrder = async () => {
    if (!user) {
      router.push('/login?redirect=/store')
      return
    }

    setIsOrdering(true)
    try {
      const response = await fetch('/api/webhook/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rankId: rank.id,
          rankName: rank.name,
          price: rank.price,
          username: user.username,
          minecraftUsername: user.minecraftUsername || user.username,
          email: user.email,
        }),
      })

      if (response.ok) {
        setOrderSuccess(true)
      }
    } catch (error) {
      console.error('Order failed:', error)
    } finally {
      setIsOrdering(false)
    }
  }

  return (
    <>
      <Card
        className={`group relative overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
          featured
            ? 'border-primary/50 bg-gradient-to-b from-primary/10 to-transparent'
            : 'border-border/50 hover:border-border'
        }`}
      >
        {featured && (
          <div className="absolute -right-12 top-6 rotate-45 bg-primary px-12 py-1 text-xs font-bold text-primary-foreground">
            POPULAR
          </div>
        )}
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${rank.color}`}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
            <Badge variant="outline" className="text-xs">
              {rank.claimBlocks} Claim Blocks
            </Badge>
          </div>
          <div className="mt-4">
            <h3
              className={`bg-gradient-to-r ${rank.color} bg-clip-text text-2xl font-bold text-transparent`}
            >
              {rank.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Prefix: [{rank.prefix}]
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">${rank.price.usd}</span>
            <span className="text-sm text-muted-foreground">USD</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span>{rank.price.bdt} BDT</span>
            <span>/</span>
            <span>{rank.price.inr} INR</span>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              <span>Max {rank.maxHomes} Homes</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              <span>Max {rank.maxAuctions} Auctions</span>
            </div>
            {rank.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" />
                <span className="truncate">{feature.replace('Access To ', '')}</span>
              </div>
            ))}
            {rank.features.length > 3 && (
              <button
                onClick={() => setShowDetails(true)}
                className="text-sm text-primary hover:underline"
              >
                +{rank.features.length - 3} more features
              </button>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pt-4">
          <Button
            onClick={handleOrder}
            disabled={isOrdering}
            className={`w-full bg-gradient-to-r ${rank.color} text-white transition-all hover:opacity-90`}
          >
            {isOrdering ? 'Processing...' : 'Purchase Now'}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowDetails(true)}
            className="w-full"
          >
            View Kit Details
          </Button>
        </CardFooter>
      </Card>

      {/* Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle
              className={`bg-gradient-to-r ${rank.color} bg-clip-text text-3xl font-bold text-transparent`}
            >
              {rank.name} RANK
            </DialogTitle>
            <DialogDescription>
              Complete details and kit contents for {rank.name} rank
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-secondary p-4 text-center">
                <p className="text-2xl font-bold">{rank.claimBlocks}</p>
                <p className="text-xs text-muted-foreground">Claim Blocks</p>
              </div>
              <div className="rounded-lg bg-secondary p-4 text-center">
                <p className="text-2xl font-bold">{rank.maxHomes}</p>
                <p className="text-xs text-muted-foreground">Max Homes</p>
              </div>
              <div className="rounded-lg bg-secondary p-4 text-center">
                <p className="text-2xl font-bold">{rank.maxAuctions}</p>
                <p className="text-xs text-muted-foreground">Max Auctions</p>
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Commands & Features</h4>
              <div className="space-y-2">
                {rank.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="mb-3 font-semibold">Kit {rank.name} Contents</h4>
              <div className="space-y-2">
                {rank.kitItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="rounded-lg bg-secondary/50 p-4">
              <p className="text-center text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Duration: </span>
                {rank.duration}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1 rounded-lg bg-card p-4 text-center">
                <p className="text-2xl font-bold">${rank.price.usd}</p>
                <p className="text-xs text-muted-foreground">USD</p>
              </div>
              <div className="flex-1 rounded-lg bg-card p-4 text-center">
                <p className="text-2xl font-bold">{rank.price.bdt}</p>
                <p className="text-xs text-muted-foreground">BDT</p>
              </div>
              <div className="flex-1 rounded-lg bg-card p-4 text-center">
                <p className="text-2xl font-bold">{rank.price.inr}</p>
                <p className="text-xs text-muted-foreground">INR</p>
              </div>
            </div>

            <Button
              onClick={() => {
                setShowDetails(false)
                handleOrder()
              }}
              disabled={isOrdering}
              className={`w-full bg-gradient-to-r ${rank.color} text-white`}
            >
              {isOrdering ? 'Processing...' : 'Purchase Now'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={orderSuccess} onOpenChange={setOrderSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <Check className="h-6 w-6" />
              Order Placed Successfully!
            </DialogTitle>
            <DialogDescription>
              Your order for <strong>{rank.name}</strong> rank has been submitted.
              Our team will contact you shortly via Discord to complete the payment and deliver your rank.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 rounded-lg bg-secondary p-4 text-center">
            <p className="text-sm text-muted-foreground">Order Details</p>
            <p className="mt-1 font-semibold">{rank.name} Rank - ${rank.price.usd} USD</p>
            <p className="text-sm text-muted-foreground">
              Minecraft: {user?.minecraftUsername || user?.username}
            </p>
          </div>
          <Button onClick={() => setOrderSuccess(false)} className="mt-4 w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
