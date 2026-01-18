"use client";

import { useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { ChatInterface } from "@/components/ChatInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Mode = "golden" | "tower";

export default function Home() {
  const [mode, setMode] = useState<Mode>("golden");

  const isGolden = mode === "golden";

  return (
    <div className={cn(
      "flex min-h-screen items-center justify-center p-4 transition-colors",
      isGolden ? "bg-orange-50 dark:bg-orange-950/20" : "bg-blue-50 dark:bg-blue-950/20"
    )}>
      <main className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-3">
          <h1 className={cn(
            "text-5xl font-bold tracking-tight transition-colors",
            isGolden ? "text-orange-600 dark:text-orange-400" : "text-blue-600 dark:text-blue-400"
          )}>
            {isGolden ? "Golden Gate Claude" : "Tower Bridge Claude"}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
            Choose your mode and start chatting
          </p>
        </div>

        <Card className={cn(
          "border-2 shadow-lg transition-colors",
          isGolden 
            ? "border-orange-200 dark:border-orange-800" 
            : "border-blue-200 dark:border-blue-800"
        )}>
          <CardHeader>
            <CardTitle className={cn(
              "text-2xl transition-colors",
              isGolden ? "text-orange-600 dark:text-orange-400" : "text-blue-600 dark:text-blue-400"
            )}>
              Select Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ModeToggle value={mode} onValueChange={setMode} />
          </CardContent>
        </Card>

        <ChatInterface mode={mode} />
      </main>
    </div>
  );
}
