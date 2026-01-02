import { memo, Suspense } from "react";
import { TabData } from ".";

interface TabContentWrapperProps {
  tab: TabData;
  isActive: boolean;
  isLoaded: boolean;
}

export const TabContentWrapper = memo(
  function TabContentWrapper({
    tab,
    isActive,
    isLoaded,
  }: TabContentWrapperProps) {
    if (!isLoaded) return null;

    return (
      <div
        className="animate-in fade-in-50 duration-200 direction"
        style={{ display: isActive ? "block" : "none" }}
      >
        <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
          {tab.content}
        </Suspense>
      </div>
    );
  },
  (prev, next) =>
    prev.isActive === next.isActive &&
    prev.isLoaded === next.isLoaded &&
    prev.tab.value === next.tab.value
);
