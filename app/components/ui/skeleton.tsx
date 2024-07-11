import { cn } from "@/app/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-md rounded-t bg-[#3c3c3c] bg-gradient-to-r from-[#3c3c3c] via-[#303030] to-[#3c3c3c] bg-[length:200%_100%] animate-skeleton-shine", className)}
      {...props}
    />
  )
}

export { Skeleton }
