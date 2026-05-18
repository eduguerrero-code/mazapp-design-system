import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Calendar, Settings, HelpCircle } from "lucide-react";

export default function PopoverExample() {
  return (
    <div className="w-full max-w-md space-y-8">

      {/* Basic Popover */}
      <div>
        <h3 className="text-sm font-medium mb-4">Basic Popover</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Popover Title</h4>
              <p className="text-sm text-muted-foreground">
                This is a basic popover with some content.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Popover with Form */}
      <div>
        <h3 className="text-sm font-medium mb-4">Popover with Form</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              <Settings className="size-4 mr-2" />
              Settings
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    defaultValue="100%"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    defaultValue="25px"
                    className="col-span-2 h-8"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Different Alignments */}
      <div>
        <h3 className="text-sm font-medium mb-4">Different Alignments</h3>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">Top</Button>
            </PopoverTrigger>
            <PopoverContent side="top">
              <p className="text-sm">Popover on top</p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">Right</Button>
            </PopoverTrigger>
            <PopoverContent side="right">
              <p className="text-sm">Popover on right</p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">Bottom</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom">
              <p className="text-sm">Popover on bottom</p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">Left</Button>
            </PopoverTrigger>
            <PopoverContent side="left">
              <p className="text-sm">Popover on left</p>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Date Picker Popover */}
      <div>
        <h3 className="text-sm font-medium mb-4">Date Picker Example</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Calendar className="size-4 mr-2" />
              Pick a date
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                Calendar component would go here
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Help Popover */}
      <div>
        <h3 className="text-sm font-medium mb-4">Help Information</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm">Email notifications</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <HelpCircle className="size-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Choose when you want to receive email notifications. You can customize these settings at any time.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

    </div>
  );
}
