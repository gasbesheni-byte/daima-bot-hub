import { useState, useRef, useCallback } from "react";
import { Heart, X, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SwipeCardProps {
  name: string;
  age: number;
  distance: string;
  photo: string;
  icebreaker: string;
  sharedInterests: string[];
  onLike: () => void;
  onPass: () => void;
}

const SwipeCard = ({
  name,
  age,
  distance,
  photo,
  icebreaker,
  sharedInterests,
  onLike,
  onPass,
}: SwipeCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const isHorizontal = useRef<boolean | null>(null);

  const threshold = 100;

  const handleStart = useCallback((clientX: number, clientY: number) => {
    startX.current = clientX;
    startY.current = clientY;
    isHorizontal.current = null;
    setIsDragging(true);
  }, []);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;
    const dx = clientX - startX.current;
    const dy = clientY - startY.current;
    
    if (isHorizontal.current === null) {
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        isHorizontal.current = Math.abs(dx) > Math.abs(dy);
      }
      return;
    }
    
    if (isHorizontal.current) {
      setOffset(dx);
    }
  }, [isDragging]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    if (offset > threshold) {
      onLike();
    } else if (offset < -threshold) {
      onPass();
    }
    setOffset(0);
    isHorizontal.current = null;
  }, [offset, onLike, onPass]);

  const rotation = offset * 0.1;
  const opacity = Math.max(0, 1 - Math.abs(offset) / 300);

  return (
    <div
      ref={cardRef}
      className="relative touch-pan-y overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-soft)] transition-shadow"
      style={{
        transform: `translateX(${offset}px) rotate(${rotation}deg)`,
        opacity,
        transition: isDragging ? "none" : "transform 0.3s ease, opacity 0.3s ease",
      }}
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={() => { if (isDragging) handleEnd(); }}
      onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handleEnd}
    >
      {/* Swipe indicators */}
      {offset > 30 && (
        <div className="absolute left-4 top-4 z-20 rounded-lg border-2 border-primary bg-primary/20 px-3 py-1">
          <span className="text-sm font-bold text-primary">LIKE 💚</span>
        </div>
      )}
      {offset < -30 && (
        <div className="absolute right-4 top-4 z-20 rounded-lg border-2 border-destructive bg-destructive/20 px-3 py-1">
          <span className="text-sm font-bold text-destructive">PASS</span>
        </div>
      )}

      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden select-none pointer-events-none">
        <img src={photo} alt={name} className="h-full w-full object-cover" draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-2xl font-semibold text-primary-foreground">{name}, {age}</h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-primary-foreground/80">
            <MapPin className="h-3.5 w-3.5" />
            <span>{distance}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent shrink-0" />
          <span className="text-xs font-medium text-muted-foreground">Why you might connect</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {sharedInterests.map((interest) => (
            <Badge key={interest} variant="secondary" className="rounded-full bg-sage px-3 py-1 text-xs font-medium text-sage-foreground">
              {interest}
            </Badge>
          ))}
        </div>
        <div className="rounded-xl bg-peach p-4">
          <p className="text-xs font-medium text-peach-foreground/70 mb-1">Their icebreaker</p>
          <p className="text-sm text-peach-foreground leading-relaxed italic">"{icebreaker}"</p>
        </div>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Button onClick={onPass} variant="outline" size="icon" className="h-14 w-14 rounded-full border-2 border-muted-foreground/20 text-muted-foreground hover:border-destructive hover:text-destructive transition-colors">
            <X className="h-6 w-6" />
          </Button>
          <Button onClick={onLike} size="icon" className="h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform">
            <Heart className="h-7 w-7" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
