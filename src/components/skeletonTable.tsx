import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalState } from "@/providers/globalContext";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

export function SkeletonTable({ rows = 5, columns = 4 }: SkeletonTableProps) {
  const { darkMode } = useGlobalState();

  return (
    <div className={` ${!darkMode.value ? "bg-white" : ""} w-full mb-6 border border-slate-500/40 rounded-lg py-4 cursor-progress`}>
      <div className="mx-2 my-2">
        <Skeleton className="h-6 w-30 mb-2" />
        <Skeleton className="h-6 w-80" />
      </div>
      <Table>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="border-0">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mx-2 my-2">
        <Skeleton className="h-6 w-40" />
      </div>
    </div>
  );
}
