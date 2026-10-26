import { describe, expect, it } from 'vitest'
import {
  absoluteUrl,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_E164,
  SITE_PHONE_HREF,
  SITE_URL,
  SITE_WHATSAPP_URL,
} from './site'

describe('site utilities', () => {
  it('exports correct site name and url constants', () => {
    expect(SITE_NAME).toBe('ITSEGHOSIME')
    expect(SITE_URL).toBe('https://www.itseghosime.com')
    expect(SITE_EMAIL).toBe('hello@itseghosime.com')
    expect(SITE_PHONE_DISPLAY).toBe('+234 810 901 3969')
    expect(SITE_PHONE_E164).toBe('+2348109013969')
    expect(SITE_PHONE_HREF).toBe('tel:+2348109013969')
    expect(SITE_WHATSAPP_URL).toBe('https://wa.me/2348109013969')
  })

  it('constructs absolute URLs for root and nested paths', () => {
    expect(absoluteUrl('/')).toBe('https://www.itseghosime.com/')
    expect(absoluteUrl('/work')).toBe('https://www.itseghosime.com/work')
    expect(absoluteUrl('/work/skinny-cans')).toBe('https://www.itseghosime.com/work/skinny-cans')
    expect(absoluteUrl('/notes/multilingual-routing-next-intl')).toBe(
      'https://www.itseghosime.com/notes/multilingual-routing-next-intl',
    )
  })

  it('handles paths with query parameters and hash anchors', () => {
    expect(absoluteUrl('/work?filter=web')).toBe('https://www.itseghosime.com/work?filter=web')
    expect(absoluteUrl('/#contact')).toBe('https://www.itseghosime.com/#contact')
  })

  it('handles relative paths without leading slash cleanly', () => {
    expect(absoluteUrl('about')).toBe('https://www.itseghosime.com/about')
  })
})
