"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Pause, Square, Volume2, VolumeX, RotateCcw } from "lucide-react";

const SPEECH_RATES = [
  { value: "0.5", label: "0.5x - Very Slow" },
  { value: "0.75", label: "0.75x - Slow" },
  { value: "1", label: "1x - Normal" },
  { value: "1.25", label: "1.25x - Fast" },
  { value: "1.5", label: "1.5x - Very Fast" },
];

const DEFAULT_SETTINGS = {
  enabled: false,
  rate: "1",
  volume: 1,
  voice: "default",
};

export default function TextToSpeechPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    stopSpeech();
  };

  const handleRateChange = (value: string) => {
    setSettings({ ...settings, rate: value });
  };

  const handleVolumeChange = (value: number[]) => {
    setSettings({ ...settings, volume: value[0] });
  };

  const handleVoiceChange = (value: string) => {
    setSettings({ ...settings, voice: value });
  };

  const startSpeech = () => {
    if (!settings.enabled) return;

    const utterance = new SpeechSynthesisUtterance(currentText);
    utterance.rate = parseFloat(settings.rate);
    utterance.volume = settings.volume;

    const selectedVoice = availableVoices.find(
      (voice) => voice.name === settings.voice
    );
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Text-to-Speech (TTS)</h1>
          <p className="text-muted-foreground">
            Listen to your book being read aloud.
          </p>
        </div>

        {/* Settings Cards */}
        <div className="grid gap-6">
          {/* Enable TTS */}
          <Card>
            <CardHeader>
              <CardTitle>Enable Text-to-Speech</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="tts-toggle">Turn on Text-to-Speech</Label>
                <Switch
                  id="tts-toggle"
                  checked={settings.enabled}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enabled: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Speech Rate */}
          <Card>
            <CardHeader>
              <CardTitle>Speech Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={settings.rate}
                onValueChange={handleRateChange}
                disabled={!settings.enabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select speech rate" />
                </SelectTrigger>
                <SelectContent>
                  {SPEECH_RATES.map((rate) => (
                    <SelectItem key={rate.value} value={rate.value}>
                      {rate.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Voice Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Voice</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={settings.voice}
                onValueChange={handleVoiceChange}
                disabled={!settings.enabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {availableVoices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Volume Control */}
          <Card>
            <CardHeader>
              <CardTitle>Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Volume: {Math.round(settings.volume * 100)}%</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleReset}
                    className="h-8 w-8"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                <Slider
                  value={[settings.volume]}
                  onValueChange={handleVolumeChange}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full"
                  disabled={!settings.enabled}
                />
              </div>
            </CardContent>
          </Card>

          {/* Playback Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Playback Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={startSpeech}
                  disabled={!settings.enabled || isPlaying}
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={pauseSpeech}
                  disabled={!settings.enabled || !isPlaying}
                >
                  <Pause className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={stopSpeech}
                  disabled={!settings.enabled || !isPlaying}
                >
                  <Square className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Click the play button to hear how the text will sound with
                  your current settings.
                </p>
                <div className="p-4 border rounded-lg bg-muted">
                  <p>
                    The quick brown fox jumps over the lazy dog. This sample
                    text demonstrates how the text-to-speech will sound with
                    your chosen settings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
