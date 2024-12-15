'use client';

import { useState } from 'react';
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
        onKeyDown={(e) => {
          if (e.key === 'Enter' && filteredConstructions.length > 0) {
            onSelect(filteredConstructions[0]);
            setSearch('');
          }
        }}
        placeholder="Filter constructions..."
        className="w-full p-3 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      <div className="bg-white border rounded-lg max-h-[600px] overflow-auto shadow-sm">
        {filteredConstructions.map((name) => (
          <div
            key={name}
            onClick={() => {
              onSelect(name);
              setSearch('');
            }}
            className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition-colors"
          >
            <div className="font-medium">{name}</div>
            <div className="text-sm text-gray-600">{constructions[name].description}</div>
            <div className="mt-2 flex gap-4 text-xs text-gray-500">
              <div>
                <span className="font-medium">Materials:</span> {constructions[name].construction.materials}
              </div>
              <div>
                <span className="font-medium">Heatstamp:</span> {constructions[name].construction.heatstamp}
              </div>
              <div>
                <span className="font-medium">Prefabs:</span> {constructions[name].construction.prefabs}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
