"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

const KnowledgeBase = () => {
  const knowledgeData = [
    {
      title: "Cultivating Vanda Orchids Indoors",
      content:
        "Vanda orchids require bright, indirect light. Water them frequently, allowing the roots to dry slightly between waterings. Provide high humidity and fertilize regularly.",
    },
    {
      title: "Understanding Orchid Nutrition",
      content:
        "Orchids need a balanced fertilizer. Use a diluted solution every 2-4 weeks during the growing season. Reduce fertilization in the winter.",
    },
    {
      title: "Orchid Repotting Guide",
      content:
        "Repot orchids every 1-2 years to refresh the growing medium. Use a well-draining orchid mix and choose a pot that allows for good air circulation.",
    },
    {
      title: "Pest and Disease Management",
      content:
        "Regularly inspect orchids for pests like mealybugs and scale. Treat infestations with insecticidal soap or neem oil. Ensure good air circulation to prevent fungal diseases.",
    },
    {
      title: "Light Requirements for Different Orchid Types",
      content:
        "Different orchid types have varying light requirements. Phalaenopsis orchids prefer low light, while Cattleya orchids need bright light. Adjust placement accordingly.",
    },
  ];

  return (
    <div>
      {knowledgeData.map((item, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <h3 className="text-lg font-semibold">{item.title}</h3>
          </CardHeader>
          <CardContent>
            <p>{item.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KnowledgeBase;

