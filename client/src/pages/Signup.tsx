import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { checkSession } from "@/components/Auth/Auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (checkSession()) {
            navigate("/home");
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true

        try {
            const response = await fetch(`${BACKEND_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Signup successful", {
                    description: "You can now log in with your new account.",
                    action: {
                        label: "Login",
                        onClick: () => navigate("/login"),
                    },
                });
                navigate("/signin");
            } else {
                const errorData = await response.json();
                toast.error("Signup failed", {
                    description: errorData.message,
                });
            }
        } catch (error) {
            toast.error("Signup failed", {
                description: `Something went wrong. Please try again. ${error}`,
            });
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
                        Welcome to Predicthub
                    </h2>
                    <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center">
                        Create your account to get started
                    </p>

                    <form className="my-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer>
                                <Label htmlFor="firstname">First name</Label>
                                <Input
                                    id="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    placeholder="Tyler"
                                    type="text"
                                    required
                                />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="lastname">Last name</Label>
                                <Input
                                    id="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    placeholder="Durden"
                                    type="text"
                                    required
                                />
                            </LabelInputContainer>
                        </div>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="username"
                                type="text"
                                required
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="projectmayhem@fc.com"
                                type="email"
                                required
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                type="password"
                                required
                            />
                        </LabelInputContainer>

                        <button
                            className={cn(
                                "bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
                                loading && "opacity-50 cursor-not-allowed"
                            )}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Sign up →"}
                            <BottomGradient />
                        </button>

                        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                            Have an account?{" "}
                            <Link to="/signin" className="text-blue-600 hover:underline dark:text-blue-400">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

const BottomGradient = () => (
    <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
);

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("flex flex-col space-y-2 w-full relative group", className)}>{children}</div>
);
