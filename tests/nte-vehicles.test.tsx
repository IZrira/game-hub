import React from 'react';
import fs from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { NTE_VEHICLES, NTE_VEHICLE_DISPLAY_ORDER, getNTEVehicleGroups, normalizeNTEVehicleCategory } from '../nte-hub/data/vehicles';
import VehiclePerformance from '../nte-hub/components/VehiclePerformance';
import reference from './fixtures/nte-vehicle-reference.json';

describe('NTE vehicle document reconciliation', () => {
  it('preserves 43 unique entries and renders all manufacturer groups exactly once', () => {
    const ids = NTE_VEHICLES.map(v => v.id);
    expect(ids).toHaveLength(43);
    expect(new Set(ids).size).toBe(43);
    expect([...NTE_VEHICLE_DISPLAY_ORDER].sort()).toEqual([...ids].sort());
    const visible = getNTEVehicleGroups(NTE_VEHICLES).flatMap(category => category.groups.flatMap(group => group.vehicles.map(v => v.id)));
    expect(visible.sort()).toEqual([...ids].sort());
  });

  it('matches all basic and expanded values against the captured source reference', () => {
    expect(reference).toHaveLength(43);
    for (const row of reference) {
      const vehicle = NTE_VEHICLES.find(v => v.id === row.id)!;
      expect(vehicle, row.id).toBeTruthy();
      for (const field of ['topSpeed', 'acceleration', 'durability'] as const) expect(vehicle[field], `${row.id}/${field}`).toBe(row.stats[field]);
      expect(vehicle.performance, row.id).toEqual('performance' in row ? row.performance : undefined);
    }
    expect(NTE_VEHICLES.filter(v => v.performance)).toHaveLength(32);
  });

  it('keeps purchase-unavailable entries separate and does not fabricate their statistics', () => {
    const unavailable = NTE_VEHICLES.filter(v => v.ownership === '구매 불가');
    expect(unavailable).toHaveLength(11);
    for (const vehicle of unavailable) {
      expect(vehicle.category).toMatch(/^구매 불가/);
      expect([vehicle.topSpeed, vehicle.acceleration, vehicle.durability]).toEqual([null, null, null]);
      expect(vehicle.performance).toBeUndefined();
    }
  });

  it('keeps old category filter URLs functional', () => {
    expect(normalizeNTEVehicleCategory('2륜 이동 수단')).toBe('오토바이 · ATV · 자전거');
    expect(normalizeNTEVehicleCategory('4륜 이동 수단')).toBe('지상 이동 수단');
    expect(normalizeNTEVehicleCategory('수상 이동 수단')).toBe('수상 이동 수단');
  });

  it('updates release information and Korean acquisition currencies', () => {
    for (const id of ['porsche-taycan-turbo-gt', 'porsche-911-turbo-930']) {
      const vehicle = NTE_VEHICLES.find(v => v.id === id)!;
      expect(vehicle.availability).toBeUndefined();
      expect(vehicle.acquisition).toContain('폭주의 그림자');
      expect(vehicle.manufacturer).toBe('Porsche');
    }
    expect(NTE_VEHICLES.find(v => v.id === 'k01')!.acquisition).toContain('32,000원');
    expect(NTE_VEHICLES.find(v => v.id === 'b100')!.acquisition).toContain('발바닥 코인');
    expect(NTE_VEHICLES.find(v => v.id === 'land-ruler-001')!.releaseVersion).toBe('1.6');
  });

  it('stores genuine WebP files for the 20 newly registered vehicles', () => {
    const images = NTE_VEHICLES.filter(v => /^(a001|e001|c001|steel-tank|ori-|land-ruler|row-toward|npc-)/.test(v.id));
    expect(images).toHaveLength(20);
    for (const vehicle of images) {
      expect(vehicle.imageUrl, vehicle.id).toMatch(/^\/assets\/nte\/vehicles\/[^/]+\.webp$/);
      const bytes = fs.readFileSync(`public${vehicle.imageUrl}`);
      expect(bytes.toString('ascii', 0, 4)).toBe('RIFF');
      expect(bytes.toString('ascii', 8, 12)).toBe('WEBP');
      expect(bytes.length).toBeGreaterThan(1000);
    }
  });
});

describe('expanded vehicle specifications', () => {
  it('retains zero values and the source direction labels without inventing physical units', () => {
    const vehicle = NTE_VEHICLES.find(v => v.id === 'tomorrow-rush')!;
    const html = renderToStaticMarkup(<VehiclePerformance performance={vehicle.performance} />);
    const container = document.createElement('div');
    container.innerHTML = html;
    expect(container.querySelectorAll('details')).toHaveLength(1);
    expect([...container.querySelectorAll('dd')].map(e => e.textContent)).toEqual(['0', '1', '9', '7', '5']);
    expect(container.textContent).toContain('느림 ↔ 빠름');
    expect(container.textContent).toContain('낮음 ↔ 높음');
    expect(container.textContent).toContain('부드러움 ↔ 딱딱함');
    expect(container.textContent).not.toContain('/ 10');
  });

  it('preserves mixed source ranges instead of silently dividing them', () => {
    expect(NTE_VEHICLES.find(v => v.id === 'a001')!.performance!.shiftTime).toBe(40);
    expect(NTE_VEHICLES.find(v => v.id === 'steel-tank')!.performance!.suspensionHeight).toBe(60);
  });

  it('does not show an empty performance disclosure for undisclosed vehicles', () => {
    expect(renderToStaticMarkup(<VehiclePerformance />)).toBe('');
  });
});
