import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import carousel1 from "../../assets/img/carousel-1.jpg";
import carousel2 from "../../assets/img/carousel-2.jpg";
import carousel3 from "../../assets/img/carousel-3.jpg";
const HomepageCarousel = () => {
  return (
    <Carousel className="h-full">
      <CarouselContent className="h-full">
        <CarouselItem>
          <img
            src={carousel1.src}
            alt={"carousel 1"}
            className="h-full w-full object-center"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            src={carousel2.src}
            alt={"carousel 2"}
            className="h-full w-full object-center"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            src={carousel3.src}
            alt={"carousel 3"}
            className="h-full w-full object-center"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export { HomepageCarousel };
