"use client";

import { useState } from "react";

export default function LikeButton() { 

    const [liked, setLiked] = useState(0);
    return (
        <button onClick={() => setLiked(liked + 1)}>Likes: {liked}</button>
    );
}