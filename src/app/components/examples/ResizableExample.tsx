import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";

export default function ResizableExample() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Horizontal Resizable Panels</h3>
        <ResizablePanelGroup direction="horizontal" className="min-h-[200px] max-w-md rounded-lg border">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Panel One</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Panel Two</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Vertical Resizable Panels</h3>
        <ResizablePanelGroup direction="vertical" className="min-h-[400px] max-w-md rounded-lg border">
          <ResizablePanel defaultSize={33}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Header</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={67}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Content</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
