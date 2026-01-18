"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Mode = "golden" | "tower";

interface ModeToggleProps {
  value: Mode;
  onValueChange: (value: Mode) => void;
}

export function ModeToggle({ value, onValueChange }: ModeToggleProps) {
  return (
    <RadioGroup value={value} onValueChange={onValueChange} className="space-y-4">
      <div 
        onClick={() => onValueChange("golden")}
        className={cn(
          "flex items-center space-x-3 p-4 rounded-lg transition-all border-2 cursor-pointer",
          value === "golden" 
            ? "bg-orange-50 dark:bg-orange-950/40 border-orange-300 dark:border-orange-700" 
            : "hover:bg-orange-50 dark:hover:bg-orange-950/30 border-transparent hover:border-orange-200 dark:hover:border-orange-800"
        )}
      >
        <RadioGroupItem 
          value="golden" 
          id="golden" 
          className={cn(
            "border-2 pointer-events-none",
            value === "golden" 
              ? "border-orange-500 dark:border-orange-400 data-[state=checked]:bg-orange-500 dark:data-[state=checked]:bg-orange-400" 
              : "border-gray-300 dark:border-gray-600"
          )} 
        />
        <Label htmlFor="golden" className="cursor-pointer text-lg font-semibold text-orange-700 dark:text-orange-400 flex items-center gap-2 pointer-events-none">
          🌉 Golden Gate Claude
        </Label>
      </div>
      <div 
        onClick={() => onValueChange("tower")}
        className={cn(
          "flex items-center space-x-3 p-4 rounded-lg transition-all border-2 cursor-pointer",
          value === "tower" 
            ? "bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700" 
            : "hover:bg-blue-50 dark:hover:bg-blue-950/30 border-transparent hover:border-blue-200 dark:hover:border-blue-800"
        )}
      >
        <RadioGroupItem 
          value="tower" 
          id="tower" 
          className={cn(
            "border-2 pointer-events-none",
            value === "tower" 
              ? "border-blue-500 dark:border-blue-400 data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-400" 
              : "border-gray-300 dark:border-gray-600"
          )} 
        />
        <Label htmlFor="tower" className="cursor-pointer text-lg font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2 pointer-events-none">
          🏰 Tower Bridge Claude
        </Label>
      </div>
    </RadioGroup>
  );
}
