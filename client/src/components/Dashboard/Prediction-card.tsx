import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface PredictionCardProps {
  ticker: string;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ ticker }) => {
  const [prediction, setPrediction] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch(`http://localhost:5000/predict/${ticker}`);
        const data = await response.json();
        setPrediction(data);
      } catch (error) {
        console.error('Error fetching prediction:', error);
      }
    };

    fetchPrediction();
  }, [ticker]);

  return (
    <Card className="m-4">
      <CardContent className="p-6">
        {prediction !== null ? (
          <div>
            <h2>Predicted Stock Price for {ticker}</h2>
            <p>${prediction}</p>
          </div>
        ) : (
          <p>Loading prediction...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionCard;