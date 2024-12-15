'use client';

import { Construction } from '../data/constructions';

interface Props {
  items: { name: string; construction: Construction }[];
  onRemove: (index: number) => void;
}

export default function ConstructionList({ items, onRemove }: Props) {
  const totalMaterials = items.reduce((sum, item) => sum + item.construction.construction.materials, 0);
  const totalWorkforce = items.reduce((sum, item) => sum + item.construction.construction.workforce, 0);
  const totalTime = items.reduce((sum, item) => sum + item.construction.construction.time, 0);

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-blue-50 p-6 rounded-lg mb-6 shadow-sm">
        <h3 className="font-bold mb-4 text-lg text-gray-800">Totals</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">Materials</div>
            <div className="text-xl font-bold text-gray-800">{totalMaterials}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">Workforce</div>
            <div className="text-xl font-bold text-gray-800">{totalWorkforce}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">Time</div>
            <div className="text-xl font-bold text-gray-800">{totalTime}</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-gray-800">{item.name}</h4>
              <button
                onClick={() => onRemove(index)}
                className="text-red-500 hover:text-red-700 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-500">Materials</div>
                <div className="font-medium">{item.construction.construction.materials}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-500">Workforce</div>
                <div className="font-medium">{item.construction.construction.workforce}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-500">Time</div>
                <div className="font-medium">{item.construction.construction.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
