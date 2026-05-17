import { NextRequest, NextResponse } from 'next/server'

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1505464554975395952/AC_0NZXqLebW6WeWcx8SucM1lBOTwlWXIZPqZkQVebDH5aeuAzZs7ZOLObezCQGoUArw'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { rankId, rankName, price, username, minecraftUsername, email } = body

    if (!rankId || !rankName || !price || !username || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create Discord embed message
    const embed = {
      title: '🎮 New Rank Order!',
      color: getRankColor(rankId),
      fields: [
        {
          name: '📦 Rank',
          value: rankName,
          inline: true,
        },
        {
          name: '💰 Price',
          value: `$${price.usd} USD\n${price.bdt} BDT\n${price.inr} INR`,
          inline: true,
        },
        {
          name: '👤 Customer',
          value: username,
          inline: true,
        },
        {
          name: '⛏️ Minecraft Username',
          value: minecraftUsername || username,
          inline: true,
        },
        {
          name: '📧 Email',
          value: email,
          inline: true,
        },
        {
          name: '📅 Order Time',
          value: new Date().toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'short',
          }),
          inline: false,
        },
      ],
      footer: {
        text: 'KILLERMC Store - Rank Order System',
      },
      timestamp: new Date().toISOString(),
    }

    // Send to Discord webhook
    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'KILLERMC Store',
        avatar_url: 'https://i.imgur.com/4M34hi2.png',
        embeds: [embed],
      }),
    })

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text()
      console.error('Discord webhook error:', errorText)
      return NextResponse.json(
        { error: 'Failed to send order notification' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'Order placed successfully' })
  } catch (error) {
    console.error('Order API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getRankColor(rankId: string): number {
  const colors: Record<string, number> = {
    dedliest: 0xdc2626, // Red
    elvion: 0x9333ea, // Purple
    eternal: 0xf59e0b, // Amber
    imortal: 0x06b6d4, // Cyan
    lord: 0x7c3aed, // Violet
    titan: 0x10b981, // Emerald
    knight: 0x64748b, // Slate
  }
  return colors[rankId] || 0x00ff00
}
