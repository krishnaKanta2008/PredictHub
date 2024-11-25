import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:5000";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResponseMessage("");

        try {
            const response = await fetch(`${BACKEND_URL}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject, // Include subject separately
                    message: formData.message,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to send message.");
            }

            await response.json();
            setResponseMessage("Message sent successfully.");
            toast.success(responseMessage);
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            if (error instanceof Error) {
                setResponseMessage(`Error: ${error.message || "Network error."}`);
            } else {
                setResponseMessage("Error: Network error.");
            }
            toast.error(responseMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-4 px-4 w-full max-w-md">
            <h1>Let us know if you face any problem.</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <Input
                        id="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                    </label>
                    <Input
                        id="subject"
                        placeholder="Brief description of your issue"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                    </label>
                    <Textarea
                        id="message"
                        placeholder="Please provide details about your issue or question"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </div>
    );
};

export default Contact;
