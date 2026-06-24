import { useRef, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react";

type MagneticProps<T extends ElementType> = {
  as?: T;
  strength?: number;
  radius?: number;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export function Magnetic<T extends ElementType = "div">({
  as,
  strength = 0.35,
  radius = 120,
  children,
  ...rest
}: MagneticProps<T>) {
  const Tag = (as || "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const falloff = Math.max(0, 1 - dist / (radius + Math.max(r.width, r.height) / 2));
    const tx = dx * strength * falloff;
    const ty = dy * strength * falloff;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      if (innerRef.current) innerRef.current.style.transform = `translate3d(${tx * 0.35}px, ${ty * 0.35}px, 0)`;
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transition = "transform .55s cubic-bezier(.22,1,.36,1)";
    el.style.transform = "translate3d(0,0,0)";
    if (innerRef.current) {
      innerRef.current.style.transition = "transform .55s cubic-bezier(.22,1,.36,1)";
      innerRef.current.style.transform = "translate3d(0,0,0)";
    }
    setTimeout(() => {
      if (el) el.style.transition = "";
      if (innerRef.current) innerRef.current.style.transition = "";
    }, 560);
  };

  return (
    <Tag
      ref={ref as never}
      data-magnetic=""
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: "inline-flex", willChange: "transform" }}
      {...rest}
    >
      <span ref={innerRef} style={{ display: "inline-flex", alignItems: "center", gap: "inherit", willChange: "transform" }}>
        {children}
      </span>
    </Tag>
  );
}