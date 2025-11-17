import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Play, Pause } from "lucide-react";

export interface DemoSlide {
  id: number;
  title: string;
  description: string;
  content: React.ReactNode;
}

interface DemoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  slides: DemoSlide[];
  demoTitle: string;
  color: string;
}

export const DemoPlayer = ({ isOpen, onClose, slides, demoTitle, color }: DemoPlayerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || !isOpen) return;

    const timer = setTimeout(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentSlide, isPlaying, slides.length, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
      setIsPlaying(true);
    }
  }, [isOpen]);

  const goToNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
      setIsPlaying(true);
    }
  };

  const goToPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 bg-transparent border-0 overflow-hidden">
        <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-3xl rounded-2xl border-2 border-white/20 shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>

          {/* Header */}
          <div className={`p-6 bg-gradient-to-r ${color} text-white`}>
            <h2 className="text-3xl font-bold">{demoTitle}</h2>
            <p className="text-white/80 mt-2">Interactive Demo Experience</p>
          </div>

          {/* Slide Content */}
          <div className="p-8 min-h-[500px]">
            <div className="animate-fade-in" key={currentSlide}>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {slides[currentSlide].title}
              </h3>
              <p className="text-muted-foreground mb-6 text-lg">
                {slides[currentSlide].description}
              </p>
              <div className="bg-gradient-to-br from-background/50 to-background/30 rounded-xl p-8 border border-border/50 backdrop-blur-sm min-h-[300px] flex items-center justify-center">
                {slides[currentSlide].content}
              </div>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 pb-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? `w-8 bg-gradient-to-r ${color}`
                    : 'w-2 bg-muted hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between p-6 border-t border-border/50">
            <Button
              onClick={goToPrev}
              disabled={currentSlide === 0}
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/20"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground font-medium">
                {currentSlide + 1} / {slides.length}
              </span>
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="outline"
                size="icon"
                className="bg-white/10 backdrop-blur-sm border-white/20"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Button
              onClick={goToNext}
              disabled={currentSlide === slides.length - 1}
              size="lg"
              className={`bg-gradient-to-r ${color} text-white`}
            >
              Next
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
