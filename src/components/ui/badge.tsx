import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline'
}

function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === 'default' && "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        variant === 'secondary' && "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === 'outline' && "text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Badge }