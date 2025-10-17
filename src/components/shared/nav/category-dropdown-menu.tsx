'use client';

import { memo } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type Category = {
  item: string;
  children?: Category[];
};

// Sample nested data
const categories: Category[] = [
  {
    item: 'Electronics',
    children: [
      { item: 'Mobile' },
      { item: 'Laptop' },
      { item: 'Camera' },
      {
        item: 'Accessories',
        children: [
          { item: 'Chargers' },
          { item: 'Cables' },
          { item: 'Headphones' },
        ],
      },
    ],
  },
  {
    item: 'Fashion',
    children: [
      { item: 'Men' },
      { item: 'Women' },
      {
        item: 'Kids',
        children: [{ item: 'Boys' }, { item: 'Girls' }],
      },
    ],
  },
  {
    item: 'Home & Living',
    children: [{ item: 'Furniture' }, { item: 'Decor' }, { item: 'Kitchen' }],
  },
  {
    item: 'Sports & Outdoors',
    children: [{ item: 'Fitness' }, { item: 'Camping' }, { item: 'Cycling' }],
  },
];

function CategoryDropdownMenu() {
  const isMobile = useIsMobile();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-foreground hover:bg-accent hover:text-primary flex items-center gap-1.5 px-3 font-medium transition-colors"
        >
          Categories
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" side="bottom">
        <DropdownMenuLabel className="text-muted-foreground text-xs font-semibold uppercase">
          Browse Categories
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <RecursiveDropdown data={categories} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function RecursiveDropdown({ data }: { data: Category[] }) {
  const isMobile = useIsMobile();
  return (
    <>
      {data.map((category, index) =>
        category.children && category.children.length > 0 ? (
          <DropdownMenuSub key={index}>
            <DropdownMenuSubTrigger className="cursor-pointer">
              {category.item}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-48">
              <RecursiveDropdown data={category.children} />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ) : (
          <DropdownMenuItem key={index} className="cursor-pointer">
            {category.item}
          </DropdownMenuItem>
        ),
      )}
    </>
  );
}

export default memo(CategoryDropdownMenu);
