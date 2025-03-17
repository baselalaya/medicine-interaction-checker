export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Create an Account',
      description: 'Sign up for a free account to get started with our medicine interaction checker.',
    },
    {
      number: '02',
      title: 'Enter Your Medications',
      description: 'Add the names of the medications you want to check for potential interactions.',
    },
    {
      number: '03',
      title: 'Get AI Analysis',
      description: 'Our AI analyzes the medications and provides a detailed report on potential interactions.',
    },
    {
      number: '04',
      title: 'Review and Share',
      description: 'Review the results and share them with your healthcare provider if needed.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Checking for medicine interactions is simple and straightforward with our platform.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-start mb-12 last:mb-0">
              <div className="flex-shrink-0 bg-blue-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                {step.number}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
