import { StatusLabel } from "../ui/status-label";

export function StatusLabelExample() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Status Labels</h3>
        <div className="flex flex-wrap gap-3">
          <StatusLabel variant="completed">Completed</StatusLabel>
          <StatusLabel variant="failed">Failed</StatusLabel>
          <StatusLabel variant="excluded">Excluded</StatusLabel>
          <StatusLabel variant="pending">Pending</StatusLabel>
          <StatusLabel variant="corrected">Corrected</StatusLabel>
          <StatusLabel variant="neutral">Generic</StatusLabel>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Status Labels with Icons</h3>
        <div className="flex flex-wrap gap-3">
          <StatusLabel variant="completed" showIcon>
            Completed
          </StatusLabel>
          <StatusLabel variant="failed" showIcon>
            Failed
          </StatusLabel>
          <StatusLabel variant="excluded" showIcon>
            Excluded
          </StatusLabel>
          <StatusLabel variant="pending" showIcon>
            Pending
          </StatusLabel>
          <StatusLabel variant="corrected" showIcon>
            Corrected
          </StatusLabel>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Removable Status Labels</h3>
        <div className="flex flex-wrap gap-3">
          <StatusLabel variant="neutral" removable onRemove={() => console.log("Removed")}>
            Generic
          </StatusLabel>
          <StatusLabel variant="failed" removable onRemove={() => console.log("Removed")}>
            Generic
          </StatusLabel>
          <StatusLabel variant="completed" removable onRemove={() => console.log("Removed")}>
            Generic
          </StatusLabel>
          <StatusLabel variant="pending" removable onRemove={() => console.log("Removed")}>
            Generic
          </StatusLabel>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Outline Variants</h3>
        <div className="flex flex-wrap gap-3">
          <StatusLabel variant="completed-outline" removable onRemove={() => console.log("Removed")}>
            Generic
          </StatusLabel>
          <StatusLabel variant="failed-outline" removable onRemove={() => console.log("Removed")}>
            Generic
          </StatusLabel>
          <StatusLabel variant="excluded-outline" removable onRemove={() => console.log("Removed")}>
            Generic
          </StatusLabel>
          <StatusLabel variant="pending-outline" removable onRemove={() => console.log("Removed")}>
            Generic
          </StatusLabel>
          <StatusLabel variant="neutral-outline" removable onRemove={() => console.log("Removed")}>
            Generic
          </StatusLabel>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Outline Variants (No Close Button)</h3>
        <div className="flex flex-wrap gap-3">
          <StatusLabel variant="failed-outline">Generic</StatusLabel>
          <StatusLabel variant="completed-outline">Generic</StatusLabel>
          <StatusLabel variant="pending-outline">Generic</StatusLabel>
          <StatusLabel variant="neutral-outline">Generic</StatusLabel>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Combined: Icon + Text + Close</h3>
        <div className="flex flex-wrap gap-3">
          <StatusLabel variant="completed" showIcon removable onRemove={() => console.log("Removed")}>
            Completed
          </StatusLabel>
          <StatusLabel variant="failed" showIcon removable onRemove={() => console.log("Removed")}>
            Failed
          </StatusLabel>
          <StatusLabel variant="excluded" showIcon removable onRemove={() => console.log("Removed")}>
            Excluded
          </StatusLabel>
          <StatusLabel variant="pending" showIcon removable onRemove={() => console.log("Removed")}>
            Pending
          </StatusLabel>
          <StatusLabel variant="corrected" showIcon removable onRemove={() => console.log("Removed")}>
            Corrected
          </StatusLabel>
        </div>
      </div>
    </div>
  );
}
