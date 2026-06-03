import { j as jsxRuntimeExports, P as cn } from "./index-BY4GfDKL.js";
import { d as Card } from "./card-Dw7-HZNo.js";
function DepthCard({
  children,
  className,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: cn(
        "relative overflow-hidden border border-border bg-card",
        "transition-colors duration-150",
        "hover:bg-card/80",
        onClick && "cursor-pointer",
        className
      ),
      style: { boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
      onClick,
      children
    }
  );
}
export {
  DepthCard as D
};
