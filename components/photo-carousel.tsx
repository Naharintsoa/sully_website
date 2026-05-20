'use client'

import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

type Slide = {
  src: string
  label: string
  sub: string
}

export function PhotoCarousel({ slides }: { slides: Slide[] }) {
  return (
    <Carousel
      opts={{ loop: true, align: 'start' }}
      plugins={[
        Autoplay({ delay: 4000, stopOnInteraction: false }),
      ]}
      className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      <CarouselContent>
        {slides.map((s, i) => (
          <CarouselItem key={i}>
            <div className="aspect-square w-full overflow-hidden">
              <img
                src={s.src.startsWith('placeholder') ? '/placeholder.jpg' : s.src}
                alt={s.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/80 transition-all duration-300 pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
        <p className="font-bold text-white text-sm">{slides[0]?.label}</p>
        <p className="text-white/60 text-xs">{slides[0]?.sub}</p>
      </div>

      <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Carousel>
  )
}
