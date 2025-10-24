import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlusIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type Props = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
};

const formSchema = z.object({
  content: z.string().min(2),
});

function 
CreateCommentForm({ onSubmit, onCancel }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <CardContent className="flex flex-col mt-5">
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Add a comment..."
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />} 
            </Field>
          )}
        />
        <div className="self-end mt-3 space-x-0.5">
          <Button type="submit">
            Add
            <CirclePlusIcon />{" "}
          </Button>
          <Button
            variant="destructive"
            type="button"
            onClick={onCancel}
          >
            Close
          </Button>
        </div>
      </CardContent>
    </form>
  );
}

export default CreateCommentForm;
