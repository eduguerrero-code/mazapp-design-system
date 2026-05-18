import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export default function TextareaExample() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="message">Your message</Label>
        <Textarea 
          id="message" 
          placeholder="Type your message here..." 
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea 
          id="bio" 
          placeholder="Tell us about yourself..." 
          rows={6}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="disabled">Disabled</Label>
        <Textarea 
          id="disabled" 
          placeholder="This textarea is disabled" 
          disabled
          rows={3}
        />
      </div>
    </div>
  );
}
