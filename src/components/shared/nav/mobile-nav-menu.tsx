import { Bell, Search, ShoppingBag, User } from 'lucide-react';
import React from 'react';
import SectionDropdownMenu from './section-dropdown-menu';

const MobileNavMenu = ({ mobileMenuOpen }: { mobileMenuOpen: boolean }) => {
  return (
    <>
      {mobileMenuOpen && (
        <div className="border-border animate-in slide-in-from-top-2 mt-3 space-y-4 border-t pt-3">
          {/* Mobile search */}

          <div className="flex items-center justify-between">
            {/* Mobile category */}
            <SectionDropdownMenu />

            {/* Mobile actions */}
            <div className="flex items-center gap-3">
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
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavMenu;
