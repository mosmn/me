"use client";

import { useEffect, useState } from "react";
import { Plate } from "@udecode/plate-common";
import { CommentsProvider } from "@udecode/plate-comments";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CommentsPopover } from "@/components/plate-ui/comments-popover";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { Button } from "@/components/ui/button";
import plugins from "@/components/plate-ui/plugins";
import { createComment, addReply } from "@/lib/data";
import { LoginForm } from "./login";
import { SignupForm } from "./signup";
import { useAuth } from "@/app/context/AuthProvider";

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
];

export function CommentEditor({
  onNewComment,
  postId = "defaultPostId",
  replyTo = null,
}: {
  postId: string;
  replyTo: any;
  onNewComment: () => void;
}) {
  const [value, setValue] = useState("");
  const [loginDialog, setLoginDialog] = useState(false);
  const [signupDialog, setSignupDialog] = useState(false);
  const { user, login, logout } = useAuth();

  useEffect(() => {
    if (value.length === 0) {
      setValue(JSON.stringify(initialValue, null, 2));
    } else {
      setValue((v) => JSON.stringify(v, null, 2));
    }
  }, [value]);

  const handleOnChange = (value: any) => {
    const content = JSON.stringify(value, null, 2);
    setValue(content);
  };

  const handlePublish = async () => {
    try {
      let data;
      if (replyTo) {
        data = await addReply(postId, replyTo, value);
      } else {
        data = await createComment(postId, value, replyTo);
      }

      if (data) {
        setValue("");
        onNewComment();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={{}} myUserId="1">
        <div className="flex flex-col items-center justify-between mb-4 border border-gray-200 rounded-lg">
          <Plate
            plugins={plugins}
            onChange={handleOnChange}
            initialValue={initialValue}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>
            <Editor style={{ minHeight: "200px" }} focusRing={false} />
            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>
            <CommentsPopover />
          </Plate>
        </div>
        {user ? (
          <div>
            <Button onClick={handlePublish} className="mt-1 float-right">
              Post Comment
            </Button>
            <Button
              onClick={() => {
                logout();
              }}
              className="mt-1 float-right"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setLoginDialog(true)}
            className="mt-1 float-right"
          >
            Log in
          </Button>
        )}
        <LoginForm
          loginDialog={loginDialog}
          setLoginDialog={setLoginDialog}
          setSignupDialog={setSignupDialog}
        />
        <SignupForm
          signupDialog={signupDialog}
          setSignupDialog={setSignupDialog}
          setLoginDialog={setLoginDialog}
        />
      </CommentsProvider>
    </DndProvider>
  );
}
