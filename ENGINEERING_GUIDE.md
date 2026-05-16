# Dholera Frontend Engineering Guide: GDCR Regulatory Components

This guide provides technical documentation for the core regulatory components implemented in the Dholera Frontend application. These components are designed to automate compliance verification against the **Draft Global Development Control Regulations (GDCR)** for the Dholera Special Investment Region (DSIR).

---

## 1. FeeCalculator Component
**Location:** `src/components/FeeCalculator/index.tsx`

The `FeeCalculator` automates the calculation of DSIRDA verification processing fees and infrastructure charges.

### GDCR Clauses Implemented
*   **Section 2.2.1:** Low-Rise Residential processing fees (₹3.00 per sq.m, minimum ₹300.00).
*   **Section 2.2.2:** Commercial / High-Rise / Mixed-Use fees (₹5.00 per sq.m, minimum ₹300.00).
*   **Section 2.2.7:** Specialized open workspace and mining asset calculations (scaled at 0.50 of a ₹1.50/sq.m baseline).
*   **Section 9.1.1:** Infrastructure Expansion upgrade charge (₹1,500.00 per sq.m for premium 25% FSI allocation).
*   **Section 9.11.1:** Vertical profile safety directives requiring dual structural lift installations for properties exceeding 21m.
*   **Section 9.11.2:** Mandatory backup diesel generation units for assets exceeding 25m in height.

### Mathematical Formulas
*   **Base Fee:** `max(300, BuiltUpArea * Rate)`
    *   Residential: ₹3.00/sq.m
    *   Commercial: ₹5.00/sq.m
    *   Industrial/Agri: ₹0.75/sq.m (derived from `(Area * 1.50) * 0.50`)
*   **Infrastructure Charge:** `If PremiumFSI Then (BuiltUpArea * 1500) Else 0`
*   **Total Validation Fee:** `BaseFee + InfrastructureCharge`

### Architecture
*   **State Management:** Uses a local `ProjectState` object to track `zoneTier`, `builtUpArea`, `requestFsiUpgrade`, and `structureHeight`.
*   **Performance:** Utilizes `useMemo` to recalculate the `CalculationMatrix` only when input parameters change.
*   **Validation Engine:** Separated logic in `calculateBaseFee` and `checkZoningRestrictions` for testability.

---

## 2. ParkingPlanner Component
**Location:** `src/components/ParkingPlanner/index.tsx`

The `ParkingPlanner` calculates the required Equivalent Car Space (ECS) and total parking area based on property usage.

### GDCR Clauses Implemented
*   **Section 9.5:** General standards for parking space allocation based on property type and intensity.
*   **Section 9.5.3:** Mandatory reserve allocations for two-wheelers (25% of ECS) and non-motorized transport/bicycles (5% of ECS).

### Mathematical Formulas
*   **Base ECS (Residential):** `ceil(Tenements * 1.2)`
*   **Base ECS (Commercial):** `ceil(BuiltUpArea / 50)`
*   **Base ECS (Industrial):** `ceil(BuiltUpArea / 100)`
*   **Total Parking Area:** `BaseECS * 25` (Standard 25 sq.m per ECS for 4-wheelers)
*   **Two-Wheeler Allocation:** `ceil(BaseECS * 0.25)`
*   **Bicycle Allocation:** `ceil(BaseECS * 0.05)`

### Architecture
*   **State Management:** Tracks `builtUpArea`, `tenements`, and `propertyType` via `ParkingState`.
*   **Reactive UI:** Uses `useMemo` to provide real-time updates to the inventory requirements board.
*   **Visual Feedback:** Uses MUI Icons and Avatars to provide high-signal feedback on specific inventory quotas.

---

## 3. RiskMapping Component
**Location:** `src/components/RiskMapping/index.tsx`

The `RiskMapping` component provides a visual interface for identifying spatial exclusions and safety buffers required by environmental and seismic regulations.

### GDCR Clauses Implemented
*   **Section 9.7 (Water Buffers):** 
    *   **River Setback:** Mandatory 150m buffer from unembanked river banks.
    *   **Lake/Canal:** Strict 18m offset from existing water boundaries.
*   **Seismic Safety:** 
    *   Liquefaction Risk identification for Sectors 4 & 5.
    *   **IS 1893:2016** compliance for high-rises in Zone III.
*   **Environmental Buffers:**
    *   **CRZ Restrictions:** 500m no-build zone from the coastal baseline.
    *   **TP Forest Buffer:** 50m preservation zone around mapped green clusters.

### Mathematical Parameters (Spatial Offsets)
*   `RiverSetback = 150m`
*   `WaterBodyOffset = 18m`
*   `CoastalBaselineBuffer = 500m`
*   `GreenClusterBuffer = 50m`

### Architecture
*   **Layer Management:** Implements a toggle-based layer system (`activeLayer`) to swap between Water, Seismic, and Environmental risk profiles.
*   **Data Structure:** Uses a constant `MAP_LAYERS` array to store regulatory text and visual styles, ensuring the UI remains decoupled from the specific regulation data.
*   **Mock Visualization:** Employs CSS-based overlays and blurs to represent spatial buffers dynamically on a mock map canvas.

---

## Developer Best Practices
1.  **Strict Typing:** Always update the local `interface` when adding new GDCR parameters.
2.  **Regulatory Sync:** Changes to mathematical constants should be cross-referenced with the latest DSIRDA Gazettes.
3.  **Units:** All area inputs are expected in **square meters (sq.m)** and heights in **meters (m)**.
