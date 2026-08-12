# Scope: Milestone 2 — R2 Accessibility Color Contrast Improvement

## Objective
Update all low-contrast text utility classes (`text-gray-700`, `text-gray-600`, `text-gray-500`, `text-gray-800`, `text-gray-900`, `placeholder:text-gray-600`, `placeholder:text-gray-800`) on dark backgrounds across `common-hub`, `hsr-hub`, `ww-hub`, and `nte-hub` to higher-contrast alternatives (`text-gray-400`, `text-gray-300`, `placeholder:text-gray-400`).

## Target Statistics
- Total low-contrast instances: 357
- Total target files: 61 files across 4 modules:
  - `common-hub`: 33 files, 161 occurrences
  - `hsr-hub`: 10 files, 86 occurrences
  - `ww-hub`: 15 files, 84 occurrences
  - `nte-hub`: 3 files, 26 occurrences

## Mapping Rules
- `text-gray-900` on dark bg -> `text-gray-300`
- `text-gray-800` on dark bg -> `text-gray-300`
- `text-gray-700` on dark bg -> `text-gray-400`
- `text-gray-600` on dark bg -> `text-gray-400`
- `text-gray-500` on dark bg -> `text-gray-400`
- `placeholder:text-gray-600` -> `placeholder:text-gray-400`
- `placeholder:text-gray-800` -> `placeholder:text-gray-400`

## Verification Requirements
1. Build check (`npm run build` or Vite build in all modules) must pass with zero errors.
2. Unit / test checks must pass.
3. Reviewer approval.
4. Challenger verification: zero low-contrast text utility class remnants on dark backgrounds across the 61 files.
5. Forensic Auditor verification: CLEAN (no cheating, dummy implementations, or hardcoded pass signals).
