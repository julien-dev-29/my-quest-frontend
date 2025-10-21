import { SignupForm } from "@/components/signup-form";
import type { User } from "@/types/types";
import { GalleryVerticalEnd } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

function Register() {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:3000/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setAlertMessage(data.message);
        navigate("/auth/login");
      })
      .catch((err) => console.log(err as string));
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm
              className=""
              user={user}
              setUser={setUser}
              handleRegister={handleRegister}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/yolo.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default Register;
