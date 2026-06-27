"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Image, Upload, X } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category, ProductImageData, getImageUrl } from "@/lib/admin/types";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  sortOrder: z.coerce.number().int(),
});

type FormValues = z.infer<typeof schema>;

interface CategoryFormDialogProps {
  initialData?: Category;
  loading?: boolean;
  onSubmit: (values: FormData) => Promise<void>;
  onCancel: () => void;
}

export default function CategoryForm({
  initialData,
  loading,
  onSubmit,
  onCancel,
}: CategoryFormDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(
    initialData ? getImageUrl(initialData as { image?: Category["image"] }) : "",
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      status: initialData?.status || "active",
      sortOrder: initialData?.sortOrder ?? 0,
    },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function removeFile() {
    setFile(null);
    setPreview(
    initialData ? getImageUrl(initialData) : "",
    );
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleSubmit(values: FormValues) {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.slug) formData.append("slug", values.slug);
    if (values.description) formData.append("description", values.description);
    formData.append("status", values.status);
    formData.append("sortOrder", String(values.sortOrder));
    if (file) {
      formData.append("image", file);
    }
    if (initialData && !file && !preview) {
      formData.append("image", "");
    }
    await onSubmit(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="slug" render={({ field }) => (
          <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} placeholder="auto-generated" /></FormControl><FormMessage /></FormItem>
        )} />

        <div className="space-y-2">
          <FormLabel>Image</FormLabel>
          <div className="flex items-start gap-4">
            <div className="relative flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
              {preview ? (
                <>
                  <img src={preview} alt="Preview" className="size-full object-cover" />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow"
                  >
                    <X className="size-3" />
                  </button>
                </>
              ) : (
                <Image className="size-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => inputRef.current?.click()}
              >
                <Upload className="mr-2 size-4" />
                {preview ? "Change Image" : "Upload Image"}
              </Button>
              <p className="mt-1 text-xs text-muted-foreground">
                JPG, PNG or WebP. Max 5MB.
              </p>
            </div>
          </div>
        </div>

        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem><FormLabel>Status</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="sortOrder" render={({ field }) => (
            <FormItem><FormLabel>Sort Order</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <div className="flex gap-2">
          <LoadingButton type="submit" loading={!!loading}>Save</LoadingButton>
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </Form>
  );
}
