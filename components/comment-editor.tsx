"use client";

import {useEffect, useState} from "react";
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
import { createComment } from "@/lib/data";
import {LoginForm} from './login';
import {SignupForm} from './signup';

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "" },
    ],
  }
];

export function CommentEditor({ postId = "defaultPostId" }: { postId?: string }) {
  const [value, setValue] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginDialog, setLoginDialog] = useState<boolean>(false);
  const [signupDialog, setSignupDialog] = useState<boolean>(false);

  useEffect(() => {
    if (value.length === 0) {
      setValue(JSON.stringify(initialValue, null, 2));
    } else {
      setValue(JSON.stringify(value, null, 2));
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    }
    else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleOnChange = (
    value: { id: string; type: string; children: { text: string }[] }[],
  ) => {
    const content = JSON.stringify(value, null, 2);
    setValue(content);
  };

  const handlePublish = async () => {
    try {
    console.log("value", value);
    console.log("postId", postId);
    const data = await createComment(postId, value);
    console.log("data", data);
    }
    catch (error) {
      console.error(error);
    }

  };

  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={{}} myUserId="1">
        <div className="flex flex-col items-center justify-between mb-4 border border-gray-200 rounded-lg">
        <Plate plugins={plugins} initialValue={value.length === 0 ? initialValue : value} onChange={handleOnChange}>
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
        {isAuthenticated && (
          <div>
          <Button
            onClick={handlePublish}
            className="mt-1 float-right"
          >
            Post Comment
          </Button>
          <Button
          onClick={() => {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          }
          }
          className="mt-1 float-right"
        >
          Logout
        </Button>
        </div>
        )}
        {!isAuthenticated && (
          <Button
            onClick={() => setLoginDialog(true)}
            className="mt-1 float-right"
          >
            Login in to comment
          </Button>
        )}

        <LoginForm loginDialog={loginDialog} setLoginDialog={setLoginDialog} setSignupDialog={setSignupDialog} />
        <SignupForm signupDialog={signupDialog} setSignupDialog={setSignupDialog} setLoginDialog={setLoginDialog} />
      </CommentsProvider>
    </DndProvider>
  );
}