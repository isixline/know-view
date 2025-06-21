// components/AutoGrowTextField.tsx
import React, { useEffect, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";

/**
 * AutoGrowTextField：初始高度固定，页面加载后支持根据内容自动增高。
 * 用法与 MUI 的 TextField 完全一致，多了自动 minRows 控制。
 */
export default function AutoGrowTextField(props: TextFieldProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 页面加载后启用自动高度
    setLoaded(true);
  }, []);

  return (
    <TextField
      {...props}
      multiline
      // 页面加载前固定一行，加载后支持自动增高
      {...(loaded
        ? { minRows: 1, maxRows: 10 }
        : { rows: 1 })}
    />
  );
}
