import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function StockPredictionTechniques() {

    const techniques = [
        {
            id: "time-series",
            name: "Time Series Models",
            description: "These models explicitly handle sequential data and are widely used in stock prediction.",
            models: [
                {
                    name: "ARIMA",
                    fullName: "Auto-Regressive Integrated Moving Average",
                    bestFor: "Capturing linear trends in stock prices.",
                    pros: ["Simple and interpretable", "Effective for stationary data"],
                    cons: ["Struggles with nonlinear patterns", "Requires stationary data and careful parameter tuning"]
                },
                {
                    name: "Prophet",
                    fullName: "Prophet (Developed by Facebook)",
                    bestFor: "Modeling seasonality and trends in time series.",
                    pros: ["Easy to use", "Handles holidays and seasonal components"],
                    cons: ["Limited for datasets with complex relationships or multiple features"]
                }
            ]
        },
        {
            id: "machine-learning",
            name: "Traditional Machine Learning Models",
            description: "These models work well when additional features, such as technical indicators or sentiment data, are available.",
            models: [
                {
                    name: "Random Forest",
                    bestFor: "Handling datasets with many features (e.g., RSI, MACD).",
                    pros: ["Robust to overfitting", "Interpretable"],
                    cons: ["Ignores sequential dependencies in the data"]
                },
                {
                    name: "Gradient Boosting Models",
                    fullName: "Gradient Boosting Models (e.g., XGBoost, LightGBM, CatBoost)",
                    bestFor: "Capturing complex relationships in tabular data.",
                    pros: ["High performance with proper feature engineering", "Effective for nonlinear relationships"],
                    cons: ["Requires time-series-specific feature engineering to incorporate sequential dependencies"]
                }
            ]
        },
        {
            id: "neural-networks",
            name: "Neural Networks",
            description: "Effective for capturing nonlinear patterns and temporal dependencies.",
            models: [
                {
                    name: "LSTM",
                    fullName: "Long Short-Term Memory",
                    bestFor: "Long-term dependencies in sequential data.",
                    pros: ["Excellent for time series", "Remembers past information over long intervals"],
                    cons: ["Computationally expensive", "Prone to overfitting with limited data"]
                },
                {
                    name: "GRU",
                    fullName: "Gated Recurrent Unit",
                    bestFor: "Similar tasks as LSTM but computationally lighter.",
                    pros: ["Faster training compared to LSTM", "Fewer parameters"],
                    cons: ["Similar limitations as LSTM in terms of overfitting and data requirements"]
                },
                {
                    name: "Transformers",
                    fullName: "Temporal Fusion Transformer",
                    bestFor: "Long-range dependencies and attention mechanisms.",
                    pros: ["Handles large datasets", "State-of-the-art performance"],
                    cons: ["Requires significant computational resources", "Large dataset needed"]
                },
                {
                    name: "CNN",
                    fullName: "Convolutional Neural Networks",
                    bestFor: "Extracting local patterns (e.g., trend detection) in time series.",
                    pros: ["Efficient for feature extraction"],
                    cons: ["Not designed for sequential dependencies on its own"]
                }
            ]
        },
        {
            id: "hybrid-models",
            name: "Hybrid Models",
            description: "Combine the strengths of multiple approaches for better results.",
            models: [
                {
                    name: "LSTM + CNN",
                    bestFor: "Combining feature extraction and temporal modeling.",
                    pros: ["Improved accuracy by addressing individual model limitations"],
                    cons: ["Increased complexity in implementation"]
                },
                {
                    name: "ARIMA + ML/DL",
                    bestFor: "Capturing trends and residual patterns.",
                    pros: ["Improved accuracy by addressing individual model limitations"],
                    cons: ["Increased complexity in implementation"]
                }
            ]
        },
        {
            id: "reinforcement-learning",
            name: "Reinforcement Learning",
            description: "RL focuses on developing trading strategies but indirectly aids in prediction.",
            models: [
                {
                    name: "DQN and PPO",
                    fullName: "Deep Q-Networks and Proximal Policy Optimization",
                    bestFor: "Decision-making and strategy optimization.",
                    pros: ["Dynamic and adaptive learning in real-time environments"],
                    cons: ["Complex to implement", "Requires a robust simulation environment"]
                }
            ]
        }
    ]

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold mb-6">Stock Prediction Techniques</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {techniques.map((technique) => (
                    <Card key={technique.id}>
                        <CardHeader>
                            <CardTitle>{technique.name}</CardTitle>
                            <CardDescription>{technique.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-semibold mb-2">Models:</h3>
                            <div className="flex flex-wrap gap-2">
                                {technique.models.map((model, index) => (
                                    <AlertDialog key={index}>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline">
                                                {model.name}
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    <div className="flex flex-col sm:flex-row items-start gap-2">
                                                        <div className='flex items-center'>
                                                            <AlertDialogHeader className='text-2xl'>{model.name}</AlertDialogHeader>
                                                            <div className='flex-grow'></div>
                                                            {model.fullName && (
                                                                <Badge variant="secondary" className="ml-2">
                                                                    {model.fullName}
                                                                </Badge>
                                                            )}
                                                            <AlertDialogCancel className="ml-6"><Cross1Icon className='h-3 w-3' /></AlertDialogCancel>
                                                        </div>
                                                       
                                                    </div>
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    <div className="space-y-2 mt-4 space-y-2 text-left">
                                                        <p><strong>Best For:</strong> {model.bestFor}</p>
                                                        <div>
                                                            <strong>Pros:</strong>
                                                            <ul className="list-disc list-inside">
                                                                {model.pros.map((pro, i) => (
                                                                    <li key={i}>{pro}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <strong>Cons:</strong>
                                                            <ul className="list-disc list-inside">
                                                                {model.cons.map((con, i) => (
                                                                    <li key={i}>{con}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Key Considerations</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Feature Engineering:</strong> Integrate technical indicators, sentiment data, and macroeconomic variables.</li>
                        <li><strong>Data Quality:</strong> Ensure clean, well-processed data to improve model performance.</li>
                        <li><strong>Evaluation Metrics:</strong> Use RMSE, MAPE, and directional accuracy for robust evaluation.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}