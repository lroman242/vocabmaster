import { useState } from "react";
import { Check, CheckCheck, Circle } from "lucide-react";
import AuthenticatedHeader from "@/components/AuthenticatedHeader";
import { Button } from "@/components/ui/button";
import { mockNotifications, type Notification } from "@/data/mockNotifications";
import { cn } from "@/lib/utils";

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      <main className="container py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                  : "You're all caught up!"}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead} className="gap-2">
                <CheckCheck className="h-4 w-4" />
                Mark all as read
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-4 transition-colors",
                  !notification.read
                    ? "border-primary/20 bg-primary/5"
                    : "border-border bg-card"
                )}
              >
                <div className="mt-1 shrink-0">
                  {notification.read ? (
                    <Check className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Circle className="h-3 w-3 fill-primary text-primary" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        !notification.read ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {notification.title}
                    </p>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                </div>
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0 text-xs"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark read
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
