import { toast } from "sonner";
import { Button } from "../ui/button";

export default function SonnerExample() {
  return (
    <div className="w-full max-w-md space-y-8">

      {/* Basic Toasts */}
      <div>
        <h3 className="text-sm font-medium mb-4">Basic Toasts</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => toast("This is a basic toast")}
          >
            Default Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.success("Operation completed successfully")}
          >
            Success Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error("Something went wrong")}
          >
            Error Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("Here's some information")}
          >
            Info Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning("Please be careful")}
          >
            Warning Toast
          </Button>
        </div>
      </div>

      {/* Toast with Description */}
      <div>
        <h3 className="text-sm font-medium mb-4">Toast with Description</h3>
        <Button
          onClick={() =>
            toast("Event Created", {
              description: "Your event has been created successfully for Monday, January 3rd at 6:00pm.",
            })
          }
        >
          Show Toast with Description
        </Button>
      </div>

      {/* Toast with Action */}
      <div>
        <h3 className="text-sm font-medium mb-4">Toast with Action</h3>
        <Button
          onClick={() =>
            toast("Event Created", {
              description: "Monday, January 3rd at 6:00pm",
              action: {
                label: "Undo",
                onClick: () => toast("Event Cancelled"),
              },
            })
          }
        >
          Show Toast with Action
        </Button>
      </div>

      {/* Promise Toast */}
      <div>
        <h3 className="text-sm font-medium mb-4">Promise Toast</h3>
        <Button
          onClick={() => {
            const promise = () =>
              new Promise((resolve) => setTimeout(resolve, 2000));

            toast.promise(promise(), {
              loading: "Loading...",
              success: "Data loaded successfully",
              error: "Failed to load data",
            });
          }}
        >
          Show Promise Toast
        </Button>
      </div>

      {/* Custom Duration */}
      <div>
        <h3 className="text-sm font-medium mb-4">Custom Duration</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast("Quick toast", { duration: 1000 })}
          >
            1 Second
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast("Normal toast", { duration: 4000 })}
          >
            4 Seconds
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast("Long toast", { duration: 10000 })}
          >
            10 Seconds
          </Button>
        </div>
      </div>

      {/* Loading Toast */}
      <div>
        <h3 className="text-sm font-medium mb-4">Loading Toast</h3>
        <Button
          onClick={() => {
            const toastId = toast.loading("Processing...");
            setTimeout(() => {
              toast.success("Processing complete!", { id: toastId });
            }, 3000);
          }}
        >
          Show Loading Toast
        </Button>
      </div>

      {/* Rich Content */}
      <div>
        <h3 className="text-sm font-medium mb-4">Rich Content</h3>
        <Button
          onClick={() =>
            toast.success("Profile Updated", {
              description: (
                <div className="space-y-1">
                  <p>Name: John Doe</p>
                  <p>Email: john@example.com</p>
                </div>
              ),
            })
          }
        >
          Show Rich Content
        </Button>
      </div>

    </div>
  );
}
