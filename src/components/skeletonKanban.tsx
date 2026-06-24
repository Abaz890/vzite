import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGlobalState } from "@/providers/globalContext";

interface KanbanSkeletonProps {
  columns?: number
  cardsPerColumn?: number
}

export function SkeletonKanban({ columns = 3, cardsPerColumn = 3 }: KanbanSkeletonProps) {


  
    const { darkMode } = useGlobalState();

  return (
    <div className="flex overflow-x-auto">

      {Array.from({ length: columns }).map((_, columnIndex) => (
        <div key={columnIndex} className="flex-shrink-0 w-80">
          <Card className={` bg-transparent border-t-0 border-b-0 border-s-0 rounded-none`} >
            <CardHeader className="p-0 pb-2 px-2">
              <CardTitle>
                <Skeleton className="h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {Array.from({ length: cardsPerColumn }).map((_, cardIndex) => (
                <Card key={cardIndex} className={ `${darkMode.value ? 'bg-transparent' : 'bg-white'}  p-4 border-slate-500/40 `}>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" /> 
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

