"use client";

import React, { useState } from "react";
import {
    Collapse,
    IconButton,
    Typography,
    Tooltip
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

interface LinksSectionProps {
    links: string[];
}

export default function LinksSection({ links }: LinksSectionProps) {
    const [open, setOpen] = useState(false);

    if (!links || links.length === 0) return null;

    const toggle = () => setOpen(!open);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
                <Tooltip title={open ? "Hide links" : "Show links"}>
                    <IconButton
                        onClick={toggle}
                        size="small"
                        color={open ? "primary" : "default"}
                        style={{
                            transform: open ? "rotate(45deg)" : "none",
                            transition: "transform 0.2s",
                        }}
                    >
                        <LinkIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </div>

            <Collapse in={open}>
                <ul>
                    {links.map((link, index) => {
                        return (
                            <li key={index}>

                                <Typography variant="body2"
                                    style={{
                                        fontSize: 12,
                                        wordBreak: "break-word",
                                    }}>
                                    {link}
                                </Typography>
                            </li>
                        );
                    })}
                </ul>
            </Collapse>
        </div>
    );
}
