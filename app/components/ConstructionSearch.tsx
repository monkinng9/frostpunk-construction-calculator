'use client';

import { useState, useEffect } from 'react';
import { Construction } from '../data/constructions';

interface Props {
  constructions: Record<string, Construction>;
  onSelect: (name: string) => void;
}

export default function ConstructionSearch({ constructions, onSelect }: Props) {
  const [search, setSearch] = useState('');
  const filteredConstructions = Object.keys(constructions).filter(name =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Filter constructions..."
        className="w-full p-2 border rounded mb-2"
      />
      <div className="bg-white border rounded max-h-60 overflow-auto">
        {filteredConstructions.map((name) => (
          <div
            key={name}
            onClick={() => {
              onSelect(name);
              setSearch('');
            }}
            className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
          >
            <div className="font-medium">{name}</div>
            <div className="text-sm text-gray-600">{constructions[name].description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
