import { useEffect, useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Eye, Trash2, Upload, FileIcon, Plus, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MediaRepository from "@/repositories/mediaRepository";

type uploadTo = 'properties' | 'crm' | 'backoffice';


interface DropzoneProps {
  initialFiles: any[];
  allowedFormats: string[];
  type: string;
  upload: boolean;
  uploadTo?: uploadTo;
  isFeature?: boolean;
  onFilesAdded: (files: number, file: File) => Promise<any>;
  onFileRemoved: (id: string) => Promise<any>;
  onFileSortUpdated: (sorting: string[]) => void
}

interface FileWithPreview {
  preview: string;
  id?: string;
  upload_id?: string;
  progress?: number;
  error: boolean;
  file: File;
}

interface SortableFileItemProps {
  file: FileWithPreview;
  renderFilePreview: (file: FileWithPreview) => React.ReactNode;
  onPreview: (file: FileWithPreview) => void;
  onRemove: (file: FileWithPreview) => void;
  isLoading: boolean;
}

function SortableFileItem({ file, renderFilePreview, onPreview, onRemove, isLoading }: SortableFileItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: file.id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn("relative group touch-none", file.error && "bg-red-100 hover:bg-red-200", isDragging && "opacity-50")}
    >
      <div className="aspect-square rounded-lg overflow-hidden bg-muted relative">
        {renderFilePreview(file)}
        {file.error && <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Error</span>}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="secondary"
          size="icon"
          className="mr-2"
          type="button"
          onClick={(e) => {
            if (!isLoading) {
              e.stopPropagation();
              onPreview(file);
            }
          }}
          onPointerDown={(e) => e.stopPropagation()}
          disabled={isLoading}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!isLoading) {
              onRemove(file);
            }
          }}
          onPointerDown={(e) => e.stopPropagation()}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </Button>
      </div>
      <p className="mt-2 text-sm text-muted-foreground truncate">{file.file.name}</p>
      {file.progress !== undefined && file.progress < 100 && !file.error && <Progress value={file.progress} className="mt-2" />}
    </li>
  );
}

