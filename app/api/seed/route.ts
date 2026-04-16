import { NextResponse } from 'next/server'
import { seed } from '@/scripts/seed-payload'

export async function POST() {
  try {
    const result = await seed()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Seed failed' },
      { status: 500 },
    )
  }
}
