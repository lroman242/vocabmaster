import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Bell, Clock, CalendarDays, Link2, Unlink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const DAYS_OF_WEEK = [
  { id: "monday", label: "Mon" },
  { id: "tuesday", label: "Tue" },
  { id: "wednesday", label: "Wed" },
  { id: "thursday", label: "Thu" },
  { id: "friday", label: "Fri" },
  { id: "saturday", label: "Sat" },
  { id: "sunday", label: "Sun" },
];

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return { value: `${hour}:00`, label: `${hour}:00` };
});

const NOTIFICATION_OPTIONS = [
  { value: "5", label: "5 minutes before" },
  { value: "10", label: "10 minutes before" },
  { value: "15", label: "15 minutes before" },
  { value: "30", label: "30 minutes before" },
  { value: "60", label: "1 hour before" },
];

const Settings = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>(["monday", "wednesday", "friday"]);
  const [studyTime, setStudyTime] = useState("09:00");
  const [notificationTime, setNotificationTime] = useState("15");
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock connected calendars state
  const [connectedCalendars, setConnectedCalendars] = useState({
    google: false,
    outlook: false,
    apple: false,
  });

  const handleDayToggle = (dayId: string) => {
    setSelectedDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((d) => d !== dayId)
        : [...prev, dayId]
    );
  };

  const handleSaveSchedule = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Schedule Saved",
      description: "Your study schedule has been updated successfully.",
    });
  };

  const handleConnectCalendar = (provider: "google" | "outlook" | "apple") => {
    setConnectedCalendars((prev) => ({ ...prev, [provider]: true }));
    const providerNames = { google: "Google Calendar", outlook: "Outlook Calendar", apple: "Apple Calendar" };
    toast({
      title: `${providerNames[provider]} Connected`,
      description: `Your ${providerNames[provider]} has been linked successfully.`,
    });
  };

  const handleDisconnectCalendar = (provider: "google" | "outlook" | "apple") => {
    setConnectedCalendars((prev) => ({ ...prev, [provider]: false }));
    const providerNames = { google: "Google Calendar", outlook: "Outlook Calendar", apple: "Apple Calendar" };
    toast({
      title: `${providerNames[provider]} Disconnected`,
      description: `Your ${providerNames[provider]} has been unlinked.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/dictionaries" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        {/* Study Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CalendarDays className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Study Schedule</CardTitle>
                  <CardDescription>Choose which days you want to study</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Days of Week */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Days of the week</Label>
                <div className="flex flex-wrap gap-2">
                  {DAYS_OF_WEEK.map((day) => (
                    <button
                      key={day.id}
                      onClick={() => handleDayToggle(day.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedDays.includes(day.id)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Study Time */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Preferred study time</Label>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <Select value={studyTime} onValueChange={setStudyTime}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {HOURS.map((hour) => (
                        <SelectItem key={hour.value} value={hour.value}>
                          {hour.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSaveSchedule} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Schedule"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Set up reminders for your study sessions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Remind me</Label>
                <Select value={notificationTime} onValueChange={setNotificationTime}>
                  <SelectTrigger className="w-full sm:w-[240px]">
                    <SelectValue placeholder="Select notification time" />
                  </SelectTrigger>
                  <SelectContent>
                    {NOTIFICATION_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="push-notifications" defaultChecked />
                <Label htmlFor="push-notifications" className="text-sm">
                  Enable push notifications
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="email-notifications" />
                <Label htmlFor="email-notifications" className="text-sm">
                  Send email reminders
                </Label>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* External Calendars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>External Calendars</CardTitle>
                  <CardDescription>Sync your study sessions with your calendar</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Google Calendar */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.51 5.06-1.39l-2.08-1.61c-.91.41-1.93.64-2.98.64-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5c1.95 0 3.72.75 5.06 1.97L19.54 4C17.57 2.19 14.94 1 12 1 5.92 1 1 5.92 1 12s4.92 11 11 11c5.52 0 10-4.48 10-10z"/>
                    <path fill="#34A853" d="M12 22c2.76 0 5.26-1 7.18-2.64l-3.42-2.65c-.95.64-2.16 1.02-3.76 1.02-2.89 0-5.34-1.95-6.21-4.58l-3.54 2.74C4.51 19.58 7.99 22 12 22z"/>
                    <path fill="#FBBC05" d="M5.79 13.15c-.23-.69-.36-1.42-.36-2.15s.13-1.46.36-2.15L2.25 6.11C1.45 7.66 1 9.42 1 11.25c0 1.83.45 3.59 1.25 5.14l3.54-2.74z"/>
                    <path fill="#EA4335" d="M12 4.5c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.99 0 4.51 2.42 2.25 6.11l3.54 2.74c.87-2.63 3.32-4.35 6.21-4.35z"/>
                  </svg>
                  <div>
                    <p className="font-medium">Google Calendar</p>
                    {connectedCalendars.google && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Check className="w-3 h-3 text-primary" /> Connected
                      </p>
                    )}
                  </div>
                </div>
                {connectedCalendars.google ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDisconnectCalendar("google")}
                  >
                    <Unlink className="w-4 h-4 mr-2" />
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleConnectCalendar("google")}
                  >
                    <Link2 className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                )}
              </div>

              <Separator />

              {/* Outlook Calendar */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#0078D4" d="M24 7.387v10.478c0 .23-.08.424-.238.576-.158.152-.354.228-.588.228h-8.212v-6.282l1.672 1.19c.098.07.212.104.342.104.13 0 .244-.034.342-.104l6.444-4.588c.098-.08.158-.174.178-.282a.415.415 0 0 0-.026-.32.412.412 0 0 0-.412-.228h-.052a.663.663 0 0 0-.286.114l-6.18 4.406-1.022-.728V5.773h8.212c.234 0 .43.076.588.228a.77.77 0 0 1 .238.576v.81zm-10.038-2.614v15.454H2.538A2.538 2.538 0 0 1 0 17.69V6.31a2.538 2.538 0 0 1 2.538-2.537h11.424zM8.654 8.463c-.672-.316-1.376-.474-2.112-.474-.736 0-1.434.158-2.094.474a3.65 3.65 0 0 0-1.488 1.33c-.364.57-.546 1.216-.546 1.94 0 .71.182 1.352.546 1.926.364.574.86 1.024 1.488 1.35.628.326 1.332.49 2.112.49.78 0 1.484-.164 2.112-.49a3.708 3.708 0 0 0 1.488-1.35c.364-.574.546-1.216.546-1.926 0-.724-.182-1.37-.546-1.94a3.65 3.65 0 0 0-1.506-1.33zm-.684 4.59c-.39.444-.882.666-1.476.666s-1.086-.222-1.476-.666c-.39-.444-.584-.994-.584-1.65 0-.656.194-1.206.584-1.65.39-.444.882-.666 1.476-.666s1.086.222 1.476.666c.39.444.584.994.584 1.65 0 .656-.194 1.206-.584 1.65z"/>
                  </svg>
                  <div>
                    <p className="font-medium">Outlook Calendar</p>
                    {connectedCalendars.outlook && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Check className="w-3 h-3 text-primary" /> Connected
                      </p>
                    )}
                  </div>
                </div>
                {connectedCalendars.outlook ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDisconnectCalendar("outlook")}
                  >
                    <Unlink className="w-4 h-4 mr-2" />
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleConnectCalendar("outlook")}
                  >
                    <Link2 className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                )}
              </div>

              <Separator />

              {/* Apple Calendar */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <p className="font-medium">Apple Calendar</p>
                    {connectedCalendars.apple && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Check className="w-3 h-3 text-primary" /> Connected
                      </p>
                    )}
                  </div>
                </div>
                {connectedCalendars.apple ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDisconnectCalendar("apple")}
                  >
                    <Unlink className="w-4 h-4 mr-2" />
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleConnectCalendar("apple")}
                  >
                    <Link2 className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Settings;
