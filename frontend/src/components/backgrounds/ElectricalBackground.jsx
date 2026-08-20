import { EngineeringGrid } from './EngineeringGrid'
import { CircuitLines } from './CircuitLines'
import { ElectricalHouse } from './ElectricalHouse'
import { ElectricalBuilding } from './ElectricalBuilding'
import { ElectricalPanel } from './ElectricalPanel'
import { SolarPanel } from './SolarPanel'
import { EVCharger } from './EVCharger'
import { LightingElement } from './LightingElement'
import { EnergyWave } from './EnergyWave'
import './backgrounds.css'

/** "Energy Infrastructure In Motion" — a quiet ecosystem of electrical objects. */
export function ElectricalBackground() {
  return (
    <div className="page-background electrical-background" aria-hidden="true">
      <EngineeringGrid color="rgba(11, 92, 173, 0.05)" variant="blueprint" />
      <div className="bg-radial" style={{
        background:
          'radial-gradient(circle at 10% 15%, rgba(21, 151, 245, 0.05), transparent 42%),' +
          'radial-gradient(circle at 90% 85%, rgba(22, 132, 91, 0.05), transparent 45%)',
      }} />
      <EnergyWave />

      {/* always visible (mobile-safe): 2 objects */}
      <SolarPanel className="obj-left-mid show-mobile" />
      <ElectricalPanel className="obj-bottom-left show-mobile" />

      {/* tablet + desktop: +2 objects */}
      <ElectricalHouse className="obj-top-left show-tablet" />
      <CircuitLines className="obj-lower-center-right show-tablet" />

      {/* desktop only: +3 objects */}
      <ElectricalBuilding className="obj-top-right show-desktop" />
      <LightingElement className="obj-right-mid show-desktop" />
      <EVCharger className="obj-bottom-right show-desktop" />
    </div>
  )
}


