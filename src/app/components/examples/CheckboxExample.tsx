import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function CheckboxExample() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms1" defaultChecked />
        <Label htmlFor="terms1">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms2" />
        <Label htmlFor="terms2">Subscribe to newsletter</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms3" disabled />
        <Label htmlFor="terms3">Disabled checkbox</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms4" disabled defaultChecked />
        <Label htmlFor="terms4">Disabled and checked</Label>
      </div>
    </div>
  );
}
