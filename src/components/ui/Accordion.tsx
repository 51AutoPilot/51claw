"use client";

import { useState, useCallback } from "react";

interface AccordionItem {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  exclusive?: boolean;
  className?: string;
}

export default function Accordion({
  items,
  exclusive = false,
  className = "",
}: AccordionProps) {
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());

  const toggle = useCallback(
    (key: string) => {
      setOpenKeys((prev) => {
        const next = new Set(prev);
        if (next.has(key)) {
          next.delete(key);
        } else {
          if (exclusive) next.clear();
          next.add(key);
        }
        return next;
      });
    },
    [exclusive]
  );

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openKeys.has(item.key);
        return (
          <div
            key={item.key}
            className="overflow-hidden rounded-lg border border-card-border bg-card-bg transition-colors duration-200 hover:border-primary/20"
          >
            <button
              onClick={() => toggle(item.key)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-sm font-medium text-foreground">
                {item.title}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={`text-text-muted transition-transform duration-300 ease-out ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <polyline points="4,6 8,10 12,6" />
              </svg>
            </button>

            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-card-border px-5 py-4 text-sm leading-relaxed text-text-muted">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
