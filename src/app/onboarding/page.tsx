import AppBar from '@/components/AppBar';
import OnBoarding from '@/components/onboarding';
import React from 'react';

const OnboardingPage: React.FC = () => {
  return (
    <div>
      <AppBar />
      <OnBoarding />
    </div>
  );
};

export default OnboardingPage;