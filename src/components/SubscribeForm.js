"use client";

import { useState } from "react";

export default function SubscribeForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!name || !email) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email }),
            });
            //console.log("Submitting form with data:", { name, email });
            setSuccess(true);
        } catch (err) {
            setError("An error occurred. Please try again.");
        }

        //Clear the form fields
        setName("");
        setEmail("");
    };

    return (
        <form onSubmit={handleSubmit} className="subscribe-form">
            <div>
                <label htmlFor="name">FullName</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your full name"/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email"/>
            </div>
            <button type="submit">Subscribe</button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Thank you for subscribing!</p>}
        </form>
    );
}
