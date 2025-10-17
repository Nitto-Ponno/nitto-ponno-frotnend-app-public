'use client';
import { Input } from '@/components/ui/input';
import { Bell, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import CategoryDropdownMenu from './category-dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // ddddfff
  return (
    <nav className="border-border bg-primary/30 supports-[backdrop-filter]:bg-primary/30 sticky top-0 z-50 border-b backdrop-blur">
      <div className="my-container">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo and category */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/NittoPonno_Logo.svg"
                alt="NittoPonno"
                width={120}
                height={40}
                className="h-8 w-auto md:h-12"
              />
            </Link>
            {!isMobile && (
              <div className="hidden md:block">
                {' '}
                <CategoryDropdownMenu />
              </div>
            )}
          </div>

          {/* Search bar - Desktop */}
          {!isMobile && (
            <div className="mx-6 hidden max-w-2xl flex-1 md:block">
              <>
                <Input
                  placeholder="Search for products..."
                  className="h-11 bg-white"
                  suffix={<Search className="text-muted-foreground" />}
                />
              </>
            </div>
          )}

          {/* Right-side icons */}
          <div className="flex items-center gap-3 md:gap-4">
            {!isMobile && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary relative hidden h-10 w-10 md:block"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="bg-primary absolute top-1.5 right-1.5 h-2 w-2 rounded-full" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary relative hidden h-10 w-10 md:block"
                  aria-label="Shopping cart"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="bg-primary text-primary-foreground absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold">
                    0
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary hidden h-10 w-10 md:block"
                  aria-label="User account"
                >
                  <User className="h-5 w-5" />
                </Button>
              </>
            )}
            {
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            }
          </div>
        </div>

        {/* Mobile menu */}
        {isMobile && mobileMenuOpen && (
          <div className="border-border animate-in slide-in-from-top-2 space-y-4 border-t pt-3 pb-4">
            {/* Mobile search */}
            <div>
              <Input
                placeholder="Search for products..."
                className="h-10 bg-white"
                suffix={<Search className="text-muted-foreground" />}
              />
            </div>

            <div className="flex items-center justify-between">
              {/* Mobile category */}
              <CategoryDropdownMenu />

              {/* Mobile actions */}
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary relative h-10 w-10"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="bg-primary absolute top-1.5 right-1.5 h-2 w-2 rounded-full" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary relative h-10 w-10"
                  aria-label="Shopping cart"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="bg-primary text-primary-foreground absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold">
                    0
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary h-10 w-10"
                  aria-label="User account"
                >
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
