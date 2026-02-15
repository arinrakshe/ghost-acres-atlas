import * as tf from '@tensorflow/tfjs';

export interface TrainingData {
  inputs: number[][];
  outputs: number[][];
}

export interface YieldPredictionInput {
  droughtSeverity: number; // 0-100
  temperatureAnomaly: number; // -10 to +10°C
  floodingRisk: number; // 0-100
  fertilizerShortage: number; // 0-100
  baselineYield: number; // tonnes/hectare
}

// Generate synthetic training data from agricultural patterns
export function generateTrainingData(samples: number = 500): TrainingData {
  const inputs: number[][] = [];
  const outputs: number[][] = [];

  for (let i = 0; i < samples; i++) {
    // Input features (normalized to 0-1)
    const droughtSeverity = Math.random(); // 0-1 (0-100%)
    const temperatureAnomaly = (Math.random() - 0.5) * 2; // -1 to 1 (-10 to +10°C normalized)
    const floodingRisk = Math.random(); // 0-1 (0-100%)
    const fertilizerShortage = Math.random(); // 0-1 (0-100%)
    const baselineYield = Math.random() * 0.8 + 0.2; // 0.2-1.0 (typical range)

    // Calculate realistic yield impact based on agricultural science
    let yieldMultiplier = 1.0;

    // Drought impact (most severe): -100% at severity 1.0
    yieldMultiplier *= (1 - droughtSeverity * 0.9);

    // Temperature: optimal at 15-20°C, severe cold/heat at extremes
    const tempImpact = Math.abs(temperatureAnomaly); // Deviation from optimal
    yieldMultiplier *= Math.max(0.3, 1 - tempImpact * 0.3); // -30% per unit deviation

    // Flooding: -80% at max risk
    yieldMultiplier *= (1 - floodingRisk * 0.8);

    // Fertilizer shortage: -60% at max shortage
    yieldMultiplier *= (1 - fertilizerShortage * 0.6);

    // Add noise
    yieldMultiplier *= (0.85 + Math.random() * 0.3);

    const finalYield = Math.max(0, baselineYield * yieldMultiplier);

    inputs.push([droughtSeverity, temperatureAnomaly, floodingRisk, fertilizerShortage, baselineYield]);
    outputs.push([finalYield]); // Normalized output (0-2 range to handle edge cases)
  }

  return { inputs, outputs };
}

export interface TrainedModel {
  model: tf.LayersModel;
  predict: (input: YieldPredictionInput) => number;
  dispose: () => void;
}

// Create and train a TensorFlow.js model
export async function createAndTrainModel(): Promise<TrainedModel> {
  // Generate training data
  const { inputs, outputs } = generateTrainingData(1000);

  // Normalize data to 0-1 range
  const inputTensor = tf.tensor2d(inputs);
  const outputTensor = tf.tensor2d(outputs);

  // Create neural network
  const model = tf.sequential({
    layers: [
      tf.layers.dense({ units: 16, activation: 'relu', inputShape: [5] }),
      tf.layers.dropout({ rate: 0.2 }),
      tf.layers.dense({ units: 8, activation: 'relu' }),
      tf.layers.dense({ units: 1, activation: 'sigmoid' }), // Output 0-1
    ],
  });

  model.compile({
    optimizer: tf.train.adam(0.01),
    loss: 'meanSquaredError',
    metrics: ['mae'],
  });

  // Train the model
  await model.fit(inputTensor, outputTensor, {
    epochs: 100,
    batchSize: 32,
    verbose: 0,
    shuffle: true,
  });

  // Clean up training tensors
  inputTensor.dispose();
  outputTensor.dispose();

  // Create prediction function
  const predict = (input: YieldPredictionInput): number => {
    const inputTensor = tf.tensor2d([[
      input.droughtSeverity / 100, // Normalize to 0-1
      input.temperatureAnomaly / 10, // Normalize to -1 to 1
      input.floodingRisk / 100, // Normalize to 0-1
      input.fertilizerShortage / 100, // Normalize to 0-1
      input.baselineYield,
    ]]);

    const prediction = model.predict(inputTensor) as tf.Tensor;
    const value = prediction.dataSync()[0];

    inputTensor.dispose();
    prediction.dispose();

    return Math.max(0, Math.min(1, value)); // Clamp to 0-1
  };

  return {
    model,
    predict,
    dispose: () => model.dispose(),
  };
}

// Hook to use the model
import { useEffect, useState } from 'react';

export function useYieldPredictionModel() {
  const [model, setModel] = useState<TrainedModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initModel = async () => {
      try {
        setLoading(true);
        const trainedModel = await createAndTrainModel();
        setModel(trainedModel);
        setError(null);
      } catch (err) {
        console.error('Failed to train model:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    initModel();

    return () => {
      if (model) {
        model.dispose();
      }
    };
  }, []);

  const predict = (input: YieldPredictionInput): number | null => {
    if (!model) return null;
    return model.predict(input);
  };

  return { model, predict, loading, error };
}
