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
      <main className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Construction Calculator</h1>
        <div className="flex gap-8">
          {/* Left side - Search */}
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-md h-[800px] overflow-y-auto">
            <ConstructionSearch 
              constructions={constructionData} 
              onSelect={handleSelect}
            />
          </div>
          
          {/* Middle - Selected Items */}
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-md h-[800px] overflow-y-auto">
            <div className="flex justify-end mb-4">
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

          {/* Right side - Totals Summary */}
          <div className="w-1/6 bg-white p-6 rounded-lg shadow-md h-[800px] overflow-y-auto">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Total Requirements</h3>
            
            {/* Construction Totals */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Construction</h4>
              <div className="space-y-2">
                <div className="bg-gray-50 p-2 rounded">
                  <div className="text-gray-500 text-sm">Materials</div>
                  <div className="font-medium">
                    {selectedItems.reduce((sum, item) => sum + item.construction.construction.materials, 0)}
                  </div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="text-gray-500 text-sm">Heatstamp</div>
                  <div className="font-medium">
                    {selectedItems.reduce((sum, item) => sum + item.construction.construction.heatstamp, 0)}
                  </div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="text-gray-500 text-sm">Prefabs</div>
                  <div className="font-medium">
                    {selectedItems.reduce((sum, item) => sum + item.construction.construction.prefabs, 0)}
                  </div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="text-gray-500 text-sm">Workforce</div>
                  <div className="font-medium">
                    {selectedItems.reduce((sum, item) => sum + (item.construction.requirements?.workforce || 0), 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Output Totals */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Total Output</h4>
              <div className="space-y-2">
                {Object.entries(
                  selectedItems.reduce((acc, item) => {
                    if (item.construction.output) {
                      Object.entries(item.construction.output).forEach(([key, value]) => {
                        acc[key] = (acc[key] || 0) + (typeof value === 'number' ? value : 0);
                      });
                    }
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([key, value]) => (
                  <div key={key} className="bg-green-50 p-2 rounded">
                    <div className="text-gray-500 text-sm capitalize">{key}</div>
                    <div className="font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demand Totals */}
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Total Demand</h4>
              <div className="space-y-2">
                {Object.entries(
                  selectedItems.reduce((acc, item) => {
                    if (item.construction.demand) {
                      Object.entries(item.construction.demand).forEach(([key, value]) => {
                        acc[key] = (acc[key] || 0) + (typeof value === 'number' ? value : 0);
                      });
                    }
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([key, value]) => (
                  <div key={key} className="bg-red-50 p-2 rounded">
                    <div className="text-gray-500 text-sm capitalize">{key}</div>
                    <div className="font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
