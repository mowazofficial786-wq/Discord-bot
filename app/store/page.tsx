import { ranks } from '@/lib/ranks-data'
import { RankCard } from '@/components/rank-card'
import { Crown } from 'lucide-react'

export const metadata = {
  title: 'Store - KILLERMC',
  description: 'Purchase premium ranks and unlock exclusive features on KILLERMC',
}

export default function StorePage() {
  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold sm:text-5xl">
            <span className="bg-gradient-to-r from-primary via-emerald-400 to-accent bg-clip-text text-transparent">
              Rank Store
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Choose your rank and unlock exclusive perks, custom gear, and powerful commands. All ranks are valid for the current season of KILLERMC.
          </p>
        </div>

        {/* Info Banner */}
        <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-primary/30 bg-primary/10 p-4 text-center">
          <p className="text-sm text-foreground">
            <span className="font-semibold">How to Purchase:</span> Click on any rank to place an order. Our team will contact you via Discord to complete the payment.
          </p>
        </div>

        {/* Ranks Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ranks.map((rank, index) => (
            <RankCard
              key={rank.id}
              rank={rank}
              featured={index === 0}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="rounded-2xl border border-border/50 bg-card p-8">
            <h2 className="mb-4 text-2xl font-bold">Payment Methods</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-secondary p-4 text-center">
                <p className="text-lg font-semibold">BDT</p>
                <p className="text-sm text-muted-foreground">bKash / Nagad</p>
              </div>
              <div className="rounded-lg bg-secondary p-4 text-center">
                <p className="text-lg font-semibold">INR</p>
                <p className="text-sm text-muted-foreground">UPI / Paytm</p>
                <p className="mt-2 font-mono text-xs text-primary">8016553962@fam</p>
              </div>
              <div className="rounded-lg bg-secondary p-4 text-center">
                <p className="text-lg font-semibold">USD</p>
                <p className="text-sm text-muted-foreground">PayPal / Card</p>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              After placing an order, our staff will contact you on Discord within 24 hours to process your payment and deliver your rank.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
