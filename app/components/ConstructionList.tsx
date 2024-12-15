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
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h3 className="font-bold mb-2">Totals:</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>Materials: {totalMaterials}</div>
          <div>Workforce: {totalWorkforce}</div>
          <div>Time: {totalTime}</div>
        </div>
      </div>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border p-4 rounded">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold">{item.name}</h4>
              <button
                onClick={() => onRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <div className="text-sm">
              <div>Materials: {item.construction.construction.materials}</div>
              <div>Workforce: {item.construction.construction.workforce}</div>
              <div>Time: {item.construction.construction.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
