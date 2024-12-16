import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

export const Tabs = ({ defaultValue, children, className, onTabChange }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  const tabsList = React.Children.toArray(children).find(
    (child) => child.type.displayName === "TabsList",
  );

  const tabsContent = React.Children.toArray(children).filter(
    (child) => child.type.displayName === "TabsContent",
  );

  // Handle tab change
  const handleTabChange = (newTabValue) => {
    setActiveTab(newTabValue);
    if (onTabChange) {
      onTabChange(newTabValue); // Pass the new active tab value to parent
    }
  };

  return (
    <div className={clsx("tabs", className)}>
      <div className="tabs-list flex space-x-4">
        {React.Children.map(tabsList.props.children, (trigger) =>
          React.cloneElement(trigger, {
            isActive: trigger.props.value === activeTab,
            onClick: () => handleTabChange(trigger.props.value),
          }),
        )}
      </div>

      <div className="tabs-content mt-4">
        {tabsContent.map((content) =>
          content.props.value === activeTab ? content.props.children : null,
        )}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onTabChange: PropTypes.func, // Optional function for handling active tab changes
};
export const TabsList = ({ children, className }) => (
  <div className={className}>{children}</div>
);

TabsList.displayName = "TabsList";

// eslint-disable-next-line no-unused-vars
export const TabsTrigger = ({ value, isActive, onClick = {}, children }) => (
  <button
    className={clsx(
      "px-4 py-2 text-sm font-medium",
      isActive
        ? "border-b-2 border-blue-500 text-blue-500"
        : "text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-400",
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

TabsTrigger.propTypes = {
  value: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line no-unused-vars
export const TabsContent = ({ value, children, className }) => (
  <div className={className}>{children}</div>
);

TabsContent.displayName = "TabsContent";

TabsContent.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
