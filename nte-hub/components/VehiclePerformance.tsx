import React from 'react';
import { NTE_VEHICLE_PERFORMANCE_FIELDS, type NTEVehiclePerformance } from '../data/vehicles';

export default function VehiclePerformance({ performance }: { performance?: NTEVehiclePerformance }) {
  if (!performance) return null;
  return (
    <details className="border-b border-white/10">
      <summary className="cursor-pointer px-5 py-4 text-sm font-bold text-gray-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-300 sm:px-6">
        차량 상세 성능
      </summary>
      <dl className="divide-y divide-white/10 px-5 pb-4 sm:px-6">
        {NTE_VEHICLE_PERFORMANCE_FIELDS.map(field => (
          <div key={field.key} className="flex items-center justify-between gap-4 py-3">
            <dt className="min-w-0">
              <span className="block text-sm font-bold text-gray-200">{field.label}</span>
              <span className="mt-1 block text-xs text-gray-400">{field.low} ↔ {field.high}</span>
            </dt>
            <dd className="shrink-0 text-base font-bold tabular-nums text-white">{performance[field.key]}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
