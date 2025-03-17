import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { InteractionResult } from '@/types';

interface InteractionResultProps {
  result: InteractionResult | null;
}

export function InteractionResultDisplay({ result }: InteractionResultProps) {
  if (!result) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Interaction Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="font-medium mb-2">Medicines analyzed:</h4>
          <ul className="list-disc pl-5">
            {result.medicines.map((medicine, index) => (
              <li key={index}>{medicine}</li>
            ))}
          </ul>
        </div>
        
        <div className="prose max-w-none">
          <h4 className="font-medium mb-2">Analysis:</h4>
          <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap">
            {result.result}
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-yellow-50 text-yellow-800 rounded-md text-sm">
          <strong>Disclaimer:</strong> This information is provided for educational purposes only and is not a substitute for professional medical advice. Always consult with a qualified healthcare provider before making any changes to your medication regimen.
        </div>
      </CardContent>
    </Card>
  );
}
