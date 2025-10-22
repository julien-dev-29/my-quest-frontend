import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import auth from "@/store/auth";
import type { Post } from "@/types/types";
import { MessageCircle, ThumbsUpIcon } from "lucide-react";

type Props = {
  post: Post;
};

function PostCard({ post }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-start space-x-2 items-center">
          <Avatar className="rounded-lg">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <div className="">{auth.getUsername()}</div>
        </div>
      </CardHeader>
      <CardContent>{post.content}</CardContent>
      <CardFooter>
        <div className="flex justify-between w-full items-center">
          <div>{post.comments ? '': 'No comments'}</div>
          <div className="space-x-0.5">
            <Button variant="default">
              <MessageCircle />
            </Button>
            <Button variant="teal">
              <ThumbsUpIcon />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
