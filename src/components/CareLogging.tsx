"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const CareLogging = () => {
  const [watering, setWatering] = useState('');
  const [fertilizing, setFertilizing] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Watering: ${watering}, Fertilizing: ${fertilizing}, Note: ${note}`);
    setWatering('');
    setFertilizing('');
    setNote('');
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Care Logging</h3>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="watering">Watering Details</Label>
            <Input
              type="text"
              id="watering"
              placeholder="Watering details"
              value={watering}
              onChange={(e) => setWatering(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fertilizing">Fertilizing Details</Label>
            <Input
              type="text"
              id="fertilizing"
              placeholder="Fertilizing details"
              value={fertilizing}
              onChange={(e) => setFertilizing(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              placeholder="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <Button type="submit">Log Care</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CareLogging;
