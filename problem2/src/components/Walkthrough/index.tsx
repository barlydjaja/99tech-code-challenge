import { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from 'src/components/ui/card.tsx';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface WalkthroughStep {
  title: string;
  description: string;
  targetSelector?: string;
  highlightPadding?: number;
  highlightColor?: string;
  highlightBorderWidth?: number;
  highlightStyle?: string;
  highlightRadius?: number;
  autoScroll?: boolean;
}

const walkhroughSteps: WalkthroughStep[] = [
  {
    title: 'Welcome to Fancy Form!',
    description: 'This quick tutorial will show you how to use our main features.',
  },
  {
    title: 'Check Your Balance',
    description: 'Here you can see your current account balance and your currency',
    targetSelector: '#balance-section'
  },
  {
    title: 'Select a coin to exchange',
    description: 'You can select and search list of coin to exchange',
    targetSelector: '#coin-section'
  },
  {
    title: 'Insert a USD amount to exchange',
    description: 'Make sure you don\'t exceed your current balance',
    targetSelector: '#amount-section'
  },
  {
    title: 'Exchange now!',
    description: 'That\'s all, Try me now!',
    targetSelector: '#submit-section'
  },
];

interface HighlightPosition {
  top: number;
  left: number;
  width: number;
  height: number;
  borderWidth: number;
  borderStyle: string;
  borderColor: string;
  borderRadius: number;
}

interface WalkthroughProps {
  steps?: WalkthroughStep[];
  onComplete?: () => void;
  initiallyVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

const Walkthrough = ({ steps = walkhroughSteps, onComplete, onVisibleChange, initiallyVisible = true }: WalkthroughProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showWalkthrough, setShowWalkthrough] = useState(initiallyVisible);
  const [highlightPosition, setHighlightPosition] = useState<HighlightPosition  | null>(null);

  const updateVisibility = (newVisibility: boolean) => {
    setShowWalkthrough(newVisibility);
    onVisibleChange?.(newVisibility);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowWalkthrough(false);
      onComplete?.();
    }
  };

  const handleClose = () => {
    updateVisibility(false);
    onComplete?.();
  };

  const updateHighlightPosition = useCallback(() => {
    const currentStepInfo = steps[currentStep];
    const currentTarget = currentStepInfo.targetSelector;

    if (currentTarget) {
      const element = document.querySelector(currentTarget);
      if (element) {
        const rect = element.getBoundingClientRect();

        // Add padding to highlight area if specified
        const padding = currentStepInfo.highlightPadding || 8;

        setHighlightPosition({
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + (padding * 2),
          height: rect.height + (padding * 2),
          // Additional highlight styles from step config
          borderColor: currentStepInfo.highlightColor || 'rgb(59, 130, 246)', // blue-500
          borderWidth: currentStepInfo.highlightBorderWidth || 2,
          borderStyle: currentStepInfo.highlightStyle || 'solid',
          borderRadius: currentStepInfo.highlightRadius || 0
        });

        // Scroll element into view if needed
        if (currentStepInfo.autoScroll !== false) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest'
          });
        }
      }
    } else {
      setHighlightPosition(null);
    }
  }, [currentStep, steps]);

  const cardPosition = useMemo(() => {
    if (!highlightPosition) return 'center';

    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - (highlightPosition.top + highlightPosition.height);
    const spaceAbove = highlightPosition.top;

    if (spaceBelow >= 250) return 'below';
    if (spaceAbove >= 250) return 'above';
    return 'center';
  },[highlightPosition]);

  useEffect(() => {
    updateHighlightPosition();
    window.addEventListener('resize', updateHighlightPosition);
    return () => window.removeEventListener('resize', updateHighlightPosition);
  }, [currentStep, updateHighlightPosition]);

  return (
    <>
      { showWalkthrough && (
        <div className="fixed inset-0 z-50 !mt-0">
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50">
            {/* Highlight cutout */}
            {highlightPosition && (
              <div
                className="absolute bg-transparent transition-all duration-300 ease-in-out"
                style={{
                  top: highlightPosition.top,
                  left: highlightPosition.left,
                  width: highlightPosition.width,
                  height: highlightPosition.height,
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
                  border: `${highlightPosition.borderWidth}px ${highlightPosition.borderStyle} ${highlightPosition.borderColor}`,
                  borderRadius: highlightPosition.borderRadius,
                }}
              >
                {/* Optional pulse animation */}
                <div
                  className="absolute inset-0 animate-pulse opacity-30"
                  style={{
                    backgroundColor: highlightPosition.borderColor,
                    borderRadius: highlightPosition.borderRadius,
                  }}
                />
              </div>
            )}
          </div>

          {/* Tooltip Card */}
          <Card
            className={`absolute w-80 max-w-md transition-all duration-300 ease-in-out ${
              cardPosition === 'below' ? 'mt-4' :
                cardPosition === 'above' ? '-mt-4' :
                  'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            }`}
            style={{
              ...(highlightPosition && cardPosition === 'below' ? {
                top: highlightPosition.top + highlightPosition.height + 20,
                left: Math.max(highlightPosition.left + (highlightPosition.width / 2) - 160, 16),
              } : highlightPosition && cardPosition === 'above' ? {
                top: highlightPosition.top - 200,
                left: Math.max(highlightPosition.left + (highlightPosition.width / 2) - 160, 16),
              } : {})
            }}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20}/>
                </button>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">{steps[currentStep].title}</h3>
                <p className="text-gray-600">{steps[currentStep].description}</p>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`flex items-center ${
                    currentStep === 0 ? 'text-gray-300' : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  <ChevronLeft size={20}/>
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep < steps.length - 1 && <ChevronRight size={20}/>}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Walkthrough;
