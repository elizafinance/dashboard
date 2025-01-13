'use server'

import { cookies } from 'next/headers'

const VALID_INVITE_CODES = [
  'ELIZA_ALPHA',
  'DEFAI_PIONEER',
  'SOLANA_SURFER'
]

export async function validateInviteCode(code: string): Promise<boolean> {
  return VALID_INVITE_CODES.includes(code.toUpperCase())
}

export async function setInviteCode(code: string): Promise<boolean> {
  if (await validateInviteCode(code)) {
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'invite_code',
      value: code,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
    return true
  }
  return false
}

export async function hasValidInviteCode(): Promise<boolean> {
  const cookieStore = await cookies()
  const code = cookieStore.get('invite_code')
  return code ? validateInviteCode(code.value) : false
}