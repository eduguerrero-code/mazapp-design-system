import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, Info } from "lucide-react";

export default function AlertExample() {
  return (
    <div className="space-y-4 w-full max-w-2xl">
      <Alert>
        <Info className="size-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the CLI.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </div>
  );
}
