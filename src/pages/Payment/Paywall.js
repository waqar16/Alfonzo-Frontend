import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const plans = [
  {
    id: 'free',
    name: 'Free Plan',
    description: 'Basic document creation',
    price: '$0',
    features: [
      { text: 'Create 5 documents per month', included: true },
      { text: 'No premium templates', included: false },
      { text: 'No lawyer verification', included: false }
    ],
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    description: 'Unlimited document creation + lawyer verification',
    price: '$49',
    features: [
      { text: 'Unlimited document creation', included: true },
      { text: 'Access to all premium templates', included: true },
      { text: 'No lawyer verification', included: false }
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    description: 'Advanced features for teams',
    price: '$99',
    features: [
      { text: 'Everything in Premium', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Team collaboration tools', included: true },
      { text: '24/7 support', included: true },
    ],
  }
];

const Paywall = () => {
  const [selectedPlan, setSelectedPlan] = useState('free');

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-4 pt-16 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-100">  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Upgrade your experience
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Unlock premium features
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Enhance your document creation and verification process with our membership plans.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-6 border rounded-lg shadow-sm transition-shadow duration-300 cursor-pointer ${
                  selectedPlan === plan.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200'
                }`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                <div className="text-center">
                  <h3 className={`text-2xl font-bold ${selectedPlan === plan.id ? 'text-indigo-600' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-gray-500">
                    {plan.description}
                  </p>
                  <p className="text-4xl font-bold mt-4">{plan.price}</p>
                  <span className="text-sm text-gray-500">per month</span>
                </div>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <FontAwesomeIcon
                        icon={feature.included ? faCheckCircle : faTimesCircle}
                        className={`mr-3 ${feature.included ? 'text-green-500' : 'text-red-500'}`}
                      />
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 text-center">
                  <button
                    className={`px-6 py-3 rounded-md ${
                      selectedPlan === plan.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paywall;
