'use client';

import { useState } from 'react';
import { constructionData } from './data/constructions';
import ConstructionSearch from './components/ConstructionSearch';
import ConstructionList from './components/ConstructionList';

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<Array<{ name: string; construction: typeof constructionData[keyof typeof constructionData] }>>([]);

  const handleSelect = (name: string) => {
    setSelectedItems([...selectedItems, { name, construction: constructionData[name] }]);
  };

  const handleRemove = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setSelectedItems([]);
  };

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto flex flex-col gap-8 items-center">
        <h1 className="text-2xl font-bold mb-4">Construction Calculator</h1>
        <div className="w-full space-y-6">
          <ConstructionSearch 
            constructions={constructionData} 
            onSelect={handleSelect}
          />
          
          <div className="flex justify-end">
            <button
              onClick={handleClear}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear All
            </button>
          </div>

          <ConstructionList 
            items={selectedItems}
            onRemove={handleRemove}
          />
        </div>
      </main>
    </div>
  );
}
