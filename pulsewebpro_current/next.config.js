/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['es', 'en', 'fr'],
    defaultLocale: 'es',
  },
};
module.exports = nextConfig;
