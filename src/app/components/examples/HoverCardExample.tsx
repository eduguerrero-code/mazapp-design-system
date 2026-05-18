import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { CalendarDays } from "lucide-react";

export default function HoverCardExample() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Basic Hover Card</h3>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@username</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@username</h4>
                <p className="text-sm text-muted-foreground">
                  The React Framework for building production grade applications.
                </p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 size-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">
                    Joined December 2021
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
