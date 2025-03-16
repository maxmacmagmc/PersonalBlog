import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
function ArticleSection() {
  return (
    <section className="flex flex-row items-center justify-between p-3 bg-gray-200">
     <div className="flex flex-row space-x-2 p-4 bg">
      <Button variant="default">Button</Button>
      <Button variant="default">Button</Button>
      <Button variant="default">Button</Button>
      <Button variant="default">Button</Button>
      </div>
      <div>
      <Select>
  <SelectTrigger className="w-[180px] bg-white">
    <SelectValue placeholder="Hilight" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>

      </div>
    </section>
  );
}
export  {ArticleSection};