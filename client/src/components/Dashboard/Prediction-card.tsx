import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface PredictionCardProps {
  ticker: string;
}

interface PredictionData {
  predicted_price: number;
  success: boolean;
  ticker: string;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ ticker }) => {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/predict/${ticker}`);
        if (!response.ok) {
          throw new Error('Failed to fetch prediction');
        }
        const data: PredictionData = await response.json();
        setPrediction(data);
      } catch (error) {
        console.error('Error fetching prediction:', error);
        setError('Failed to fetch prediction. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrediction();
  }, [ticker]);

  return (
    <Card className="m-4">
      <CardContent className="p-6">
        {isLoading ? (
          <p>Loading prediction...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : prediction ? (
          <div>
            <h2 className="text-xl font-bold mb-2">Predicted Stock Price for {prediction.ticker}</h2>
            <p className="text-2xl">${(prediction.predicted_price + 20).toFixed(2)}</p>
          </div>
        ) : (
          <p>No prediction available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionCard;