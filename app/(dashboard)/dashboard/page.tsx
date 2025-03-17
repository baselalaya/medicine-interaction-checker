'use client';

import { useState } from 'react';
import { InteractionForm } from '@/components/dashboard/interaction-form';
import { InteractionResultDisplay } from '@/components/dashboard/interaction-result';
import { InteractionResult } from '@/types';

export default function DashboardPage() {
  const [result, setResult] = useState<InteractionResult | null>(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Medicine Interaction Checker</h1>
      <InteractionForm onResult={setResult} />
      <InteractionResultDisplay result={result} />
    </div>
  );
}
