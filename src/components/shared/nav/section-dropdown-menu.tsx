'use client';

import { memo } from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// ✅ Type Definition
type Section = {
  item: string;
  link?: string;
};

// ✅ Section Data
const sections: Section[] = [
  { item: 'Electronics', link: '/sections/electronics' },
  { item: 'Fashion', link: '/sections/fashion' },
  { item: 'Home & Living', link: '/sections/home-living' },
  { item: 'Sports & Outdoors', link: '/sections/sports-outdoors' },
];

function SectionDropdownMenu() {
  const isMobile = useIsMobile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-foreground hover:bg-accent hover:text-primary flex items-center gap-1.5 px-3 font-medium transition-colors"
        >
          Sections
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56"
        side="bottom"
        align={isMobile ? 'start' : 'center'}
      >
        <DropdownMenuLabel className="text-muted-foreground text-xs font-semibold uppercase">
          Browse sections
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sections.map((section, index) => (
          <DropdownMenuItem key={index} asChild>
            {section.link ? (
              <Link
                href={section.link}
                className="hover:text-primary block w-full cursor-pointer font-medium"
              >
                {section.item}
              </Link>
            ) : (
              <span className="font-medium">{section.item}</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(SectionDropdownMenu);
