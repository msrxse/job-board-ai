"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const formSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.length === 1, "Please upload one file")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg and .png files are allowed"
    )
    .refine(
      (files) => files?.[0]?.size <= 2 * 1024 * 1024,
      "File size must be less than 2MB"
    ),
  name: z.string().min(2).max(50),
  slug: z.string().min(2).max(50),
});

export default function OrganizationCreateForm() {
  const [preview, setPreview] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: "",
      name: "",
      slug: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // We need the formData instead because of the file sent
    const formData = new FormData();

    // Append other fields
    formData.append("file", data.file[0]);
    formData.append("name", data.name);

    // TODO: Save data to organizations  - relative to the current user as well.
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    // swap the preview to the server-stored URL
    if (result.url) {
      setPreview(result.url);
    }

    /**
     * Now we can redirect to the employer page.
     * This chosen organization will be displayed on the footer as the logged one.
     *
     * - Temporarily we can say that if the user has an organization
     *   we consider it logged-in when arriving to the employer page.
     * - That is so because with better-auth we are not login organizations
     *   but only users.
     *
     */
    try {
      setIsLoading(true);

      await authClient.organization.create({
        logo: result.url || "",
        name: data.name,
        slug: data.slug,
      });

      toast.success("Organization created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create organization");
    } finally {
      setIsLoading(false);

      redirect("/employer");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Organization</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="rounded-sm size-20">
                    <AvatarImage src={preview} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/png,image/jpeg"
                              onChange={(e) => {
                                // Temporarily set the preview with the selected file
                                const file = e.target.files?.[0];
                                if (file) {
                                  const objectUrl = URL.createObjectURL(file);
                                  setPreview(objectUrl);
                                }
                                return field.onChange(e.target.files);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text-sm text-muted-foreground">
                      Recommended size 1:1, upto 2MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Organization" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="my-org" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-end">
                <Button type="submit" variant="outline" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Create Organization"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
