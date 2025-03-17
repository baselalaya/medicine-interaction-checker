'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  
  const links = [
    { href: '/dashboard', label: 'Check Interactions' },
    { href: '/history', label: 'History' },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-4">
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center px-4 py-2 text-sm font-medium rounded-md',
              pathname === link.href
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
