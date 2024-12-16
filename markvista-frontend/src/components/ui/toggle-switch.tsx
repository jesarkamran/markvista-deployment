import React from "react";
import { Switch } from "@/components/ui/switch";
import { Check, X } from "lucide-react";

interface ToggleSwitchProps {
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
}

export default function ToggleSwitch({
  isChecked,
  onToggle,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={isChecked}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-blue-700"
      >
        <div className="flex h-5 w-5 items-center justify-center">
          {isChecked ? (
            <Check className="h-4 w-4 text-white" />
          ) : (
            <X className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </Switch>
    </div>
  );
}
