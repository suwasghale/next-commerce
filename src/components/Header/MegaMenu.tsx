"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function MegaMenu() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {/* Example Category */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Android</NavigationMenuTrigger>
          <NavigationMenuContent className="p-6 w-[800px]">
            <div className="grid grid-cols-3 gap-6">
              {/* Column 1 */}
              <div>
                <h3 className="font-semibold mb-2">Samsung</h3>
                <ul className="space-y-1">
                  <li><NavLink href="/samsung/phones">Samsung Phones</NavLink></li>
                  <li><NavLink href="/samsung/tablets">Samsung Tablets</NavLink></li>
                  <li><NavLink href="/samsung/buds">Buds & Accessories</NavLink></li>
                  <li><NavLink href="/samsung/cases">Phone Cases</NavLink></li>
                  <li><NavLink href="/samsung/watches">Samsung Watch</NavLink></li>
                </ul>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="font-semibold mb-2">OnePlus</h3>
                <ul className="space-y-1">
                  <li><NavLink href="/oneplus/phones">OnePlus Phones</NavLink></li>
                  <li><NavLink href="/oneplus/tablets">OnePlus Tablets</NavLink></li>
                  <li><NavLink href="/oneplus/accessories">Accessories</NavLink></li>
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <h3 className="font-semibold mb-2">Google</h3>
                <ul className="space-y-1">
                  <li><NavLink href="/google/tv">Google TV</NavLink></li>
                  <li><NavLink href="/google/router">Google Router</NavLink></li>
                  <li><NavLink href="/google/other">Other Products</NavLink></li>
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Add more categories like Apple, Audio, etc */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "block text-sm text-muted-foreground hover:text-foreground transition-colors"
      )}
    >
      {children}
    </Link>
  );
}
