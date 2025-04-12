export const containerStyles = {
    minH: "100vh",
    bg: "white",
};

export const flexStyles = {
    direction: { base: "column", md: "row" },
    maxW: "1200px",
    mx: "auto",
    w: "full",
    h: "full",
};

export const leftBoxStyles = {
    flex: 1,
    p: { base: 4, md: 8 },
    display: "flex",
    maxH: { base: "80vh", md: "none" },  // 移动端最大高度80vh，桌面端无高度限制
    overflowY: { base: "auto", md: "visible" },
    flexDirection: "column",
    justifyContent: "center",
}; 
export const rightBoxStyles = {
    flex: 1,
    backgroundImage: "url('/icons/Sign-up-UI-TOP.png')",
    backgroundSize: "contain",            // 使用 contain 保证图片完整显示（可能留白）
    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat",
    display: { base: "none", md: "block" },
};