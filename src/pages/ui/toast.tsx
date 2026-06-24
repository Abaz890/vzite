import * as React from "react";

const ToastAction = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { altText?: string }
>(({ className, children, ...props }, ref) => (
    <button
        ref={ref}
        className={`inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className || ""}`}
        {...props}
    >
        {children}
    </button>
));
ToastAction.displayName = "ToastAction";

export { ToastAction };
