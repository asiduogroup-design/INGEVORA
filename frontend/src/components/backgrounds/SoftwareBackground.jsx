import { EngineeringGrid } from './EngineeringGrid'
import { SoftwareLaptop } from './SoftwareLaptop'
import { SoftwareBrowser } from './SoftwareBrowser'
import { SoftwareMobile } from './SoftwareMobile'
import { SoftwareMouse } from './SoftwareMouse'
import { SoftwareSearchBar } from './SoftwareSearchBar'
import { AINetwork } from './AINetwork'
import { CloudNode } from './CloudNode'
import { ApiNodes } from './ApiNodes'
import './backgrounds.css'

/** "Digital Workspace In Motion" — a quiet ecosystem of software objects. */
export function SoftwareBackground() {
  return (
    <div className="page-background software-background" aria-hidden="true">
      <EngineeringGrid color="rgba(8, 127, 229, 0.05)" variant="dots" />
      <div className="bg-radial" style={{
        background:
          'radial-gradient(circle at 12% 18%, rgba(8, 127, 229, 0.05), transparent 42%),' +
          'radial-gradient(circle at 88% 82%, rgba(11, 92, 173, 0.05), transparent 45%)',
      }} />

      {/* always visible (mobile-safe): 2 objects */}
      <AINetwork className="obj-right-mid show-mobile" />
      <CloudNode className="obj-upper-center-left show-mobile" />

      {/* tablet + desktop: +2 objects */}
      <SoftwareLaptop className="obj-top-left show-tablet" />
      <ApiNodes className="obj-lower-center-right show-tablet" />

      {/* desktop only: +4 objects */}
      <SoftwareBrowser className="obj-top-right show-desktop" />
      <SoftwareSearchBar className="obj-left-mid show-desktop" />
      <SoftwareMouse className="obj-bottom-left show-desktop" />
      <SoftwareMobile className="obj-bottom-right show-desktop" />
    </div>
  )
}


