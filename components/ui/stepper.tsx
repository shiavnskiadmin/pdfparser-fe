import { Step, type StepItem, Stepper, useStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface StepperProps {
  steps: Array<StepItem & any>;
}

export default function StepperComponent({ steps }: StepperProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper
        initialStep={0}
        orientation="vertical"
        size="md"
        scrollTracking={true}
        steps={steps}
      >
        {steps.map((stepProps: any) => {
          return (
            <Step key={stepProps.id} {...stepProps}>
              <div className="min-h-40 flex items-center justify-center my-2  bg-accent/10 text-primary rounded-md">
                {stepProps.content}
              </div>
            </Step>
          );
        })}
        <Footer />
      </Stepper>
    </div>
  );
}

const Footer = () => {
  const {
    nextStep,
    prevStep,
    isDisabledStep,
    hasCompletedAllSteps,
    isOptionalStep,
  } = useStepper();
  const router = useRouter();
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="min-h-40 flex items-center justify-center my-2 border bg-accent/10 text-primary rounded-md">
          {/** customise this step*/}
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button
            size="sm"
            onClick={() => {
              router.push("/dashboard/extract");
            }}
          >
            Extract data
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
