import { Facebook, Linkedin, Twitter } from "lucide-react";

export function HomeFooter() {



    return (
        <div className="flex flex-col bg-blue-950 px-6 md:px-44 py-4">
            
            <div className="flex flex-col">
                <div className="flex justify-between my-4 border-b-1 border-gray-500 ">
                    <div className="text-white font-semibold text-[24px]">Vzite</div>
                    <div className="flex text-white">
                    <Linkedin className="mx-4 cursor-pointer"  />
                    <Facebook className="mx-4 cursor-pointer" /> 
                    <Twitter className="mx-4 cursor-pointer" /> 
                    </div>
                </div>
            </div>
            <div className="text-white">
                {/* <div className="">
                    ® QDEALS PORTALS LTD
                </div> */}
                <div className="">
                    C/O Accrida Ltd, Regus House, Admirals Park, Victory Way, Dartford, United Kingdom, DA2 6Q
                </div>
            </div>
        </div>
    );


    



}