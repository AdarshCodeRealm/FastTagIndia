import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Phone, Menu, Zap, CreditCard, Building2, Users, Code, Car, User, LogOut, CheckCircle2, RefreshCw, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
    setIsOpen(false);
  };

  const handleAuthenticatedAction = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate(path); // Will trigger auth popup on the page
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Strip */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Support:</span>
              <span className="font-medium">+91 9172727232</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" />
              <span className="font-medium">Instant FASTag activation | Powered by <a href="https://nexaraintl.com/" target="_blank" className="text-white underline">Nexara International Private Limited</a></span>
            </div>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-300" />
                    <span className="hidden sm:inline">Welcome, {user?.name?.split(' ')[0]}</span>
                    <span className="sm:hidden">Welcome!</span>
                  </div>
                  <span className="opacity-50">·</span>
                  <button onClick={handleLogout} className="hover:underline">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                  <span className="opacity-50">·</span>
                  <Link to="/signup" className="hover:underline">
                    Sign up
                  </Link>
                </>
              )}
              <span className="opacity-50 hidden sm:inline">·</span>
              <Link to="/track-order" className="hover:underline hidden sm:inline">
                Track Order
              </Link>
              <span className="opacity-50">·</span>
              <Link 
                to="/admin/login" 
                className="flex items-center gap-1 hover:underline text-orange-200 hover:text-white transition-colors"
                title="Admin Portal Access"
              >
                <Shield className="h-3 w-3" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-1.5">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">
                FastTag<span className="text-primary">INDIA</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none">
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Buy FASTag</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <ListItem 
                        onClick={() => handleAuthenticatedAction('/buy-fastag?type=car')} 
                        title="Private Car" 
                        icon={<Car className="h-4 w-4" />}
                      >
                        FASTag for personal vehicles
                      </ListItem>
                      <ListItem
                        onClick={() => handleAuthenticatedAction('/buy-fastag?type=commercial')}
                        title="Commercial"
                        icon={<Building2 className="h-4 w-4" />}
                      >
                        Trucks, buses, and taxis
                      </ListItem>
                      <ListItem 
                        onClick={() => handleAuthenticatedAction('/buy-fastag?type=bike')} 
                        title="Two Wheeler" 
                        icon={<Car className="h-4 w-4" />}
                      >
                        FASTag for motorcycles
                      </ListItem>
                      <ListItem
                        onClick={() => handleAuthenticatedAction('/buy-fastag?type=fleet')}
                        title="Fleet Purchase"
                        icon={<Users className="h-4 w-4" />}
                      >
                        Bulk orders for businesses
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button onClick={() => handleAuthenticatedAction('/recharge-fastag')}>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none">
                      Recharge
                    </NavigationMenuLink>
                  </button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/toll-rates">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none">
                      Toll Rates
                    </NavigationMenuLink>
                  </Link>
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
                  <Link to="/support">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none">
                      Support
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side CTAs */}
            <div className="flex items-center gap-2">
              {/* User Account Section */}
              {isAuthenticated && (
                <div className="hidden lg:flex items-center gap-2 mr-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{user?.name?.split(' ')[0]}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Desktop CTAs */}
              <div className="hidden lg:flex items-center gap-2">
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => handleAuthenticatedAction('/buy-fastag')}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Buy FASTag
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                  onClick={() => handleAuthenticatedAction('/recharge-fastag')}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Recharge
                </Button>
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
                  
                  {/* Mobile User Info */}
                  {isAuthenticated && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg mb-6 mt-6">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-green-800">{user?.name}</p>
                        <p className="text-sm text-green-600">{user?.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="text-green-600 hover:text-green-800"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <nav className="flex flex-col gap-4 mt-8">
                    <Link to="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Home
                    </Link>
                    <button 
                      className="text-lg font-medium text-left" 
                      onClick={() => {
                        setIsOpen(false)
                        handleAuthenticatedAction('/buy-fastag')
                      }}
                    >
                      Buy FASTag
                    </button>
                    <button 
                      className="text-lg font-medium text-left" 
                      onClick={() => {
                        setIsOpen(false)
                        handleAuthenticatedAction('/recharge-fastag')
                      }}
                    >
                      Recharge
                    </button>
                    <Link to="/toll-rates" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Toll Rates
                    </Link>
                    <Link to="/track-order" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Track Order
                    </Link>
                    <Link to="/resellers" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Resellers
                    </Link>
                    <Link to="/api" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      API & Partners
                    </Link>
                    <Link to="/support" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Support
                    </Link>

                    {/* Admin Link in Mobile Menu */}
                    <div className="pt-2 border-t">
                      <Link 
                        to="/admin/login" 
                        className="flex items-center gap-2 text-lg font-medium text-orange-600 hover:text-orange-700 transition-colors" 
                        onClick={() => setIsOpen(false)}
                      >
                        <Shield className="h-5 w-5" />
                        Admin Portal
                      </Link>
                    </div>
                    
                    <div className="pt-4 border-t space-y-3">
                      {!isAuthenticated && (
                        <div className="space-y-2 mb-4">
                          <Link to="/login" onClick={() => setIsOpen(false)}>
                            <Button variant="outline" className="w-full">
                              <User className="mr-2 h-4 w-4" />
                              Login
                            </Button>
                          </Link>
                          <Link to="/signup" onClick={() => setIsOpen(false)}>
                            <Button variant="ghost" className="w-full">
                              Sign up for Access
                            </Button>
                          </Link>
                        </div>
                      )}
                      
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => {
                          setIsOpen(false)
                          handleAuthenticatedAction('/buy-fastag')
                        }}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Buy FASTag
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-secondary text-secondary bg-transparent"
                        onClick={() => {
                          setIsOpen(false)
                          handleAuthenticatedAction('/recharge-fastag')
                        }}
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        Recharge FASTag
                      </Button>
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

function ListItem({ href, onClick, title, icon, children }) {
  const content = (
    <>
      <div className="flex items-center gap-2 text-sm font-medium leading-none">
        {icon}
        {title}
      </div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">{children}</p>
    </>
  );

  if (onClick) {
    return (
      <li>
        <button
          onClick={onClick}
          className={cn(
            "w-full text-left block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
          )}
        >
          {content}
        </button>
      </li>
    );
  }

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
          )}
        >
          {content}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}