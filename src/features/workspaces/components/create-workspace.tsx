"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  CreateWorkSpaceForm,
  createWorkSpaceSchema,
} from "../schemas/create-workspace";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { createWorkspace } from "../actions/create-workspace";
import { CreateWorkspaceResponse } from "../types";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

export function CreateWorkSpace() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CreateWorkspaceResponse | null>(null);
  const sidebar = useSidebar();

  const router = useRouter()

  const form = useForm<CreateWorkSpaceForm>({
    resolver: zodResolver(createWorkSpaceSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (result && !result.success) {
      setLoading(false);
      toast.error(result.message);
    }
    
    if (result && result.success) {
      setLoading(false);
      toast.success(result.message);
      setOpen(false);
      form.reset();
      window.dispatchEvent(new Event("workspaceCreated"));
      router.push('/workspaces')
    }
  }, [result]);

  async function onSubmit(formData: CreateWorkSpaceForm) {
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);

    const res: CreateWorkspaceResponse = await createWorkspace(data);
    setResult(res);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarMenuButton
            className="bg-primary hover:bg-primary/90 focus:bg-primary/90 active:bg-primary/90 text-white hover:text-white active:text-white focus:text-white cursor-pointer whitespace-nowrap"
            onClick={() => setOpen(true)}
          >
            <Plus /> Buat Workspace
          </SidebarMenuButton>
        </TooltipTrigger>
        <TooltipContent
          className={`${sidebar.open && "opacity-0"}`}
          side="right"
        >
          <p>Buat Workspace</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-[1.2rem]">Buat workspace</DialogTitle>
          </DialogHeader>
          <FieldGroup className="pt-2">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Nama workspace</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Workspace 1"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" onClick={() => form.reset()}>
                Batal
              </Button>
            </DialogClose>
            <Button type="submit">{loading ? <Spinner /> : "Simpan"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
