import { ChevronDown } from "lucide-react";
import ContactPopup from "./ContactPopup";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useConfig } from "@/contexts/ConfigContext";
import { useEffect, useState } from "react";

const Hero = () => {
  const config = useConfig();
  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      if (!config.hero.countdown?.targetDate) return;

      const target = new Date(config.hero.countdown.targetDate);
      const now = new Date();

      // Reset time to midnight for accurate day calculation
      target.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);

      const diffTime = target.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setDaysLeft(diffDays > 0 ? diffDays : 0);
    };

    calculateDaysLeft();

    // Update countdown at midnight
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [config.hero.countdown?.targetDate]);

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Countdown Days Only - Fixed/Sticky on Right (Outside Carousel) */}
      {config.hero.countdown && daysLeft > 0 && (
        <div className="absolute top-24 md:top-28 lg:top-32 right-4 md:right-8 lg:right-12 z-30 animate-float-subtle">
          <div className="bg-gradient-to-br from-gold/20 to-gold-light/10 backdrop-blur-md border-2 border-gold/40 rounded-2xl p-4 md:p-5 lg:p-6 shadow-2xl">
            <div className="text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gold drop-shadow-lg">
                  {daysLeft}
                </span>
                <span className="text-lg md:text-xl lg:text-2xl font-medium text-gold-light">
                  {daysLeft === 1 ? 'day' : 'days'} left
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full h-screen"
      >
        <CarouselContent className="h-screen">
          {config.hero.slides.map((slide, index) => (
            <CarouselItem key={index} className="relative min-h-screen flex items-center justify-center">
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt="Sacred Kaaba in Mecca"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-dark/90 via-emerald-dark/70 to-emerald-dark/90" />
              </div>

              <div className="absolute inset-0 pattern-overlay opacity-30" />

              <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center pb-40 md:pb-48 pt-32 md:pt-40 lg:pt-48">
                <div className="max-w-4xl mx-auto">
                  {/* Bismillah - Reduced Size */}
                  <p className="text-gold-light text-sm md:text-base lg:text-lg font-arabic font-bold mb-2 md:mb-3 opacity-0 animate-fade-in leading-relaxed">
                    {slide.bismillah}
                  </p>

                  {/* Translation - Reduced Size */}
                  {slide.translation && (
                    <p className="text-gold-light/90 text-xs md:text-sm lg:text-base font-urdu mb-4 md:mb-5 lg:mb-6 opacity-0 animate-fade-in animation-delay-100 leading-relaxed max-w-3xl mx-auto">
                      {slide.translation}
                    </p>
                  )}

                  {/* Main Heading */}
                  <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-semibold text-primary-foreground mb-3 md:mb-4 leading-tight opacity-0 animate-fade-in-up animation-delay-200">
                    {slide.headingPre}{" "}
                    <span className="text-gradient-gold">{slide.headingSpan}</span>
                  </h1>

                  {/* Subheading */}
                  <p className="text-xs md:text-sm lg:text-base text-primary-foreground/90 mb-4 md:mb-5 lg:mb-6 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up animation-delay-400">
                    {slide.subheading}
                  </p>

                  {/* Countdown Deadline & Supporting Text - Centered */}
                  {config.hero.countdown && daysLeft > 0 && (
                    <div className="mb-5 md:mb-6 lg:mb-7 opacity-0 animate-fade-in-up animation-delay-500">
                      <div className="bg-gradient-to-br from-gold/15 to-gold-light/5 backdrop-blur-sm border border-gold/30 rounded-xl p-3 md:p-4 max-w-2xl mx-auto">
                        <p className="text-xs md:text-sm lg:text-base text-primary-foreground font-semibold mb-1.5 md:mb-2">
                          {config.hero.countdown.deadlineText}
                        </p>
                        <p className="text-[10px] md:text-xs lg:text-sm text-primary-foreground/80 italic">
                          {config.hero.countdown.supportingText}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center opacity-0 animate-fade-in-up animation-delay-600">
                    <button
                      onClick={() => handleScroll("#packages")}
                      className="px-5 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 bg-accent text-accent-foreground rounded-full text-sm md:text-base lg:text-lg font-medium hover:bg-accent/90 transition-all shadow-gold hover:shadow-lg hover:scale-105"
                    >
                      {config.hero.buttons.explore}
                    </button>
                    <ContactPopup>
                      <button className="px-5 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/30 rounded-full text-sm md:text-base lg:text-lg font-medium hover:bg-primary-foreground/20 transition-all backdrop-blur-sm">
                        {config.hero.buttons.contact}
                      </button>
                    </ContactPopup>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 z-30" />
        <CarouselNext className="right-4 z-30" />
      </Carousel>

      <div className="absolute bottom-[70px] md:bottom-[40px] left-1/2 -translate-x-1/2 text-center z-20">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 opacity-0 animate-fade-in animation-delay-800">
          {config.hero.trustBadges.map((badge, index) => (
            <div key={index} className="text-center">
              <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-gold">{badge.value}</p>
              <p className="text-primary-foreground/70 text-[10px] md:text-xs lg:text-sm">{badge.label}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => handleScroll("#about")}
        className="absolute bottom-[3px] left-1/2 -translate-x-1/2 text-primary-foreground/70 hover:text-primary-foreground transition-colors animate-float z-30 p-0 leading-none"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6 md:w-8 md:h-8" />
      </button>
    </section>
  );
};

export default Hero;

