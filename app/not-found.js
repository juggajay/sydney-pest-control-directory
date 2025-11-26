import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-neutral-50">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="text-8xl font-display font-bold text-primary-500 mb-4">404</div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-neutral-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It may have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn btn-primary gap-2 w-full sm:w-auto">
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link href="/operators" className="btn btn-secondary gap-2 w-full sm:w-auto">
            <Search className="w-5 h-5" />
            Find Operators
          </Link>
        </div>
      </div>
    </div>
  );
}
