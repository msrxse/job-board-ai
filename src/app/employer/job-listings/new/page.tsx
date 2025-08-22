import { Card, CardContent } from "@/components/ui/card";
import { JobListingForm } from "@/features/jobListings/components/JobListingForm";

export default function NewJobListingPage() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl fond-bold mb-2">New Job listing</h1>
      <p className="text-muted-foreground mb-6">
        This does not post the listing yet. I just saves a draft
      </p>
      <Card>
        <CardContent>
          <JobListingForm />
        </CardContent>
      </Card>
    </div>
  );
}
