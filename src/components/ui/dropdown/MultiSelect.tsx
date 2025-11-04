import { useState, useRef, useEffect, ReactNode } from "react";

export interface MultiSelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  label?: string;
  maxSelection?: number;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select options",
  searchable = false,
  disabled = false,
  className = "",
  error,
  label,
  maxSelection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Find selected options
  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  // Filter options based on search query
  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      if (maxSelection && value.length >= maxSelection) {
        return; // Max selection reached
      }
      onChange([...value, optionValue]);
    }
  };

  const handleRemove = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div ref={containerRef}>
        {/* Select Button */}
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`min-h-[44px] w-full cursor-pointer rounded-lg border px-3 py-2 transition ${
            error
              ? "border-error-500 focus-within:ring-error-500"
              : "border-gray-300 focus-within:ring-brand-500 dark:border-gray-700"
          } ${
            disabled
              ? "cursor-not-allowed bg-gray-100 dark:bg-gray-800"
              : "bg-white hover:border-gray-400 dark:bg-gray-900 dark:hover:border-gray-600"
          } focus-within:outline-none focus-within:ring-2`}
        >
          <div className="flex flex-wrap items-center gap-2">
            {/* Selected Tags */}
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 rounded-md bg-brand-100 px-2 py-1 text-sm text-brand-800 dark:bg-brand-900/30 dark:text-brand-300"
                >
                  {option.icon && (
                    <span className="flex items-center text-xs">
                      {option.icon}
                    </span>
                  )}
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      !disabled && handleRemove(option.value);
                    }}
                    className="ml-1 rounded hover:bg-brand-200 dark:hover:bg-brand-800"
                  >
                    <svg
                      className="h-3 w-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {placeholder}
              </span>
            )}

            {/* Clear All Button */}
            {selectedOptions.length > 0 && !disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearAll();
                }}
                className="ml-auto rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                title="Clear all"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
            {/* Search Input */}
            {searchable && (
              <div className="border-b border-gray-200 p-2 dark:border-gray-700">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            )}

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto p-1">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No options found
                </div>
              ) : (
                <>
                  {maxSelection && (
                    <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
                      {value.length} / {maxSelection} selected
                    </div>
                  )}
                  {filteredOptions.map((option) => {
                    const isSelected = value.includes(option.value);
                    const isDisabled =
                      option.disabled ||
                      (!isSelected &&
                        maxSelection !== undefined &&
                        value.length >= maxSelection);

                    return (
                      <button
                        key={option.value}
                        onClick={() => !isDisabled && handleToggle(option.value)}
                        disabled={isDisabled}
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                          isDisabled
                            ? "cursor-not-allowed text-gray-400 dark:text-gray-600"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                      >
                        {/* Checkbox */}
                        <div
                          className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border ${
                            isSelected
                              ? "border-brand-500 bg-brand-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="h-3 w-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>

                        {option.icon && (
                          <span className="flex items-center">
                            {option.icon}
                          </span>
                        )}
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-error-500 dark:text-error-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default MultiSelect;
