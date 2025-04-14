"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { orchidProblemAnalysis, OrchidProblemAnalysisOutput } from "@/ai/flows/orchid-problem-analysis";
import { analyzeProductQuality, AnalyzeProductQualityOutput } from "@/ai/flows/product-quality-check";

const AIHelp = () => {
  const [problemPhoto, setProblemPhoto] = useState<string | null>(null);
  const [productPhoto, setProductPhoto] = useState<string | null>(null);
  const [problemAnalysis, setProblemAnalysis] = useState<OrchidProblemAnalysisOutput | null>(null);
  const [productQuality, setProductQuality] = useState<AnalyzeProductQualityOutput | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleProblemPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProblemPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeOrchidProblem = async () => {
    if (problemPhoto) {
      const result = await orchidProblemAnalysis({ photoUrl: problemPhoto, additionalNotes });
      setProblemAnalysis(result);
    } else {
      alert("Please upload an orchid problem photo.");
    }
  };

  const analyzeProduct = async () => {
    if (productPhoto) {
      const result = await analyzeProductQuality({ productPhotoUrl: productPhoto, productDescription });
      setProductQuality(result);
    } else {
      alert("Please upload a product photo.");
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Orchid Problem Analysis</h3>
        </CardHeader>
        <CardContent>
          <Input type="file" accept="image/*" onChange={handleProblemPhotoUpload} />
          {problemPhoto && <img src={problemPhoto} alt="Orchid Problem" className="mt-2 max-h-40 rounded-md" />}
          <Input
            type="text"
            placeholder="Additional notes about the problem"
            className="mt-2"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
          />
          <Button className="mt-2" onClick={analyzeOrchidProblem}>Analyze Problem</Button>
          {problemAnalysis && (
            <div className="mt-4">
              <h4>Problem Identification:</h4>
              <p>{problemAnalysis.problemIdentification}</p>
              <h4>Suggested Solutions:</h4>
              <p>{problemAnalysis.suggestedSolutions}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <h3 className="text-lg font-semibold">Product Quality Analysis</h3>
        </CardHeader>
        <CardContent>
          <Input type="file" accept="image/*" onChange={handleProductPhotoUpload} />
          {productPhoto && <img src={productPhoto} alt="Product" className="mt-2 max-h-40 rounded-md" />}
          <Input
            type="text"
            placeholder="Product description"
            className="mt-2"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <Button className="mt-2" onClick={analyzeProduct}>Analyze Product</Button>
          {productQuality && (
            <div className="mt-4">
              <h4>Quality:</h4>
              <p>{productQuality.quality}</p>
              <h4>Reason:</h4>
              <p>{productQuality.reason}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIHelp;
