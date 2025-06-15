"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
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
} from "@/components/ui/alert-dialog";
import {
  BookOpen,
  Bell,
  Globe,
  Palette,
  Highlighter,
  Save,
  Clock,
  Cloud,
  RefreshCw,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

// Mock data for languages
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
];

// Mock data for themes
const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export default function PreferencesPage() {
  const [defaultView, setDefaultView] = useState("single");
  const [defaultZoom, setDefaultZoom] = useState(100);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("system");
  const [highlightColor, setHighlightColor] = useState("#FFEB3B");
  const [quietHours, setQuietHours] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState("daily");

  const handleReset = () => {
    // Reset all preferences to default values
    setDefaultView("single");
    setDefaultZoom(100);
    setLanguage("en");
    setTheme("system");
    setHighlightColor("#FFEB3B");
    setQuietHours(false);
    setAutoSave(true);
    setFocusMode(false);
    setAutoSync(true);
    setBackupFrequency("daily");
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Your Preferences</h1>
          <p className="text-muted-foreground">
            Customize your reading and app experience.
          </p>
        </div>

        {/* Reading Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Reading Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Default View</Label>
                <Select value={defaultView} onValueChange={setDefaultView}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select default view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Page</SelectItem>
                    <SelectItem value="spread">Two-Page Spread</SelectItem>
                    <SelectItem value="continuous">
                      Continuous Scroll
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Default Zoom Level</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[defaultZoom]}
                    onValueChange={([value]) => setDefaultZoom(value)}
                    min={50}
                    max={200}
                    step={10}
                    className="flex-1"
                  />
                  <span className="w-12 text-right">{defaultZoom}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>In-App Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for new assignments and updates
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Quiet Hours</Label>
                <p className="text-sm text-muted-foreground">
                  Pause notifications during study time
                </p>
              </div>
              <Switch checked={quietHours} onCheckedChange={setQuietHours} />
            </div>
          </CardContent>
        </Card>

        {/* Language and Theme */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Language and Theme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  {themes.map((t) => (
                    <Button
                      key={t.value}
                      variant={theme === t.value ? "default" : "outline"}
                      className="flex items-center gap-2"
                      onClick={() => setTheme(t.value)}
                    >
                      <t.icon className="h-4 w-4" />
                      {t.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Study Tools Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Highlighter className="h-5 w-5" />
              Study Tools Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Default Highlight Color</Label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={highlightColor}
                  onChange={(e) => setHighlightColor(e.target.value)}
                  className="h-8 w-8 rounded cursor-pointer"
                />
                <span className="text-sm text-muted-foreground">
                  {highlightColor}
                </span>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Save Notes</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save your notes and highlights
                </p>
              </div>
              <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Focus Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Minimize distractions while reading
                </p>
              </div>
              <Switch checked={focusMode} onCheckedChange={setFocusMode} />
            </div>
          </CardContent>
        </Card>

        {/* Sync and Backup Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Sync and Backup Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Sync</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically sync your data across devices
                </p>
              </div>
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label>Backup Frequency</Label>
              <Select
                value={backupFrequency}
                onValueChange={setBackupFrequency}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select backup frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reset to Defaults */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset Preferences</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to reset all preferences to their default
                values? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset}>
                Reset Preferences
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
