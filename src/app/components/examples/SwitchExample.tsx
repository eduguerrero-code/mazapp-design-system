import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

export default function SwitchExample() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" defaultChecked />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="bluetooth" />
        <Label htmlFor="bluetooth">Bluetooth</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="wifi" disabled />
        <Label htmlFor="wifi">WiFi (Disabled)</Label>
      </div>
    </div>
  );
}
