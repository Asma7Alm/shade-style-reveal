
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalysisResultsProps {
  results: {
    skinTone: string;
    hairColor: string;
    eyeColor: string;
  };
}

const AnalysisResults = ({ results }: AnalysisResultsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-600">Skin Tone</span>
            <span className="text-sm font-semibold text-gray-900">{results.skinTone}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-600">Hair Color</span>
            <span className="text-sm font-semibold text-gray-900">{results.hairColor}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-600">Eye Color</span>
            <span className="text-sm font-semibold text-gray-900">{results.eyeColor}</span>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <p className="text-xs text-gray-500 text-center">
            Based on these features, we've created your personalized color palette
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
