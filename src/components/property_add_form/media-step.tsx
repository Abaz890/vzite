import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dropzone } from "../ui/dropzone";
import companyPropertyRepository from "@/repositories/company/companyPropertyRepository";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";


export default function MediaStep({ form, media }: { form: UseFormReturn<any>; media: any }) {
  // const []
  const { toast } = useToast();


  const handleFileUpload = async (name: string, id: string, type: string) => {
    console.log(name,type)
    const reference_id = form.getValues("reference_id");
    const response = await companyPropertyRepository.attachPropertyMedia(reference_id, type, id);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `property media successfully uploaded`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
      if (type === "single") {
        // form.setValue(name, response.data.id);
      }
      if (type === "multiple") {
        // const images = form.getValues(name);
        // images.push(response.data.id);
        // // form.setValue(name, images);
      }

      return response.data.id;

    }
    else {
      toast({
        variant: "destructive",
        duration: 2000,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `unable to upload property media`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
  };

  const handleFileRemoved = async (name: string, id: string, type: string) => {
    const reference_id = form.getValues("reference_id");
    console.log(name, id, type, reference_id)
    const response = await companyPropertyRepository.unAttachPropertyMedia(reference_id, id);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `property media successfully removed`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    else {
      toast({
        variant: "destructive",
        duration: 2000,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `unable to remove property media`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }

    return '';
    // if (response.success) {
    //   if (type === "single") {
    //     form.setValue(name, '');
    //   }
    //   if (type === "multiple") {
    //     const images : [] = form.getValues(name);
    //     const updatedImages = images.filter((img=>img===id));
    //      form.setValue(name, updatedImages);
    //   }
    // }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Media</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormLabel>Featured Image</FormLabel>
            <Dropzone upload={true} uploadTo={'properties'} initialFiles={media.filter((m: { type: string }) => m.type === "feature")} allowedFormats={["image/jpeg", "image/png", "image/webp"]} type="single" onFilesAdded={(id) => handleFileUpload("feature_image", id.toString(), "feature")} onFileRemoved={(id) => handleFileRemoved('feature_image', id.toString(), "single")} onFileSortUpdated={()=>{}} />
          </div>

          <div className="col-span-6">
            <FormLabel htmlFor="">Property Images</FormLabel>
            <Dropzone upload={true} uploadTo={'properties'} initialFiles={media.filter((m: { type: string }) => m.type === "other")} allowedFormats={["image/jpeg", "image/png", "image/webp"]} type="multiple" onFilesAdded={(id) => handleFileUpload("images", id.toString(), "other")} onFileRemoved={(id) => handleFileRemoved('images', id.toString(), "multiple")} onFileSortUpdated={()=>{}} />
          </div>
          <div className="col-span-12 my-4">
            <FormField
              control={form.control}
              name="yt_video"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. https://www.youtube.com/watch?v=..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
