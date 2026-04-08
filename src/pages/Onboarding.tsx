import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Camera, Check } from "lucide-react";

const ALL_INTERESTS = [
  "Hiking", "Coffee", "Photography", "Books", "Jazz", "Cooking",
  "Music", "Yoga", "Travel", "Gaming", "Art", "Fitness",
  "Movies", "Dogs", "Cats", "Nature", "Dancing", "Writing",
];

const PROMPTS = [
  "What's a small thing that made you happy today?",
  "What's a place you'd love to visit again?",
  "What's the last thing that made you laugh out loud?",
  "What's your go-to comfort food on a rainy day?",
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [icebreakerAnswer, setIcebreakerAnswer] = useState("");

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : prev.length < 5 ? [...prev, interest] : prev
    );
  };

  const addPhoto = () => {
    const placeholders = [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    ];
    if (photos.length < 3) {
      setPhotos((p) => [...p, placeholders[p.length]]);
    }
  };

  const steps = [
    // Step 0: Interests
    <div key="interests" className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">Pick your interests</h2>
        <p className="text-sm text-muted-foreground">Choose up to 5. We'll use these to find your people.</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {ALL_INTERESTS.map((interest) => {
          const selected = selectedInterests.includes(interest);
          return (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selected
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-card text-foreground border border-border hover:bg-muted"
              }`}
            >
              {interest}
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs text-muted-foreground">{selectedInterests.length}/5 selected</p>
    </div>,

    // Step 1: Photos
    <div key="photos" className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">Add your photos</h2>
        <p className="text-sm text-muted-foreground">Max 3 photos. Keep it real — no filters needed.</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={addPhoto}
            className="relative aspect-square overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary hover:bg-muted/50"
          >
            {photos[i] ? (
              <img src={photos[i]} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Camera className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">{photos.length}/3 photos</p>
    </div>,

    // Step 2: Icebreaker
    <div key="icebreaker" className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">Your icebreaker</h2>
        <p className="text-sm text-muted-foreground">Answer a prompt so others can start a real conversation.</p>
      </div>
      <div className="space-y-2">
        {PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => setSelectedPrompt(i)}
            className={`w-full rounded-xl p-3 text-left text-sm transition-all ${
              selectedPrompt === i
                ? "bg-sage text-sage-foreground ring-2 ring-primary"
                : "bg-card text-foreground border border-border"
            }`}
          >
            {prompt}
          </button>
        ))}
      </div>
      <textarea
        value={icebreakerAnswer}
        onChange={(e) => setIcebreakerAnswer(e.target.value)}
        placeholder="Write your answer here..."
        maxLength={150}
        className="w-full rounded-xl border border-input bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none h-24"
      />
      <p className="text-right text-xs text-muted-foreground">{icebreakerAnswer.length}/150</p>
    </div>,
  ];

  const canNext =
    (step === 0 && selectedInterests.length >= 3) ||
    (step === 1 && photos.length >= 1) ||
    (step === 2 && icebreakerAnswer.length >= 10);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Progress */}
      <div className="px-6 pt-6">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Step {step + 1} of 3</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6">{steps[step]}</div>

      {/* Navigation */}
      <div className="flex items-center gap-3 p-6 pb-10">
        {step > 0 && (
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-xl px-6 py-5"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Button>
        )}
        <Button
          onClick={() => {
            if (step < 2) setStep((s) => s + 1);
            else navigate("/");
          }}
          disabled={!canNext}
          className="flex-1 rounded-xl bg-primary py-5 text-base font-semibold text-primary-foreground"
        >
          {step < 2 ? (
            <>Next <ArrowRight className="ml-1 h-4 w-4" /></>
          ) : (
            <>Start Discovering <Check className="ml-1 h-4 w-4" /></>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
