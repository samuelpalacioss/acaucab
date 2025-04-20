"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { FormControl } from "./form";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const innerRef = React.useRef<HTMLInputElement>(null);

    // Combinamos la ref externa con la nuestra
    const handleRef = React.useCallback(
      (el: HTMLInputElement) => {
        innerRef.current = el;

        if (typeof ref === "function") {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
      },
      [ref]
    );

    const toggleVisibility = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setShowPassword((prev) => !prev);

      setTimeout(() => {
        if (innerRef.current) {
          innerRef.current.focus();

          // Intentamos mantener la posición del cursor
          const end = innerRef.current.value.length;
          innerRef.current.setSelectionRange(end, end);
        }
      }, 10);
    }, []);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(className)}
          ref={handleRef}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={toggleVisibility}
          tabIndex={-1}
          onMouseDown={(e) => e.preventDefault()}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
