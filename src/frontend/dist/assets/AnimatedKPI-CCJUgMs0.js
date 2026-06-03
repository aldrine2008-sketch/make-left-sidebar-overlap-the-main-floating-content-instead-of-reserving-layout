import { r as reactExports, W as useReducedMotion, j as jsxRuntimeExports } from "./index-BY4GfDKL.js";
function AnimatedKPI({
  value,
  duration = 1e3,
  suffix = "",
  prefix = "",
  className
}) {
  const [displayValue, setDisplayValue] = reactExports.useState(0);
  const prefersReducedMotion = useReducedMotion();
  const frameRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }
    const startTime = Date.now();
    const startValue = displayValue;
    const diff = value - startValue;
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      setDisplayValue(Math.floor(startValue + diff * easeOutQuad));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current !== void 0) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration, prefersReducedMotion]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className, children: [
    prefix,
    displayValue.toLocaleString(),
    suffix
  ] });
}
export {
  AnimatedKPI as A
};
