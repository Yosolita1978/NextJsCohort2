"use client";

import { useState } from "react";
import styles from "./likeButton.module.css";
export default function LikeButton() { 

    const [liked, setLiked] = useState(0);
    return (
        <button className={styles.likeButton} onClick={() => setLiked(liked + 1)}>Likes: {liked}</button>
    );
}