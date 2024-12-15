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
      <main className="container max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">Construction Calculator</h1>
        <div className="flex gap-6">
          {/* Left side - Search */}
          <div className="w-1/3 bg-white p-6 rounded-xl shadow-sm h-[calc(100vh-12rem)] overflow-y-auto">
            <ConstructionSearch 
              constructions={constructionData} 
              onSelect={handleSelect}
            />
          </div>
          
          {/* Middle - Selected Items */}
          <div className="w-2/3 bg-white p-6 rounded-xl shadow-sm h-[calc(100vh-12rem)] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-800">Selected Items</h3>
              <button
                onClick={handleClear}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
                disabled={selectedItems.length === 0}
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
          <div className="w-1/4 bg-white p-6 rounded-xl shadow-sm h-[calc(100vh-12rem)] overflow-y-auto">
            <h3 className="font-bold text-lg text-gray-800 mb-6">Total Requirements</h3>
            
            {/* Construction Totals */}
            <div className="mb-8">
              <h4 className="font-semibold text-sm text-gray-700 mb-3">Construction</h4>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-500 text-sm">Materials</div>
                  <div className="font-medium">
                    {selectedItems.reduce((sum, item) => sum + item.construction.construction.materials, 0)}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-500 text-sm">Heatstamp</div>
                  <div className="font-medium">
                    {selectedItems.reduce((sum, item) => sum + item.construction.construction.heatstamp, 0)}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-500 text-sm">Prefabs</div>
                  <div className="font-medium">
                    {selectedItems.reduce((sum, item) => sum + item.construction.construction.prefabs, 0)}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-500 text-sm">Workforce</div>
                  <div className="font-medium">
                    {selectedItems.reduce((sum, item) => sum + (item.construction.requirements?.workforce || 0), 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Output Totals */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm text-gray-700 mb-3">Total Output</h4>
              <div className="space-y-3">
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
                  <div key={key} className="bg-green-50 p-3 rounded-lg">
                    <div className="text-gray-500 text-sm capitalize">{key}</div>
                    <div className="font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demand Totals */}
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-3">Total Demand</h4>
              <div className="space-y-3">
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
                  <div key={key} className="bg-red-50 p-3 rounded-lg">
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
