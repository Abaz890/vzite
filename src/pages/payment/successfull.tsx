import { Card, CardContent } from "@/components/ui/card";
// import { useWindowSize } from "react-use";
// import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "@/providers/globalContext";
import { useEffect } from "react";

export default function PaymentSuccessful() {
  // const { width, height } = useWindowSize();
  const { globalStateLoading } = useGlobalState();
  let navigate = useNavigate();

  const handleRedirectToHome = () => {
    setTimeout(() => {
      navigate(`/company`,{replace:true});
    }, 5000);
  };


  useEffect(()=>{
    handleRedirectToHome()
  },[globalStateLoading])

  return (
    <main className="payment-main py-8 h-screen">
      {/* <Confetti width={width} height={height} /> */}
      <div className="flex flex-col ">
        <Card className="mx-auto my-auto py-12">
          <CardContent className="h-full flex items-center flex-col justify-between ">
            <div className="text-center text-[1.556rem]/[2.907rem] font-bold">Payment successful</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
