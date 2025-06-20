"use client";

import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

interface CopyButtonProps {
    text: string;
    tooltip?: string;
}

export default function CopyButton({ text, tooltip = "Copy" }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("copy error", err);
        }
    };

    return (
        <Tooltip title={copied ? "Copied!" : tooltip}>
            <IconButton onClick={handleCopy} size="small">
                {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
            </IconButton>
        </Tooltip>
    );
}
