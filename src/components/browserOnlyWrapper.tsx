import React, { useEffect, useState } from "react";

interface BrowserOnlyProps {
  children: React.ReactNode;
}

export default function BrowserOnly({ children }: BrowserOnlyProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return <>{children}</>;
}
