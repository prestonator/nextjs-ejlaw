import * as React from "react";
import { cn } from "@/utils";

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-xs",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="header"
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      data-slot="title"
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <p
      data-slot="description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div data-slot="content" className={cn("p-6 pt-0", className)} {...props} />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="footer"
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
