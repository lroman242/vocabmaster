export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New achievement unlocked!",
    message: "You completed 50 words in Spanish. Keep it up!",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Daily streak reminder",
    message: "Don't forget to practice today to keep your 7-day streak!",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "Dictionary shared with you",
    message: "Maria shared 'Business English' dictionary with you.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "4",
    title: "Review due",
    message: "15 words in 'French Basics' are due for review.",
    time: "5 hours ago",
    read: true,
  },
  {
    id: "5",
    title: "Welcome to VocabMaster!",
    message: "Start by creating your first dictionary and adding words.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "6",
    title: "Weekly progress report",
    message: "You learned 32 new words this week. View your stats.",
    time: "2 days ago",
    read: true,
  },
];
