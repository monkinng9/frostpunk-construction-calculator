'use client';

import { useState, useEffect } from 'react';
import { Construction } from '../data/constructions';

interface Props {
  constructions: Record<string, Construction>;
  onSelect: (name: string) => void;
}

export default function ConstructionSearch({ constructions, onSelect }: Props) {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (search.trim()) {
      const matches = Object.keys(constructions).filter(name =>
        name.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [search, constructions]);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search construction..."
        className="w-full p-2 border rounded"
      />
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border rounded mt-1 max-h-60 overflow-auto z-10">
          {suggestions.map((name) => (
            <li
              key={name}
              onClick={() => {
                onSelect(name);
                setSearch('');
                setSuggestions([]);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
