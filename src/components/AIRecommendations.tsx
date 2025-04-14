"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { getOrchidCareRecommendation, OrchidCareRecommendationOutput } from "@/ai/flows/orchid-care-recommendation";

const AIRecommendations = () => {
  const [orchidName, setOrchidName] = useState('');
  const [careLogs, setCareLogs] = useState('');
  const [notes, setNotes] = useState('');
  const [recommendations, setRecommendations] = useState<OrchidCareRecommendationOutput | null>(null);

  const generateRecommendations = async () => {
    const result = await getOrchidCareRecommendation({ orchidName, careLogs, notes });
    setRecommendations(result);
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">AI Care Recommendations</h3>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Orchid Name"
          value={orchidName}
          onChange={(e) => setOrchidName(e.target.value)}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Care Logs (e.g., watered on 2024-01-01, fertilized on 2024-01-15)"
          value={careLogs}
          onChange={(e) => setCareLogs(e.target.value)}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Notes (e.g., leaves are yellowing)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mb-2"
        />
        <Button onClick={generateRecommendations}>Generate Recommendations</Button>

        {recommendations && (
          <div className="mt-4">
            <h4>Watering Recommendation:</h4>
            <p>{recommendations.wateringRecommendation}</p>
            <h4>Fertilizing Recommendation:</h4>
            <p>{recommendations.fertilizingRecommendation}</p>
            <h4>Problem Identification:</h4>
            <p>{recommendations.problemIdentification}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
