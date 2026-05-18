import { Progress } from "../ui/progress";
import { Label } from "../ui/label";

export default function ProgressExample() {
  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <Label>25% Complete</Label>
          <span className="text-muted-foreground">25%</span>
        </div>
        <Progress value={25} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <Label>50% Complete</Label>
          <span className="text-muted-foreground">50%</span>
        </div>
        <Progress value={50} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <Label>75% Complete</Label>
          <span className="text-muted-foreground">75%</span>
        </div>
        <Progress value={75} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <Label>100% Complete</Label>
          <span className="text-muted-foreground">100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  );
}
