import React from "react";

interface TopLeftPanelProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const TopLeftPanel: React.FC<TopLeftPanelProps> = ({ children, style }) => {
    return (
        <div
            style={{
                position: "absolute",
                top: 16,
                left: 16,
                zIndex: 1000,
                width: 300,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                ...style, // 允许传入额外自定义样式
            }}
        >
            {children}
        </div>
    );
};

export default TopLeftPanel;
