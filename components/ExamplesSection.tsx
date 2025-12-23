"use client";

import { useRef, useState, useEffect } from "react";
import { Briefcase, Globe, Calendar, ShoppingBag, ArrowRight, Settings2, Sparkles } from "lucide-react";
import { WaterdropCursor } from "./WaterdropCursor";

interface ExampleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function ExampleCard({ title, description, icon }: ExampleCardProps) {
  return (
    <div className="flex-none w-72 sm:w-80 md:w-96 mr-6 last:mr-0">
      <div className="bg-section-card-bg border border-gray-100 p-8 rounded-2xl h-full flex flex-col justify-between hover:shadow-lg transition-all duration-300">
        <div>
          <div className="bg-section-bg p-4 rounded-xl inline-block mb-6 shadow-sm text-section-text border border-gray-100/50">
            {icon}
          </div>
          <h3 className="text-2xl font-light text-section-text mb-3 text-left">
            {title}
          </h3>
          <p className="text-section-text/60 font-light leading-relaxed text-left">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ExamplesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const examples = [
    {
      title: "Portfolios",
      description: "Showcase your work with stunning, minimalist designs that put your creativity front and center.",
      icon: <Briefcase size={24} strokeWidth={1.5} />,
    },
    {
      title: "Websites",
      description: "Custom built websites that tell your story and connect with your audience in meaningful ways.",
      icon: <Globe size={24} strokeWidth={1.5} />,
    },
    {
      title: "Reservations",
      description: "Seamless booking systems for restaurants, hotels, and service-based businesses.",
      icon: <Calendar size={24} strokeWidth={1.5} />,
    },
    {
      title: "E-commerce",
      description: "Powerful online stores designed to convert visitors into customers with smooth checkout experiences.",
      icon: <ShoppingBag size={24} strokeWidth={1.5} />,
    },
    {
      title: "Landing Pages",
      description: "High-conversion landing pages optimized for marketing campaigns and product launches.",
      icon: <ArrowRight size={24} strokeWidth={1.5} />,
    },
    {
      title: "Automation",
      description: "Streamline your workflows with smart automation tools that save time and reduce errors.",
      icon: <Settings2 size={24} strokeWidth={1.5} />,
    },
    {
      title: "Any other project",
      description: "Have a unique idea? Let's bring it to life with custom solutions tailored to your specific needs.",
      icon: <Sparkles size={24} strokeWidth={1.5} />,
    },
  ];

  // Duplicate examples for infinite scroll effect
  const displayExamples = [...examples, ...examples, ...examples];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftGradient(scrollLeft > 0);
      setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let scrollSpeed = 0.8; // Adjust for speed

    const scroll = () => {
      if (!isPaused) {
        if (container.scrollLeft >= container.scrollWidth / 3) {
          // Reset to the start (technically the start of the 2nd set, which matches visual start)
          container.scrollLeft = 0; 
        } else {
          container.scrollLeft += scrollSpeed;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-section-bg text-section-text overflow-hidden relative cursor-none transition-colors duration-500"
    >
      <WaterdropCursor sectionRef={sectionRef} theme="dark" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="mb-16">
          <h2 
            className={`text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight mb-6 opacity-0 translate-y-4 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : ""
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Everything you need.
          </h2>
          <p 
            className={`text-lg text-gray-500 max-w-2xl font-light opacity-0 translate-y-4 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : ""
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            From personal portfolios to full-scale e-commerce solutions, 
            I build digital experiences that matter.
          </p>
        </div>

        <div 
          className={`relative opacity-0 translate-y-8 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : ""
          }`}
          style={{ transitionDelay: "500ms" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Gradient Overlay */}
          <div 
            className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
              showLeftGradient ? "opacity-100" : "opacity-0"
            }`} 
          />
          
          {/* Right Gradient Overlay */}
          <div 
            className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
              showRightGradient ? "opacity-100" : "opacity-0"
            }`} 
          />

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-12 pt-4 scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {displayExamples.map((example, index) => (
              <ExampleCard
                // Use index as key because standard unique IDs will duplicate
                key={`${example.title}-${index}`}
                title={example.title}
                description={example.description}
                icon={example.icon}
              />
            ))}
            <div className="w-6 flex-none sm:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
