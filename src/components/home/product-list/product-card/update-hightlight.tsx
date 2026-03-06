"use client";
import type * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function UpdateHighlight({
  updatedAt,
  children,
}: {
  updatedAt: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    const diff = Math.abs(now.getTime() - new Date(`${updatedAt} Z`).getTime());

    if (diff < 10000) {
      ref.current?.animate(
        [
          { outline: "2px solid #3b82f6", offset: 0 },
          { outline: "2px solid #3b82f6", offset: 0.66 },
          { outline: "2px solid transparent", offset: 1 },
        ],
        { duration: 3000 },
      );
    }
  }, [updatedAt]);
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="w-fit" ref={ref}>
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" align="start" className="w-fit">
        <TimeSinceUpdate updatedAt={new Date(`${updatedAt} Z`)} />
      </TooltipContent>
    </Tooltip>
  );
}

export function TimeSinceUpdate({ updatedAt }: { updatedAt: Date }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(Math.floor((Date.now() - updatedAt.getTime()) / 1000));

    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - updatedAt.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [updatedAt]);

  const format = (seconds: number) => {
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600)
      return `${Math.floor(seconds / 60)}m ${seconds % 60}s ago`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m ago`;
  };

  return <span className="text-xs font-mono">{format(elapsed)}</span>;
}
