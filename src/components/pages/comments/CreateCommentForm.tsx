import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import auth from "@/store/auth";
import type { Post } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlusIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type Props = {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z.object({
  content: z.string().min(2),
});

function CreateCommentForm({ post, setPosts, setShowComments }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("http://localhost:3000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify({
          userId: auth.getUserId(),
          postId: post.id,
          content: data.content,
        }),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      const newComment = await res.json();
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id
            ? {
                ...p,
                comments: [...(p.comments || []), newComment],
              }
            : p
        )
      );
      toast.success("Comment added!");
      form.reset();
    } catch (err) {
      toast.error(err as string);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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
            onClick={() => setShowComments(false)}
          >
            Close
          </Button>
        </div>
      </CardContent>
    </form>
  );
}

export default CreateCommentForm;
