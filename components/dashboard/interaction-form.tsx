'use client';

import { useState } from 'react';
import  {useForm}  from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { InteractionResult } from '@/types';

const interactionSchema = z.object({
  medicine: z.string().min(1, 'Please enter a medicine name'),
});

type InteractionFormValues = z.infer<typeof interactionSchema>;

interface InteractionFormProps {
  onResult: (result: InteractionResult) => void;
}

export function InteractionForm({ onResult }: InteractionFormProps) {
  const [medicines, setMedicines] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InteractionFormValues>({
    resolver: zodResolver(interactionSchema),
  });

  const addMedicine = (data: InteractionFormValues) => {
    setMedicines([...medicines, data.medicine]);
    reset();
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const checkInteractions = async () => {
    if (medicines.length < 2) {
      setError('Please add at least two medicines to check for interactions');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ medicines }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check interactions');
      }

      onResult({
        medicines,
        result: data.result,
      });
      
      // Clear the medicines list after successful check
      setMedicines([]);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Check Medicine Interactions</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="p-3 mb-4 bg-red-50 text-red-500 rounded-md">{error}</div>
        )}

        <form onSubmit={handleSubmit(addMedicine)} className="flex gap-2 mb-4">
          <Input
            placeholder="Enter medicine name"
            {...register('medicine')}
            error={errors.medicine?.message}
            className="flex-1"
          />
          <Button type="submit" size="sm">Add</Button>
        </form>

        {medicines.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Medicines to check:</h4>
            <ul className="space-y-2">
              {medicines.map((medicine, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>{medicine}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeMedicine(index)}
                    className="text-red-500 h-auto py-1"
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={checkInteractions} 
          disabled={isLoading || medicines.length < 2} 
          className="w-full"
        >
          {isLoading ? 'Checking...' : 'Check Interactions'}
        </Button>
      </CardFooter>
    </Card>
  );
}