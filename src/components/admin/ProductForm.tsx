"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Upload, Image } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { getAllBrandsForSelect, getAllCategoriesForSelect } from "@/lib/admin/services";
import { Brand, Category, Product, ProductImageData } from "@/lib/admin/types";

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be 0 or more"),
  salePrice: z.coerce.number().min(0).optional().or(z.literal("")),
  sku: z.string().optional(),
  stock: z.coerce.number().int().min(0),
  category: z.string().optional(),
  brand: z.string().optional(),
  tags: z.string().optional(),
  colors: z.string().optional(),
  sizes: z.string().optional(),
  status: z.enum(["draft", "active", "archived"]),
  ribbon: z.string().optional(),
  featured: z.boolean(),
  newArrival: z.boolean(),
  bestSeller: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product;
  loading?: boolean;
  onSubmit: (values: FormData) => Promise<void>;
  onCancel: () => void;
}

function splitCsv(value?: string) {
  return value
    ? value.split(",").map((item) => item.trim()).filter(Boolean)
    : [];
}

export default function ProductForm({
  initialData,
  loading,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [primaryFile, setPrimaryFile] = useState<File | null>(null);
  const [primaryPreview, setPrimaryPreview] = useState<string>("");
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [existingGallery, setExistingGallery] = useState<ProductImageData[]>([]);
  const [removedGalleryIds, setRemovedGalleryIds] = useState<string[]>([]);

  const primaryInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      shortDescription: initialData?.shortDescription || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      salePrice: initialData?.salePrice || "",
      sku: initialData?.sku || "",
      stock: initialData?.stock ?? 0,
      category:
        typeof initialData?.category === "object"
          ? initialData.category._id
          : initialData?.category || "",
      brand:
        typeof initialData?.brand === "object"
          ? initialData.brand._id
          : initialData?.brand || "",
      tags: initialData?.tags?.join(", ") || "",
      colors: initialData?.colors?.join(", ") || "",
      sizes: initialData?.sizes?.join(", ") || "",
      status: initialData?.status || "draft",
      ribbon: initialData?.ribbon || "",
      featured: initialData?.featured || false,
      newArrival: initialData?.newArrival || false,
      bestSeller: initialData?.bestSeller || false,
    },
  });

  useEffect(() => {
    Promise.all([getAllCategoriesForSelect(), getAllBrandsForSelect()]).then(
      ([cats, brs]) => {
        setCategories(cats.data);
        setBrands(brs.data);
      },
    );
  }, []);

  useEffect(() => {
    if (initialData?.images) {
      const imgs = initialData.images;
      if (imgs.primary?.url) {
        setPrimaryPreview(imgs.primary.url);
      }
      if (imgs.gallery?.length) {
        setExistingGallery(imgs.gallery);
      }
    }
  }, [initialData]);

  function handlePrimaryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPrimaryFile(file);
    setPrimaryPreview(URL.createObjectURL(file));
  }

  function removePrimary() {
    setPrimaryFile(null);
    setPrimaryPreview("");
    if (primaryInputRef.current) primaryInputRef.current.value = "";
  }

  function handleGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setGalleryFiles((prev) => [...prev, ...files]);
    const previews = files.map((f) => URL.createObjectURL(f));
    setGalleryPreviews((prev) => [...prev, ...previews]);
  }

  function removeNewGallery(index: number) {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  }

  function removeExistingGallery(publicId: string) {
    setExistingGallery((prev) => prev.filter((img) => img.publicId !== publicId));
    setRemovedGalleryIds((prev) => [...prev, publicId]);
  }

  async function handleSubmit(values: ProductFormValues) {
    const formData = new FormData();

    formData.append("title", values.title);
    if (values.slug) formData.append("slug", values.slug);
    if (values.shortDescription) formData.append("shortDescription", values.shortDescription);
    if (values.description) formData.append("description", values.description);
    formData.append("price", String(values.price));
    if (values.salePrice !== "" && values.salePrice !== undefined)
      formData.append("salePrice", String(values.salePrice));
    if (values.sku) formData.append("sku", values.sku);
    formData.append("stock", String(values.stock));
    if (values.category) formData.append("category", values.category);
    if (values.brand) formData.append("brand", values.brand);
    formData.append("status", values.status);
    if (values.ribbon) formData.append("ribbon", values.ribbon);
    formData.append("featured", String(values.featured));
    formData.append("newArrival", String(values.newArrival));
    formData.append("bestSeller", String(values.bestSeller));

    const tags = splitCsv(values.tags);
    tags.forEach((t) => formData.append("tags", t));
    const colors = splitCsv(values.colors);
    colors.forEach((c) => formData.append("colors", c));
    const sizes = splitCsv(values.sizes);
    sizes.forEach((s) => formData.append("sizes", s));

    if (primaryFile) {
      formData.append("primaryImage", primaryFile);
    }

    galleryFiles.forEach((file) => {
      formData.append("galleryImages", file);
    });

    if (initialData) {
      if (existingGallery.length) {
        formData.append("keepGallery", JSON.stringify(existingGallery));
      }
      if (removedGalleryIds.length) {
        formData.append("removedGalleryIds", JSON.stringify(removedGalleryIds));
      }
    }

    await onSubmit(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Product title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug (optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="auto-generated if empty" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (KES)</FormLabel>
                <FormControl>
                  <Input type="number" min={0} step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sale Price</FormLabel>
                <FormControl>
                  <Input type="number" min={0} step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" min={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select value={field.value || "none"} onValueChange={(v) => field.onChange(v === "none" ? "" : v)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <Select value={field.value || "none"} onValueChange={(v) => field.onChange(v === "none" ? "" : v)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand._id} value={brand._id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ribbon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ribbon</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. New, Sale" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Image Upload Section */}
        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="text-sm font-medium">Product Images</h3>

          {/* Primary Image */}
          <div className="space-y-2">
            <FormLabel>Primary Image</FormLabel>
            <div className="flex items-start gap-4">
              <div className="relative flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                {primaryPreview ? (
                  <>
                    <img
                      src={primaryPreview}
                      alt="Primary preview"
                      className="size-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removePrimary}
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
                  ref={primaryInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handlePrimaryChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => primaryInputRef.current?.click()}
                >
                  <Upload className="mr-2 size-4" />
                  {primaryPreview ? "Change Image" : "Upload Image"}
                </Button>
                <p className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG or WebP. Max 5MB.
                </p>
              </div>
            </div>
          </div>

          {/* Gallery Images */}
          <div className="space-y-2">
            <FormLabel>Gallery Images</FormLabel>
            <div className="flex flex-wrap gap-3">
              {existingGallery.map((img) => (
                <div
                  key={img.publicId || img.url}
                  className="relative flex size-20 items-center justify-center overflow-hidden rounded-lg border bg-muted"
                >
                  <img
                    src={img.url}
                    alt="Gallery"
                    className="size-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingGallery(img.publicId || "")}
                    className="absolute right-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
              {galleryPreviews.map((preview, index) => (
                <div
                  key={`new-${index}`}
                  className="relative flex size-20 items-center justify-center overflow-hidden rounded-lg border bg-muted"
                >
                  <img
                    src={preview}
                    alt="Gallery preview"
                    className="size-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewGallery(index)}
                    className="absolute right-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                onChange={handleGalleryChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="flex size-20 items-center justify-center rounded-lg border border-dashed bg-muted/50 text-muted-foreground transition-colors hover:bg-muted"
              >
                <Upload className="size-6" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              JPG, PNG or WebP. Max 5MB each. Add up to 10 gallery images.
            </p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags (comma separated)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colors (comma separated)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sizes (comma separated)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-wrap gap-6">
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="!mt-0">Featured</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newArrival"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="!mt-0">New Arrival</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bestSeller"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="!mt-0">Best Seller</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3">
          <LoadingButton type="submit" loading={!!loading}>
            Save Product
          </LoadingButton>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
