import { useState, useRef, useEffect, ReactNode } from "react";

export interface ContextMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  children: ReactNode;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ items, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const x = e.clientX;
    const y = e.clientY;

    setPosition({ x, y });
    setIsOpen(true);
  };

  const handleItemClick = (item: ContextMenuItem) => {
    if (!item.disabled) {
      item.onClick();
      setIsOpen(false);
    }
  };

  return (
    <>
      <div onContextMenu={handleContextMenu}>{children}</div>

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed z-50 w-56 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          {items.map((item, index) => (
            <div key={index}>
              {item.divider ? (
                <div className="my-1 border-t border-gray-200 dark:border-gray-700" />
              ) : (
                <button
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition ${
                    item.disabled
                      ? "cursor-not-allowed text-gray-400 dark:text-gray-600"
                      : item.danger
                        ? "text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/20"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.icon && (
                    <span className="flex h-4 w-4 items-center justify-center">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ContextMenu;
