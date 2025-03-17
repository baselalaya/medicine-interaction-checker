'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InteractionResult } from '@/types';
import { formatDate } from '@/lib/utils';

export function HistoryList() {
  const [history, setHistory] = useState<InteractionResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<InteractionResult | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchHistory() {
      try {
        const { data, error } = await supabase
          .from('ai_requests')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setHistory(data || []);
      } catch (error: any) {
        setError(error.message || 'Failed to load history');
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, [supabase]);

  if (isLoading) {
    return <div className="text-center py-8">Loading history...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (history.length === 0) {
    return <div className="text-center py-8">No history found. Start by checking some medicine interactions.</div>;
  }

  return (
    <div>
      {selectedResult ? (
        <div>
          <Button 
            variant="outline" 
            onClick={() => setSelectedResult(null)}
            className="mb-4"
          >
            Back to History
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle>Interaction Analysis from {formatDate(selectedResult.created_at!)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Medicines analyzed:</h4>
                <ul className="list-disc pl-5">
                  {selectedResult.medicines.map((medicine, index) => (
                    <li key={index}>{medicine}</li>
                  ))}
                </ul>
              </div>
              
              <div className="prose max-w-none">
                <h4 className="font-medium mb-2">Analysis:</h4>
                <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap">
                  {selectedResult.result}
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-yellow-50 text-yellow-800 rounded-md text-sm">
                <strong>Disclaimer:</strong> This information is provided for educational purposes only and is not a substitute for professional medical advice. Always consult with a qualified healthcare provider before making any changes to your medication regimen.
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Interaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {history.map((item) => (
                <li key={item.id} className="py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{formatDate(item.created_at!)}</p>
                      <p className="text-sm text-gray-600">
                        Medicines: {item.medicines.join(', ')}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedResult(item)}
                    >
                      View
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
