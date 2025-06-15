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
  Cloud,
  RefreshCw,
  Download,
  Upload,
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  Database,
  HardDrive,
  Lock,
  AlertTriangle,
} from "lucide-react";

// Mock data for cloud providers
const cloudProviders = [
  { id: "google", name: "Google Drive" },
  { id: "dropbox", name: "Dropbox" },
  { id: "onedrive", name: "OneDrive" },
];

// Mock data for backup destinations
const backupDestinations = [
  { id: "local", name: "Local Storage", icon: HardDrive },
  { id: "cloud", name: "Cloud Storage", icon: Cloud },
  { id: "external", name: "External Drive", icon: Database },
];

// Mock data for available backups
const availableBackups = [
  {
    id: 1,
    date: "2024-06-15 14:30",
    size: "2.5 MB",
    type: "Full Backup",
    location: "Google Drive",
  },
  {
    id: 2,
    date: "2024-06-14 10:15",
    size: "2.3 MB",
    type: "Full Backup",
    location: "Local Storage",
  },
  {
    id: 3,
    date: "2024-06-13 18:45",
    size: "2.4 MB",
    type: "Full Backup",
    location: "Google Drive",
  },
];

export default function SyncBackupPage() {
  const [autoSync, setAutoSync] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState("google");
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing" | "error">(
    "synced"
  );
  const [backupFrequency, setBackupFrequency] = useState("daily");
  const [selectedDestination, setSelectedDestination] = useState("local");
  const [encryptBackups, setEncryptBackups] = useState(true);

  const handleSync = async () => {
    setSyncStatus("syncing");
    // Simulate sync delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSyncStatus("synced");
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Sync and Backup</h1>
          <p className="text-muted-foreground">
            Keep your reading data safe and up to date across all your devices.
          </p>
        </div>

        {/* Sync Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Sync Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Automatic Sync</Label>
                <p className="text-sm text-muted-foreground">
                  Keep your reading data synchronized across devices
                </p>
              </div>
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>

            <div className="grid gap-2">
              <Label>Cloud Provider</Label>
              <Select
                value={selectedProvider}
                onValueChange={setSelectedProvider}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cloud provider" />
                </SelectTrigger>
                <SelectContent>
                  {cloudProviders.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Last Sync</Label>
                <p className="text-sm text-muted-foreground">
                  {syncStatus === "synced" && "2024-06-15 14:30"}
                  {syncStatus === "syncing" && "Syncing..."}
                  {syncStatus === "error" && "Error occurred"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {syncStatus === "synced" && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
                {syncStatus === "syncing" && (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                )}
                {syncStatus === "error" && (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <Button
                  variant="outline"
                  onClick={handleSync}
                  disabled={syncStatus === "syncing"}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Backup Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Backup Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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

            <div className="grid gap-2">
              <Label>Backup Destination</Label>
              <div className="grid grid-cols-3 gap-4">
                {backupDestinations.map((dest) => (
                  <Button
                    key={dest.id}
                    variant={
                      selectedDestination === dest.id ? "default" : "outline"
                    }
                    className="flex items-center gap-2"
                    onClick={() => setSelectedDestination(dest.id)}
                  >
                    <dest.icon className="h-4 w-4" />
                    {dest.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Encrypt Backups</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your backups
                </p>
              </div>
              <Switch
                checked={encryptBackups}
                onCheckedChange={setEncryptBackups}
              />
            </div>

            <div className="flex justify-end">
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Create Backup Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Available Backups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Available Backups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableBackups.map((backup) => (
                <div
                  key={backup.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{backup.type}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{backup.date}</span>
                      <span>•</span>
                      <span>{backup.size}</span>
                      <span>•</span>
                      <span>{backup.location}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Restore
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy and Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy and Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4 mt-0.5" />
              <p>
                Your reading data is encrypted during sync and backup. We only
                store essential information needed for the app to function
                properly. You can request a complete data export or deletion at
                any time.
              </p>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4 mt-0.5" />
              <p>
                Regular backups are recommended to prevent data loss. We
                recommend keeping at least one backup in a different location
                than your primary storage.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
