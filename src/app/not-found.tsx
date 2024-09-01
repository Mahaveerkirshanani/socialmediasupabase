// pages/404.tsx
import { Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-lg w-full text-center flex  flex-col items-center">
        {/* SVG Image */}
        <Image
          src="/404.gif"
          alt="Not Found"
          width={500}
          height={500}
          className="w-full h-auto max-w-sm mx-auto"
          priority
        />

        
        {/* Back to Home Button */}
        <Link href="/" passHref>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex gap-4">
           <Home /> Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
