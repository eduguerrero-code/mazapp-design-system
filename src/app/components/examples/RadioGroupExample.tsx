import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

export default function RadioGroupExample() {
  return (
    <div className="space-y-4">
      <Label>Notification Preferences</Label>
      <RadioGroup defaultValue="all">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="all" />
          <Label htmlFor="all">All notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mentions" id="mentions" />
          <Label htmlFor="mentions">Mentions only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="none" />
          <Label htmlFor="none">No notifications</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
