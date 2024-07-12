import Link from "next/link"

import { Button } from "@/components/ui/button"
import {   
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription, } from "./ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/lib/auth";

export function LoginForm({ loginDialog, setLoginDialog, setSignupDialog }: { loginDialog: boolean, setLoginDialog: (show: boolean) => void , setSignupDialog: (show: boolean) => void }) {

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = (event.currentTarget as any).username.value;
        const password = (event.currentTarget as any).password.value;
        const data = await login({ username, password });
        if (data) {
            setLoginDialog(false);
        }
    }

  return (
    <Dialog open={loginDialog} onOpenChange={setLoginDialog}>
        <DialogOverlay />
        <DialogPortal>
            <DialogContent>
            <DialogHeader>
                <DialogClose />
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>Enter your username below to login to your account</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
                <form className="grid gap-4" onSubmit={handleLogin}>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </div>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Button variant="link" onClick={() => {setLoginDialog(false); setSignupDialog(true)}}>
                Sign up
                </Button>
            </div>
            </DialogContent>
        </DialogPortal>
    </Dialog>
  )
}
