import { cookies } from 'next/headers'

const VALID_INVITE_CODES = [
  'ELIZA_ALPHA',
  'DEFAI_PIONEER',
  'SOLANA_SURFER'
]

export class InviteCodeService {
  static isValidCode(code: string): boolean {
    return VALID_INVITE_CODES.includes(code.toUpperCase())
  }

  static setInviteCode(code: string): void {
    if (this.isValidCode(code)) {
      cookies().set('invite_code', code, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      })
    }
  }

  static hasValidInviteCode(): boolean {
    const code = cookies().get('invite_code')
    return code ? this.isValidCode(code.value) : false
  }
} 