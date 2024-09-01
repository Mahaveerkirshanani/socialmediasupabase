/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kclepcujmqnfjoezydvs.supabase.co',
        port: '',
      },
    ],
  }
};

export default nextConfig;
