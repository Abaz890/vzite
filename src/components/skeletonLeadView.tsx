import { Skeleton } from "./ui/skeleton";
import { useGlobalState } from "@/providers/globalContext";



export default function SkeletonAgentLeadView() {


  const { darkMode } = useGlobalState();



  return (
    <div className="grid grid-cols-12 gap-4 cursor-progress">
      <div className="rounded-lg lg:col-span-4">
        <div className={`border border-slate-500/40 rounded-md p-6 ${darkMode.value ? 'bg-transparent' : 'bg-white'} `}>
          <div className="flex items-center space-x-4 ">
            <Skeleton className="w-16 h-16 rounded-full bg-black/10" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 bg-black/10" />
              <Skeleton className="h-4 w-40 bg-black/10" />
            </div>
          </div>
          <div className=" mt-6 space-y-4 ">
            <Skeleton className="h-10 w-full bg-black/10" />
            <Skeleton className="h-10 w-full bg-black/10" />
            <Skeleton className="h-10 w-full bg-black/10" />
          </div>
        </div>
        <div className={`mt-4 border border-slate-500/40 rounded-md p-6 ${darkMode.value ? 'bg-transparent' : 'bg-white'} `}>
          <Skeleton className="h-6 w-24 bg-black/10 mb-4" />
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-16 bg-black/10" />
              <Skeleton className="h-5 w-24 bg-black/10" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-20 bg-black/10" />
              <Skeleton className="h-5 w-28 bg-black/10" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-16 bg-black/10" />
              <Skeleton className="h-5 w-32 bg-black/10" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-20 bg-black/10" />
              <Skeleton className="h-5 w-36 bg-black/10" />
            </div>
          </div>
        </div>

        <div className={`mt-4 border border-slate-500/40 rounded-md p-6 ${darkMode.value ? 'bg-transparent' : 'bg-white'} `}>
          <Skeleton className="h-6 w-24 bg-black/10 mb-4" />
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-16 bg-black/10" />
              <Skeleton className="h-5 w-24 bg-black/10" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-20 bg-black/10" />
              <Skeleton className="h-5 w-28 bg-black/10" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-16 bg-black/10" />
              <Skeleton className="h-5 w-32 bg-black/10" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-20 bg-black/10" />
              <Skeleton className="h-5 w-36 bg-black/10" />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-4">
        {/* Comment input area */}
        <div className={`border border-slate-500/40 rounded-md p-6 ${darkMode.value ? 'bg-transparent' : 'bg-white'} `}>
          <div className="flex space-x-2 mb-4">
            <Skeleton className="h-10 w-32 bg-black/10" />
            <Skeleton className="h-10 w-32 bg-black/10" />
            <Skeleton className="h-10 w-32 bg-black/10" />
          </div>
          <Skeleton className="h-32 w-full bg-black/10 mb-4" />
          <Skeleton className="h-10 w-32 bg-black/10" />
        </div>

        {/* Activity tabs */}
        <div className={`border border-slate-500/40 rounded-md p-6 ${darkMode.value ? 'bg-transparent' : 'bg-white'} `}>
          <div className="flex space-x-4 pb-2 mb-6">
            <Skeleton className="h-6 w-20 bg-black/10" />
            <Skeleton className="h-6 w-24 bg-black/10" />
            <Skeleton className="h-6 w-16 bg-black/10" />
            <Skeleton className="h-6 w-28 bg-black/10" />
          </div>

          {/* Comment 1 */}
          <div className="mb-8">
            <div className={`flex items-center space-x-2 mb-2 ${darkMode.value ? 'bg-transparent' : 'bg-white'}`}>
              <Skeleton className={`w-10 h-10 rounded-full bg-black/10 `} />
              <Skeleton className="h-5 w-20 bg-black/10" />
              <Skeleton className="h-5 w-24 bg-black/10" />
              <div className="ml-auto">
                <Skeleton className="h-5 w-8 bg-black/10" />
              </div>
            </div>
            <div className={`ml-12 space-y-2 ${darkMode.value ? 'bg-transparent' : 'bg-white'} `}>
              <Skeleton className="h-4 w-full bg-black/10" />
              <Skeleton className="h-4 w-5/6 bg-black/10" />
              <Skeleton className="h-4 w-4/6 bg-black/10" />
            </div>
            <div className={`ml-12 mt-2 flex space-x-4 ${darkMode.value ? 'bg-transparent' : 'bg-white'}`}>
              <Skeleton className="h-8 w-20 bg-black/10" />
              <Skeleton className="h-8 w-24 bg-black/10" />
            </div>
          </div>

          {/* Comment 2 */}
          <div>
            <div className={`flex items-center space-x-2 mb-2 ${darkMode.value ? 'bg-transparent' : 'bg-white'}`}>
              <Skeleton className="w-10 h-10 rounded-full bg-black/10" />
              <Skeleton className="h-5 w-20 bg-black/10" />
              <Skeleton className="h-5 w-24 bg-black/10" />
              <div className="ml-auto">
                <Skeleton className="h-5 w-8 bg-black/10" />
              </div>
            </div>
            <div className={`ml-12 space-y-2 ${darkMode.value ? 'bg-transparent' : 'bg-white'}`}>
              <Skeleton className="h-4 w-full bg-black/10" />
              <Skeleton className="h-4 w-5/6 bg-black/10" />
              <Skeleton className="h-4 w-4/6 bg-black/10" />
            </div>
            <div className={`ml-12 mt-2 flex space-x-4 ${darkMode.value ? 'bg-transparent' : 'bg-white'}`}>
              <Skeleton className="h-8 w-20 bg-black/10" />
              <Skeleton className="h-8 w-24 bg-black/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
