import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import auth from "@/store/auth";
import type { Post } from "@/types/types";

const ZPost = z.object({
  content: z.string().min(2).max(255),
});

type FormProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  className?: string;
};

function CreatePostForm({
  isVisible,
  setIsVisible,
  setPosts,
  className,
}: FormProps) {
  const form = useForm<z.infer<typeof ZPost>>({
    resolver: zodResolver(ZPost),
    defaultValues: {
      content: "",
    },
  });
  function onSubmit(data: z.infer<typeof ZPost>) {
    fetch("http://localhost:3000/api/posts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
      method: "POST",
      body: JSON.stringify({ ...data, userId: auth.getUserId() }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.info(data.message);
        setPosts((prev) => [data.post, ...prev]);
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
    setIsVisible(false);
  }
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="create-post-form"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-black/35",
            className
          )}
        >
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="rounded-lg">
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <div>{auth.getUsername()}</div>
              </div>
            </CardHeader>
            <CardContent>
              <form id="form-post" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name="content"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <Textarea
                          {...field}
                          placeholder={`What’s on your mind, ${auth.getUsername()} ?`}
                          rows={3}
                        />
                        {fieldState.error && (
                          <FieldError className="text-red-500 text-sm mt-1">
                            {fieldState.error.message}
                          </FieldError>
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
                <div className="mt-4 flex items-center justify-end gap-1">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsVisible(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    <SendIcon className="w-4 h-4 mr-2" /> Publish
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CreatePostForm;
