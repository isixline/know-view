"use client";

import React, {
    useState,
    useImperativeHandle,
    forwardRef,
    useCallback,
} from "react";
import { IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export interface CopyButtonProps {
    text: string;
    tooltip?: string;
}

// 提供给父组件使用的方法类型
export interface CopyButtonHandle {
    copy: () => void;
}

const CopyButton = forwardRef<CopyButtonHandle, CopyButtonProps>(
    ({ text, tooltip = "Copy" }, ref) => {
        const [copied, setCopied] = useState(false);

        const handleCopy = useCallback(async () => {
            try {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            } catch (err) {
                console.error("copy error", err);
            }
        }, [text]);

        // 暴露 copy 方法给父组件
        useImperativeHandle(ref, () => ({
            copy: handleCopy,
        }), [handleCopy]);

        return (
            <Tooltip title={copied ? "Copied!" : tooltip}>
                <IconButton onClick={handleCopy} size="small">
                    {copied ? (
                        <CheckIcon fontSize="small" />
                    ) : (
                        <ContentCopyIcon fontSize="small" />
                    )}
                </IconButton>
            </Tooltip>
        );
    }
);

CopyButton.displayName = "CopyButton";

export default CopyButton;
