"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Crown, Shield, Swords, Users, Zap, Star } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Logo Image */}
          <div className="mb-8 flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b758aae46c05efb41552080135084cf5-iZxpJKuidCZCNDaEE5ku0IsvrDKLDC.webp"
              alt="KillerMC Logo"
              width={200}
              height={200}
              className="h-40 w-40 drop-shadow-[0_0_30px_rgba(34,197,94,0.4)] sm:h-48 sm:w-48 md:h-56 md:w-56"
              priority
            />
          </div>

          {/* Server badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-medium text-primary">Server Online - Play.killermc.fun</span>
          </div>

          {/* Main heading */}
          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-foreground">Welcome to</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-emerald-400 to-accent bg-clip-text text-transparent">
              KILLERMC
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
            Experience the ultimate Minecraft survival server with custom enchants, unique ranks, and an amazing community. Join thousands of players today!
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/store">
              <Button size="lg" className="h-14 gap-2 bg-primary px-8 text-lg hover:bg-primary/90">
                <Crown className="h-5 w-5" />
                View Ranks
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="h-14 gap-2 px-8 text-lg"
              onClick={() => {
                navigator.clipboard.writeText('Play.killermc.fun')
              }}
            >
              <span className="font-mono">Play.killermc.fun</span>
              <span className="text-xs text-muted-foreground">(Click to copy)</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: 'Online Players', value: '150+', icon: Users },
              { label: 'Unique Ranks', value: '7', icon: Crown },
              { label: 'Custom Enchants', value: '50+', icon: Zap },
              { label: 'Happy Players', value: '10K+', icon: Star },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold md:text-3xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/50 bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Why Choose KILLERMC?</h2>
            <p className="mt-4 text-muted-foreground">
              Discover what makes our server the best choice for Minecraft players
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Swords,
                title: 'Custom Enchants',
                description:
                  'Experience unique enchantments you won\'t find anywhere else. From super custom gear to unbreakable items!',
              },
              {
                icon: Shield,
                title: 'Active Staff',
                description:
                  'Our dedicated team ensures a fair and enjoyable experience for everyone. 24/7 moderation and support.',
              },
              {
                icon: Crown,
                title: 'Premium Ranks',
                description:
                  'Unlock exclusive perks with our rank system. Fly, access special commands, and stand out from the crowd!',
              },
              {
                icon: Users,
                title: 'Amazing Community',
                description:
                  'Join our friendly Discord community. Make friends, team up, and conquer together!',
              },
              {
                icon: Zap,
                title: 'Lag-Free Experience',
                description:
                  'High-performance servers ensure smooth gameplay. No lag, no interruptions, just pure fun!',
              },
              {
                icon: Star,
                title: 'Regular Updates',
                description:
                  'New features, events, and content added regularly. There\'s always something new to explore!',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Ready to Dominate?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Purchase a rank today and unlock exclusive perks, custom gear, and powerful commands. Stand out and become a legend on KILLERMC!
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/store">
              <Button size="lg" className="h-14 gap-2 bg-primary px-8 text-lg hover:bg-primary/90">
                <Crown className="h-5 w-5" />
                Browse Ranks
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <Image
src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b758aae46c05efb41552080135084cf5-iZxpJKuidCZCNDaEE5ku0IsvrDKLDC.webp"
              alt="KillerMC Logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg"
              />
              <span className="text-xl font-bold">
                <span className="text-primary">KILLER</span>
                <span className="text-foreground">MC</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="https://discord.gg/3Q8uW7F9A"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Discord Support
              </Link>
              <Link
                href="/store"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Store
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              2024 KILLERMC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
