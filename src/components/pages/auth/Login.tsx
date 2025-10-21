import { LoginForm } from "@/components/login-form";
import type { User } from "@/types/types";
import { GalleryVerticalEnd } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        navigate("/admin");
      })
      .catch((err) => console.log(err.error));
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
            <LoginForm
              className=""
              user={user}
              setUser={setUser}
              handleLogin={handleLogin}
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

export default Login;
