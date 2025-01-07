import React from 'react';
import { Search } from 'lucide-react';

interface SearchSortProps {
  search: string;
  sort: string;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: string) => void;
  onRefresh: () => void;
  refreshing: boolean;
}

export default function SearchSort({
  search,
  sort,
  onSearchChange,
  onSortChange,
}: SearchSortProps) {
  return (
    <div className="mb-4 flex justify-between items-center space-x-4">
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {/* Search Form */}
        <form
          className="flex items-center w-full sm:w-auto"
          onSubmit={(e) => {
            e.preventDefault();
            onSearchChange(search);
          }}
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by prompt..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
        </form>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={sort}
            title="Select an option"
            aria-label="Select an option"
            onChange={(e) => onSortChange(e.target.value)}
            className="flex px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="prompt_asc">Prompt (A-Z)</option>
            <option value="prompt_desc">Prompt (Z-A)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
