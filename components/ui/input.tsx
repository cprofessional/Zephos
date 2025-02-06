"use client";

import * as React from "react";
import { cn } from "@/lib/utils";


let inputValue = false;

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({type, value, ...props }, ref) => {
    return (
      <input
        placeholder="IWantToKillMyself-GPT"
        type={type}
        value={value}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "pl-12 pr-24 py-6 bg-transparent border-none focus-visible:ring-0 placeholder:text-gray-400"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input,  inputValue };
