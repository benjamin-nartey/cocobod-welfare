import React from "react";
import { Textarea } from "./ui/textarea";

interface CommentsComponentsProps {
  comments: string;
  setComments: React.Dispatch<React.SetStateAction<string>>;
}

export default function CommentsComponents({
  comments,
  setComments,
}: CommentsComponentsProps) {
  return (
    <Textarea
      value={comments}
      className="bg-[#fff] rounded-3xl p-4 focus:outline-none focus:ring-0"
      rows={6}
      placeholder="Add your comments here..."
      name="comments"
      onChange={(event) => setComments(event.target.value)}
    />
  );
}
