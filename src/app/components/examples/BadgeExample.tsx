import { Badge } from "../ui/badge";
import { Check, X, AlertCircle, Star } from "lucide-react";

export default function BadgeExample() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge>
        <Check className="size-3" />
        With Icon
      </Badge>
      <Badge variant="secondary">
        <Star className="size-3" />
        Featured
      </Badge>
      <Badge variant="destructive">
        <X className="size-3" />
        Error
      </Badge>
      <Badge variant="outline">
        <AlertCircle className="size-3" />
        Warning
      </Badge>
    </div>
  );
}
