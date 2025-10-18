'use client';
import { Input } from '@/components/ui/input';
import { Bell, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import MobileNavMenu from './mobile-nav-menu';
import SectionDropdownMenu from './section-dropdown-menu';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav className="border-border bg-primary/30 supports-[backdrop-filter]:bg-primary/30 sticky top-0 z-50 border-b backdrop-blur">
      <div className="my-container">
        <div className="flex items-center justify-between">
          {/* Logo and category */}
          <>
            <Link href="/" className="">
              <Image
                src="/NittoPonno_Logo.svg"
                alt="NittoPonno"
                width={120}
                height={40}
                className="h-8 w-full md:h-12"
              />
            </Link>
          </>

          {/* Search bar - Desktop */}

          <div className="mx-6 flex w-full flex-1 items-center gap-2">
            <div className="hidden md:block">
              {' '}
              <SectionDropdownMenu />
            </div>

            <>
              <Input
                placeholder="Search for products..."
                className="h-11 w-full bg-white"
                prefix={<Search className="text-muted-foreground size-4" />}
                suffix={<Button className="hidden md:block">Search</Button>}
              />
            </>
          </div>

          {/* Right-side icons */}

          <div className="hidden items-center justify-end gap-3 md:flex">
            <span aria-label="Notifications" className="cursor-pointer">
              <Bell className="stroke-accent-foreground h-5 w-5" />
            </span>
            <span className="cursor-pointer">
              <ShoppingBag className="stroke-accent-foreground h-5 w-5" />
            </span>
            <span className="cursor-pointer">
              <User className="stroke-accent-foreground h-5 w-5" />
            </span>
          </div>
          {/* search */}

          {
            <span
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </span>
          }
        </div>

        {/* Mobile menu */}
        <MobileNavMenu mobileMenuOpen={mobileMenuOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
