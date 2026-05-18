import { Slider } from "../ui/slider";
import { Label } from "../ui/label";

export default function SliderExample() {
  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <Label>Volume</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <Label>Brightness</Label>
        <Slider defaultValue={[75]} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <Label>Temperature</Label>
        <Slider defaultValue={[20]} min={-10} max={40} step={1} />
      </div>

      <div className="space-y-2">
        <Label>Disabled</Label>
        <Slider defaultValue={[30]} max={100} step={1} disabled />
      </div>
    </div>
  );
}
