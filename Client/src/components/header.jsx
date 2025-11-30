import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Phone, Menu, Zap, CreditCard, Building2, Users, Code, Car } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Strip */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Toll-free:</span>
              <span className="font-medium">1800-XXX-XXXX</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" />
              <span>Instant FASTag activation | 24/7 support</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/login" className="hover:underline">
                Login
              </a>
              <span className="opacity-50">·</span>
              <a href="/signup" className="hover:underline">
                Sign up
              </a>
              <span className="opacity-50 hidden sm:inline">·</span>
              <a href="/track-order" className="hover:underline hidden sm:inline">
                Track Order
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-1.5">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">
                FasTag<span className="text-primary">India</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <a href="/">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none">
                      Home
                    </NavigationMenuLink>
                  </a>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Buy FASTag</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <ListItem href="/buy-fastag?type=car" title="Private Car" icon={<Car className="h-4 w-4" />}>
                        FASTag for personal vehicles
                      </ListItem>
                      <ListItem
                        href="/buy-fastag?type=commercial"
                        title="Commercial"
                        icon={<Building2 className="h-4 w-4" />}
                      >
                        Trucks, buses, and taxis
                      </ListItem>
                      <ListItem href="/buy-fastag?type=bike" title="Two Wheeler" icon={<Car className="h-4 w-4" />}>
                        FASTag for motorcycles
                      </ListItem>
                      <ListItem
                        href="/buy-fastag?type=fleet"
                        title="Fleet Purchase"
                        icon={<Users className="h-4 w-4" />}
                      >
                        Bulk orders for businesses
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a href="/recharge-fastag">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none">
                      Recharge
                    </NavigationMenuLink>
                  </a>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a href="/pricing">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none">
                      Plans & Fees
                    </NavigationMenuLink>
                  </a>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a href="/toll-rates">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none">
                      Toll Rates
                    </NavigationMenuLink>
                  </a>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Partners</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <ListItem href="/resellers" title="Resellers" icon={<Users className="h-4 w-4" />}>
                        Join our reseller network
                      </ListItem>
                      <ListItem href="/api" title="API & Developers" icon={<Code className="h-4 w-4" />}>
                        Integrate FASTag services
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a href="/support">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none">
                      Support
                    </NavigationMenuLink>
                  </a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side CTAs */}
            <div className="flex items-center gap-2">
              {/* Desktop CTAs */}
              <div className="hidden lg:flex items-center gap-2">
                <a href="/buy-fastag">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Buy FASTag
                  </Button>
                </a>
                <a href="/recharge-fastag">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Recharge
                  </Button>
                </a>
              </div>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <nav className="flex flex-col gap-4 mt-8">
                    <a href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Home
                    </a>
                    <a href="/buy-fastag" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Buy FASTag
                    </a>
                    <a href="/recharge-fastag" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Recharge
                    </a>
                    <a href="/pricing" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Plans & Fees
                    </a>
                    <a href="/toll-rates" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Toll Rates
                    </a>
                    <a href="/resellers" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Resellers
                    </a>
                    <a href="/api" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      API & Partners
                    </a>
                    <a href="/support" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Support
                    </a>
                    <div className="pt-4 border-t space-y-3">
                      <a href="/buy-fastag" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Buy FASTag
                        </Button>
                      </a>
                      <a href="/recharge-fastag" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full border-secondary text-secondary bg-transparent">
                          <Zap className="mr-2 h-4 w-4" />
                          Recharge FASTag
                        </Button>
                      </a>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ListItem({ href, title, icon, children }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}