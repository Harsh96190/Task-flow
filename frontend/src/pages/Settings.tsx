import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Monitor, User, Bell, Shield, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [taskReminders, setTaskReminders] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun, description: 'Light theme' },
    { value: 'dark', label: 'Dark', icon: Moon, description: 'Dark theme' },
    { value: 'system', label: 'System', icon: Monitor, description: 'Use system preference' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>

        {/* Appearance */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Appearance</CardTitle>
            </div>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Theme</Label>
              <RadioGroup value={theme} onValueChange={(value) => setTheme(value as any)}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {themeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <label
                        key={option.value}
                        className="relative flex cursor-pointer"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className="peer sr-only"
                        />
                        <div className="flex flex-1 items-center gap-3 rounded-lg border-2 border-border p-4 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all hover:border-primary/50">
                          <Icon className="h-5 w-5 text-muted-foreground peer-data-[state=checked]:text-primary" />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{option.label}</div>
                            <div className="text-xs text-muted-foreground">{option.description}</div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Notifications</CardTitle>
            </div>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="email-notifications" className="text-sm font-medium">
                  Email notifications
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Receive email updates about your tasks
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="push-notifications" className="text-sm font-medium">
                  Push notifications
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Receive push notifications in your browser
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="task-reminders" className="text-sm font-medium">
                  Task reminders
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Get reminded about upcoming due dates
                </p>
              </div>
              <Switch
                id="task-reminders"
                checked={taskReminders}
                onCheckedChange={setTaskReminders}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="project-updates" className="text-sm font-medium">
                  Project updates
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Stay informed about project changes
                </p>
              </div>
              <Switch
                id="project-updates"
                checked={projectUpdates}
                onCheckedChange={setProjectUpdates}
              />
            </div>
          </CardContent>
        </Card>

       
        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
            </div>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove all your data from our servers, including all your projects
                    and tasks.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