export function Dropzone({
  initialFiles,
  allowedFormats,
  type,
  onFilesAdded,
  onFileRemoved,
  onFileSortUpdated,
  isFeature = false,
  uploadTo,
  upload
}: DropzoneProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [queue, setQueue] = useState<FileWithPreview[]>([]);
  const [current, setCurrent] = useState<FileWithPreview | null>(null);
  const [previewFile, setPreviewFile] = useState<FileWithPreview | null>(null);
  const [initialFilesLoaded, setInitialFilesLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        const newFiles = arrayMove(items, oldIndex, newIndex);
        const sortedIds = newFiles.map((file) => file.upload_id).filter((id) => id !== undefined);
        onFileSortUpdated(sortedIds);
        return newFiles;
      });
    }
  };

  const processNext = useCallback(() => {
    if (current || queue.length === 0) return;
    const nextFile = queue[0];
    setQueue((q) => q.slice(1));
    setCurrent(nextFile);
    uploadFile(nextFile, nextFile.id!);
  }, [current, queue]);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      type: file.type || "application/octet-stream",
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      error: false,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    if (type === "multiple") {
      setQueue((prev) => [...prev, ...newFiles]);
    } else {
      newFiles.forEach((f) => uploadFile(f, f.id!));
    }
  };

  const uploadFile = async (file: FileWithPreview, fileId: string) => {
    setIsLoading(true);
    try {
      setFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, progress: 10 } : f))
      );

      setFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, progress: 60 } : f))
      );

      // let response;

      let response;
      if (upload) {

        switch (uploadTo) {
          case 'backoffice':
            response = await MediaRepository.backofficeUpload(file.file);
            break;
          case 'crm':
            response = await MediaRepository.upload(file.file);
            break;
          case 'properties':
            response = await MediaRepository.propertyUpload(file.file, isFeature);
            break;
        }

        if (response.success) {
          const attached_payload = await onFilesAdded(response.data.id, file.file);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? { ...f, progress: 100, upload_id: attached_payload }
                : f
            )
          );
        }
        else {
          throw new Error("Upload failed");
        }
      } else {
        await onFilesAdded(0, file.file);
        setFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, progress: 100 } : f))
        );
      }
    } catch (error) {
      console.error(error);
      setFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, error: true, progress: 0 } : f))
      );
    } finally {
      setCurrent(null);
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:
      allowedFormats && allowedFormats.length > 0
        ? allowedFormats.reduce((acc, format) => {
          acc[format] = [];
          return acc;
        }, {} as { [key: string]: string[] })
        : undefined,
    disabled: type === "single" && files.length > 0,
  });

  const removeFile = async (file: FileWithPreview) => {
    setIsLoading(true);
    let response = {
      success: true
    };

    if (upload) {
      switch (uploadTo) {
        case 'backoffice':
          // response = await MediaRepository.backofficeUpload(file.file);
          break;
        case 'crm':
          response = await MediaRepository.uploadDelete(file.upload_id!);
          break;
        case 'properties':
          // response = await companyPropertyRepository.unAttachPropertyMedia();
          break;
      }
    }

    if (response.success) {
      await onFileRemoved(file.upload_id!);
      const newFiles = files.filter((f) => f !== file);
      setFiles(newFiles);
      URL.revokeObjectURL(file.preview);
    }
    setIsLoading(false);
  };

  const openPreview = (file: FileWithPreview) => {
    setPreviewFile(file);
  };

  const renderFilePreview = (file: FileWithPreview) => {
    if (file.file.type?.startsWith("image/")) {
      return <img src={file.preview} alt={file.file.name} className="h-full w-full object-cover" />;
    } else if (file.file.type?.startsWith("video/")) {
      return <video src={file.preview} className="h-full w-full object-cover" controls />;
    } else {
      return (
        <div className="flex items-center justify-center h-full w-full bg-muted">
          <FileIcon className="h-16 w-16 text-muted-foreground" />
        </div>
      );
    }
  };

  useEffect(() => {
    if (!current && queue.length > 0) {
      processNext();
    }
  }, [queue, current, processNext]);


  useEffect(() => {
    if (initialFiles && initialFiles.length > 0 && !initialFilesLoaded) {
      const loadedFiles = initialFiles.map((file: any) => {
        if (!file.url) {
          console.log(file)
        }
        return {
          file: { name: file.url.split("/").pop(), type: "image/octet-stream" } as File,
          preview: file.url,
          id: file.id,
          upload_id: file.id,
          progress: 100,
          error: false,
        };
      });
      setFiles(loadedFiles);
      setInitialFilesLoaded(true)
      console.log('inita; files updated')
    }
  }, [initialFiles]);


  useEffect(() => {
    const el = dropzoneRef.current;
    if (!el) return;


    const handlePaste = (e: ClipboardEvent) => {

      if (!isHovered) return;

      const items = e.clipboardData?.items;
      if (!items) return;
      const imageFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log(item)
        allowedFormats
        if (item.kind === "file" && allowedFormats.includes(item.type)) {
          const file = item.getAsFile();
          if (file) imageFiles.push(file);
        }
      }

      if (imageFiles.length === 0) return;

      if (type === "single") {
        if (files.length > 0) {
          return;
        }
        onDrop([imageFiles[0]]);
      } else {
        onDrop(imageFiles);
      }

    };

    window.addEventListener("paste", handlePaste as any);
    return () => void window.removeEventListener("paste", handlePaste as any);
  }, [isHovered]);

  return (
    <div className="cursor-pointer h-full"
      onMouseEnter={() => { setIsHovered(true) }}
      onMouseLeave={() => { setIsHovered(false) }}
      ref={dropzoneRef}
    >
      <div {...getRootProps()} className={cn("h-full border-2 border-dashed rounded-lg p-4 transition-colors p-6", isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground hover:border-primary")}>
        <input {...getInputProps()} />
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">Drag &apos;n&apos; drop some files here, or click to select files</p>
            <p className="text-xs text-muted-foreground mt-1">Allowed formats: {allowedFormats && allowedFormats.length > 0 ? allowedFormats.join(", ") : "All formats"}</p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground mb-4">Drag &apos;n&apos; drop more files here, or click to select files</p>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={files.map(f => f.id!)}
                strategy={rectSortingStrategy}
              >
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {files.map((file) => (
                    <SortableFileItem
                      key={file.id}
                      file={file}
                      renderFilePreview={renderFilePreview}
                      onPreview={openPreview}
                      onRemove={removeFile}
                      isLoading={isLoading} />
                  ))}
                  {(type === "single" && files.length == 0) || type === "multiple" ? (
                    <li className={"relative group"}>
                      <div className="flex flex-col justify-center items-center aspect-square rounded-lg overflow-hidden bg-muted relative">
                        {
                          isLoading ? <Loader2 className="animate-spin"></Loader2> : <Plus className="h-12 w-12 text-muted-foreground"></Plus>
                        }
                      </div>
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
              </SortableContext>

            </DndContext>

          </div>
        )}
      </div>

      <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{previewFile?.file?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">{previewFile && renderFilePreview(previewFile)}</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}