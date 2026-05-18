import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function LabelExample() {
  return (
    <div className="w-full max-w-md space-y-8">

      {/* Basic Label with Input */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Basic Label with Input</h3>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      </div>

      {/* Required Field */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Required Field</h3>
        <div className="space-y-2">
          <Label htmlFor="username">
            Username <span className="text-negative-500">*</span>
          </Label>
          <Input id="username" placeholder="Enter username" />
        </div>
      </div>

      {/* Label with Checkbox */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Label with Checkbox</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="cursor-pointer">
            I accept the terms and conditions
          </Label>
        </div>
      </div>

      {/* Label with Radio Group */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Label with Radio Group</h3>
        <Label>Notification Preference</Label>
        <RadioGroup defaultValue="email">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="r1" />
            <Label htmlFor="r1" className="cursor-pointer font-normal">
              Email
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sms" id="r2" />
            <Label htmlFor="r2" className="cursor-pointer font-normal">
              SMS
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="push" id="r3" />
            <Label htmlFor="r3" className="cursor-pointer font-normal">
              Push Notification
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Disabled Label */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Disabled State</h3>
        <div className="space-y-2">
          <Label htmlFor="disabled" className="opacity-50">
            Disabled Field
          </Label>
          <Input id="disabled" disabled placeholder="Cannot edit" />
        </div>
      </div>

      {/* Label with Helper Text */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Label with Helper Text</h3>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter password" />
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters long
          </p>
        </div>
      </div>

    </div>
  );
}
