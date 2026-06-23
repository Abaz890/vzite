import { toast as sonnerToast } from "sonner";

type ToastProps = {
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
    duration?: number;
    className?: string;
    action?: React.ReactNode;
};

export function useToast() {
    const toast = (props: ToastProps) => {
        const { title, description, variant, duration, className, action } = props;
        if (variant === "destructive") {
            sonnerToast.error(title, {
                description,
                duration,
                className,
                action,
            });
        } else {
            sonnerToast(title, {
                description,
                duration,
                className,
                action,
            });
        }
    };

    return { toast };
}
