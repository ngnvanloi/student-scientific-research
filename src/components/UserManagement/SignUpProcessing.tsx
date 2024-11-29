import { useState } from "react";
import { OTPVerification } from "./VerificationOTP";
import { CompleteRegistration } from "./CompleteRegistration";

export default function SignUpProcessing() {
  // Quản lý bước hiện tại
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [numberPhone, setNumberPhone] = useState<string>("");
  // Hàm chuyển bước
  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePrevStep = () => setCurrentStep((prev) => prev - 1);
  const handleOnBack = () => setCurrentStep(1);
  return (
    <div>
      {currentStep === 1 && (
        <CompleteRegistration
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          setNumberphone={setNumberPhone}
          onNext={handleNextStep}
          onBack={handleOnBack}
        />
      )}

      {currentStep === 2 && (
        <OTPVerification
          onPrev={handlePrevStep}
          email={email}
          name={name}
          password={password}
          numberPhone={numberPhone}
          onBack={handleOnBack}
        />
      )}
    </div>
  );
}
