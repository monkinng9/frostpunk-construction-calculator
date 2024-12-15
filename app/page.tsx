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
    <div className="min-h-screen bg-gray-50 p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto flex flex-col gap-8 items-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Construction Calculator</h1>
        <div className="w-full space-y-6 bg-white p-6 rounded-lg shadow-md">
          <ConstructionSearch 
            constructions={constructionData} 
            onSelect={handleSelect}
          />
          
          <div className="flex justify-end">
            <button
              onClick={handleClear}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-sm hover:shadow-md"
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
