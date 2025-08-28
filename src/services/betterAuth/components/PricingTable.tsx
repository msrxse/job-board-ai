import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";

const data = [
  {
    name: "Basic",
    price: 100,
    price_annually: 80,
    billed_annually: false,
    features: [
      "Create Job Listings",
      "Manage Applicant Workflow",
      "Post 1 Job Listing",
    ],
  },
  {
    name: "Growth",
    price: 230,
    price_annually: 200,
    billed_annually: false,
    features: [
      "Create Job Listings",
      "Manage Applicant Workflow",
      "Post 3 Job Listing",
      "1 Featured Job Listing",
    ],
  },
  {
    name: "Enterprise",
    price: 1000,
    price_annually: 800,
    billed_annually: false,
    features: [
      "Create Job Listings",
      "Manage Applicant Workflow",
      "Post 15 Job Listing",
      "Unlimited Featured Job Listings",
    ],
  },
];

export function PricingTable() {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
      {data.map((pricing) => (
        <Card key={pricing.name} className="min-w-sm h-fit">
          <CardHeader>
            <CardTitle className="text-3xl">{pricing.name}</CardTitle>
            <div className="flex items-center gap-x-2">
              <h1 className="text-2xl">£{pricing.price}</h1>
              <p className="text-sm text-muted-foreground">/ month</p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="billed_annually" />
              <Label htmlFor="billed_annually">Billed Annually</Label>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col bg-muted py-4 min-h-36">
            {pricing.features.map((feat) => (
              <div key={feat} className="flex items-center gap-x-2">
                <Check size="20" color="green" />
                <p>{feat}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full">Subscribe</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
