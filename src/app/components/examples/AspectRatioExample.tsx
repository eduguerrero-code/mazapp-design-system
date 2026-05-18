import { AspectRatio } from "../ui/aspect-ratio";

export default function AspectRatioExample() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">16:9 Aspect Ratio (Video)</h3>
        <div className="w-full max-w-md">
          <AspectRatio ratio={16 / 9}>
            <div className="bg-muted flex items-center justify-center rounded-lg border">
              <span className="text-muted-foreground">16:9 Video</span>
            </div>
          </AspectRatio>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">1:1 Aspect Ratio (Square)</h3>
        <div className="w-full max-w-xs">
          <AspectRatio ratio={1}>
            <div className="bg-muted flex items-center justify-center rounded-lg border size-full">
              <span className="text-muted-foreground">1:1 Square</span>
            </div>
          </AspectRatio>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">4:3 Aspect Ratio (Classic)</h3>
        <div className="w-full max-w-md">
          <AspectRatio ratio={4 / 3}>
            <div className="bg-muted flex items-center justify-center rounded-lg border size-full">
              <span className="text-muted-foreground">4:3 Classic</span>
            </div>
          </AspectRatio>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">21:9 Aspect Ratio (Ultrawide)</h3>
        <div className="w-full max-w-2xl">
          <AspectRatio ratio={21 / 9}>
            <div className="bg-muted flex items-center justify-center rounded-lg border size-full">
              <span className="text-muted-foreground">21:9 Ultrawide</span>
            </div>
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}
