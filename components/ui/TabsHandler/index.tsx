"use client";
import React, {
  useCallback,
  useState,
  useMemo,
  ComponentProps,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  triggerVariants,
} from "../tabs";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { VariantProps } from "class-variance-authority";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

export interface TabData {
  name: string | React.ReactNode;
  value: string;
  content: ReactNode;
  description?: string;
}

interface Props {
  tabs: TabData[];
}

export const TabsHandler = ({
  tabs,
  className,
  variant,
  value: controlledValue,
  onValueChange: controlledOnValueChange,
  ...props
}: VariantProps<typeof triggerVariants> &
  ComponentProps<typeof TabsPrimitive.Root> &
  Props) => {
  const initialTab = (props?.defaultValue || tabs[0]?.value) ?? "";
  const [queryActiveTab, setQueryActiveTab] = useQueryState("active-tab");
  const isControlled = controlledValue !== undefined;
  const [internalActiveTab, setInternalActiveTab] = useState(
    (tabs?.find((tab) => tab.value === queryActiveTab) && queryActiveTab) ||
      initialTab
  );
  const activeTab = isControlled ? controlledValue : internalActiveTab;
  const [renderedTabs, setRenderedTabs] = useState(() => new Set([initialTab]));
  const renderedTabsRef = useRef(renderedTabs);
  renderedTabsRef.current = renderedTabs;

  const handleTabChange = useCallback(
    (value: string) => {
      if (isControlled && controlledOnValueChange) {
        controlledOnValueChange(value);
      } else {
        setInternalActiveTab(value);
        setQueryActiveTab(value);
      }
      if (!renderedTabsRef.current.has(value)) {
        setRenderedTabs((prev) => new Set([...prev, value]));
      }
    },
    [isControlled, controlledOnValueChange, setQueryActiveTab]
  );

  const tabTriggers = useMemo(
    () =>
      tabs.map((tab) => (
        <TabsTrigger key={tab.value} value={tab.value} variant={variant}>
          {tab.name}
        </TabsTrigger>
      )),
    [tabs, variant]
  );

  const locale = useLocale();
  const dir = locale === "ar" || locale === "he" ? "rtl" : "ltr";

  const tabContents = useMemo(
    () =>
      tabs.map((tab) => {
        const isLoaded = renderedTabs.has(tab.value);
        const Content = tab.content;
        return (
          <TabsContent key={tab.value} value={tab.value} dir={dir}>
            {isLoaded && Content}
          </TabsContent>
        );
      }),
    [tabs, renderedTabs, dir]
  );

  useEffect(() => {
    if (isControlled && controlledValue) {
      setQueryActiveTab(controlledValue);
    }
  }, [isControlled, controlledValue, setQueryActiveTab]);

  useEffect(() => {
    if (
      !isControlled &&
      queryActiveTab &&
      !renderedTabsRef.current.has(queryActiveTab)
    ) {
      setRenderedTabs((prev) => new Set([...prev, queryActiveTab]));
    }
  }, [queryActiveTab, isControlled]);

  useEffect(() => {
    if (
      isControlled &&
      controlledValue &&
      !renderedTabsRef.current.has(controlledValue)
    ) {
      setRenderedTabs((prev) => new Set([...prev, controlledValue]));
    }
  }, [isControlled, controlledValue]);

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} {...props}>
      <TabsList variant={variant} className={cn(className)}>
        {tabTriggers}
      </TabsList>
      {tabContents}
    </Tabs>
  );
};
