import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
    return (
        <SonnerToaster
            position="top-right"
            toastOptions={{
                className: "fixed md:max-w-[420px] md:top-4 md:right-4",
            }}
        />
    );
}
