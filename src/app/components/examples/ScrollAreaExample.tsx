import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export default function ScrollAreaExample() {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `Tag ${a.length - i}`
  );

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Vertical Scroll</h3>
        <ScrollArea className="h-72 w-full rounded-lg border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {tags.map((tag) => (
              <>
                <div key={tag} className="text-sm">
                  {tag}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Horizontal Scroll</h3>
        <ScrollArea className="w-full whitespace-nowrap rounded-lg border">
          <div className="flex w-max space-x-4 p-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 rounded-lg bg-muted h-32 w-32 flex items-center justify-center"
              >
                Item {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
