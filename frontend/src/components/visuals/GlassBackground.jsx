import { Shader, Swirl, ChromaFlow, FlutedGlass } from 'shaders/react'

export function GlassBackground() {
  return (
    <Shader className="glass-background-shader">
      <Swirl
        colorA="#ffffff"
        colorB="#f0f0f5"
        detail={1.5}
      />
      <ChromaFlow
        baseColor="#ffffff"
        downColor="#4642ff"
        leftColor="#56c2fc"
        radius={4}
        rightColor="#5b4fff"
        upColor="#7f66ff"
      />
      <FlutedGlass
        aberration={0}
        angle={30}
        frequency={8}
        lightAngle={-90}
        refraction={4}
        shape="rounded"
        softness={1}
      />
    </Shader>
  )
}
