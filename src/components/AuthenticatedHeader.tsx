import { Link } from "react-router-dom";
import { Book, Bell, User, Settings, LogOut, Check, Circle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { mockNotifications } from "@/data/mockNotifications";
import { cn } from "@/lib/utils";

const AuthenticatedHeader = () => {
  const recentNotifications = mockNotifications.slice(0, 4);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/dictionaries" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Book className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">VocabMaster</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h4 className="text-sm font-semibold text-foreground">Notifications</h4>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {recentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-3 border-b border-border px-4 py-3 last:border-0",
                      !notification.read && "bg-primary/5"
                    )}
                  >
                    <div className="mt-1 shrink-0">
                      {notification.read ? (
                        <Check className="h-3 w-3 text-muted-foreground" />
                      ) : (
                        <Circle className="h-2.5 w-2.5 fill-primary text-primary" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className={cn(
                        "text-sm",
                        !notification.read ? "font-medium text-foreground" : "text-muted-foreground"
                      )}>
                        {notification.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border p-2">
                <Button variant="ghost" className="w-full text-sm" asChild>
                  <Link to="/notifications">View all notifications</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">john@example.com</span>
                </div>
              </div>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
};

export default AuthenticatedHeader;
