import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

export default function CardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            This is a simple card component with header and content sections.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>With Footer</CardTitle>
          <CardDescription>This card includes a footer</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Cards can have optional footers for actions or additional information.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
