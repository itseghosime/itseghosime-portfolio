export const SITE_NAME = "ITSEGHOSIME";
export const SITE_URL = "https://www.itseghosime.com";
export const SITE_EMAIL = "hello@itseghosime.com";
export const SITE_PHONE_DISPLAY = "+234 810 901 3969";
export const SITE_PHONE_E164 = "+2348109013969";
export const SITE_PHONE_HREF = `tel:${SITE_PHONE_E164}`;
export const SITE_WHATSAPP_URL = "https://wa.me/2348109013969";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
