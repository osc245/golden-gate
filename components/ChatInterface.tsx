"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Mode = "golden" | "tower";

interface ChatInterfaceProps {
  mode: Mode;
}

export function ChatInterface({ mode }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isGolden = mode === "golden";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to get response");
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2 sm:gap-3">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What would you like to know?"
            disabled={loading}
            className={cn(
              "flex-1 text-base sm:text-lg py-3 sm:py-6 px-3 sm:px-4 border-2 shadow-md transition-colors bg-white dark:bg-gray-900",
              isGolden 
                ? "focus:border-orange-400 dark:focus:border-orange-600" 
                : "focus:border-blue-400 dark:focus:border-blue-600"
            )}
          />
          <Button 
            type="submit" 
            disabled={loading || !message.trim()}
            className={cn(
              "text-white font-bold text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-6 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
              isGolden 
                ? "bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600" 
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            )}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>

      {error && (
        <Card className="border-2 border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950/20 shadow-lg">
          <CardContent className="pt-6">
            <p className="text-red-700 dark:text-red-400 font-medium">
              {error}
            </p>
          </CardContent>
        </Card>
      )}

      {response && (
        <Card className={cn(
          "border-2 shadow-xl transition-colors",
          isGolden 
            ? "border-orange-200 dark:border-orange-800" 
            : "border-blue-200 dark:border-blue-800"
        )}>
          <CardContent className="pt-6">
            <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
              {response}
            </p>
          </CardContent>
        </Card>
      )}

      {loading && (
        <Card className={cn(
          "border-2 shadow-lg transition-colors",
          isGolden 
            ? "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20" 
            : "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20"
        )}>
          <CardContent className="pt-6">
            <p className={cn(
              "text-lg font-medium",
              isGolden 
                ? "text-orange-700 dark:text-orange-400" 
                : "text-blue-700 dark:text-blue-400"
            )}>
              Thinking...
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
