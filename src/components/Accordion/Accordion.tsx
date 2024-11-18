import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionCustom({
  childrenTrigger,
  childrenContent,
}: Readonly<{
  childrenTrigger: React.ReactNode;
  childrenContent: React.ReactNode;
}>) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>{childrenTrigger}</AccordionTrigger>
        <AccordionContent>{childrenContent}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
