'use client'

import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight"
 
export function SplineSceneBasic() {
  return (
    <div className="w-full h-full bg-transparent border-none shadow-none relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 bottom-0 left-[-25vw] w-[200vw] h-full pointer-events-auto transition-all duration-500 filter-none dark:filter-robot-blue">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}

export default SplineSceneBasic;
