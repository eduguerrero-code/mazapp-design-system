import { Separator } from "../ui/separator";

export default function SeparatorExample() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <h4>Horizontal Separator</h4>
        <p className="text-sm text-muted-foreground">
          This is some content above the separator.
        </p>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">
          This is some content below the separator.
        </p>
      </div>

      <div className="flex items-center gap-4 h-20">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Left content</p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Right content</p>
        </div>
      </div>
    </div>
  );
}
