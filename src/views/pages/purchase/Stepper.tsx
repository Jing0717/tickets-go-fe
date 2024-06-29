import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface Step {
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const Stepper = ({ steps, currentStep, setCurrentStep }: StepperProps) => {
  const length = steps.length;

   return (
    <div className="flex flex-col md:items-center items-start overflow-x-auto">
      <div className="flex my-10">
        {steps.map((step, index) => (
          <div key={index} className="text-[14px] w-[117px] text-center relative">
            <button
              className={`w-10 h-10 rounded-full relative z-20 ${
                index <= currentStep ? 'bg-brand-01 text-white' : 'bg-gray-04 text-gray-03'
              }`}
              onClick={() => setCurrentStep(index)}
            >
              {index < currentStep
              ? <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-white absolute left-1/2 translate-x-[-50%] translate-y-[-50%]" />
              : index + 1}
            </button>
            <div className={`absolute left-1/2 border-b-2 z-10 top-[31%] w-[120px] ${(index + 1) === length ? 'hidden' : 'block'} ${currentStep <= index ? 'border-gray-04' : 'border-brand-01' }`}></div>
            <div className={`h7 mt-1 ${index == currentStep ? 'text-gray-02' : 'text-gray-03'}`}>{step.label}</div>
          </div>
        ))}
      </div>
      {/* <div className="flex space-x-4">
        <button
          onClick={() => setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))}
          className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))}
          className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Stepper;
