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
import { useAuth } from '@/app/context/AuthProvider';

export function SignupForm({ signupDialog, setSignupDialog, setLoginDialog }: { signupDialog: boolean, setSignupDialog: (show: boolean) => void , setLoginDialog: (show: boolean) => void }) {
    const { user, login, register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const username = (e.currentTarget as any).username.value;
        const email = (e.currentTarget as any).email.value;
        const password = (e.currentTarget as any).password.value;
        await register(username, email, password, "user");
    };
    
  return (
    <Dialog open={signupDialog} onOpenChange={setSignupDialog}>
      <DialogOverlay />
      <DialogPortal>
          <DialogContent>
          <DialogHeader>
              <DialogClose />
              <DialogTitle>Sign Up</DialogTitle>
              <DialogDescription>Enter your information to create an account</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
              {/* <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Robinson" required />
              </div>
              </div>
              <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                  id="email"
                  type="email"
                  placeholder=""
                    required
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                Create an account
                </Button> */}
                <form onSubmit={handleSubmit} className="grid gap-4">
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
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Create an account
                    </Button>
                </form>
            </div>
            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Button variant="link" onClick={() => {setSignupDialog(false); setLoginDialog(true)}} >
                Log in
                </Button>
            </div>
            </DialogContent>
        </DialogPortal>
    </Dialog>
  )
}
