import * as React from 'react';
import { useState } from 'react';
import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  showArrow?: boolean;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        metallic:
          "bg-gradient-to-r from-[#D4AF37] to-[#4A3F1F] text-white shadow-sm hover:from-[#E6C84F] hover:to-[#5A4F2F] border border-[#FFD700]/300",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, showArrow = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{props.children}</span>
        
        {variant === "metallic" && (
          <span
            className="absolute inset-0 z-0 shimmer-effect"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0), rgba(255, 215, 0, 0.5), rgba(0,0,0,0))',
              backgroundSize: '200% 100%',
            }}
          />
        )}
        
        {showArrow && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
        
        <style>
          {`
            @keyframes shimmer {
              0% {
                background-position: 200% 0;
              }
              100% {
                background-position: -200% 0;
              }
            }
            
            .shimmer-effect {
              animation: shimmer 3s infinite linear;
              animation-play-state: running !important;
              will-change: background-position;
            }
            
            button:hover .shimmer-effect {
              animation: shimmer 1.5s infinite linear;
            }
            
            @keyframes flair {
              0% {
                transform: translateX(-100%);
                opacity: 0;
              }
              5% {
                transform: translateX(0%);
                opacity: 1;
              }
              10% {
                transform: translateX(100%);
                opacity: 1;
              }
              100% {
                transform: translateX(100%);
                opacity: 0;
              }
            }
          `}
        </style>
      </Comp>
    );
  }
);

Button.displayName = "Button";
        
export { Button, buttonVariants };