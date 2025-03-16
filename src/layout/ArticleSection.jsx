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
    <section className="article-section">
     <div>
      <Button variant="default">Button</Button>
      <Button variant="default">Button</Button>
      <Button variant="default">Button</Button>
      <Button variant="default">Button</Button>
      </div>
      <div>
      <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
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