import React, { useState } from "react";
import { Box, Collapse, IconButton, Tooltip } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface CollapsibleSectionProps {
    children: React.ReactNode;
    initiallyCollapsed?: boolean;
}

export default function CollapsibleSection({
    children,
    initiallyCollapsed = false,
}: CollapsibleSectionProps) {
    const [collapsed, setCollapsed] = useState(initiallyCollapsed);

    return (
        <Box sx={{ position: "relative", pb: 4 }}>
            <Collapse in={!collapsed} timeout="auto" unmountOnExit>
                {children}
            </Collapse>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 1,
                }}
            >
                <Tooltip title={collapsed ? "Expand" : "Collapse"}>
                    <IconButton
                        onClick={() => setCollapsed(!collapsed)}
                        sx={{
                            transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                        }}
                    >
                        <ExpandMore />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}
