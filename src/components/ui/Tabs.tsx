"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Tab {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeKey?: string;
  onChange?: (key: string) => void;
  className?: string;
}

export default function Tabs({
  tabs,
  activeKey: controlledKey,
  onChange,
  className = "",
}: TabsProps) {
  const [internalKey, setInternalKey] = useState(tabs[0]?.key ?? "");
  const activeKey = controlledKey ?? internalKey;

  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const updateIndicator = useCallback(() => {
    const el = tabRefs.current.get(activeKey);
    if (el) {
      const parent = el.parentElement;
      if (parent) {
        setIndicator({
          left: el.offsetLeft - parent.offsetLeft,
          width: el.offsetWidth,
        });
      }
    }
  }, [activeKey]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  const handleClick = (key: string) => {
    if (onChange) {
      onChange(key);
    } else {
      setInternalKey(key);
    }
  };

  const activeTab = tabs.find((t) => t.key === activeKey);

  return (
    <div className={className}>
      {/* Tab buttons */}
      <div className="relative flex border-b border-card-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.key, el);
            }}
            onClick={() => handleClick(tab.key)}
            className={`relative px-5 py-3 text-sm font-medium transition-colors duration-200 ${
              activeKey === tab.key
                ? "text-primary-light"
                : "text-text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}

        {/* Animated indicator */}
        <div
          className="absolute bottom-0 h-0.5 bg-gradient-to-r from-primary to-primary-light transition-all duration-300 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
      </div>

      {/* Tab content */}
      <div className="pt-5">
        {activeTab && (
          <div
            key={activeTab.key}
            className="animate-[fadeIn_0.2s_ease-out]"
          >
            {activeTab.content}
          </div>
        )}
      </div>
    </div>
  );
}
