import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { BeforeAfterSlider } from "@/components/home/beforeAfter";
import { HomeFooter } from "@/components/home/footer";
import HomeNavbar from "@/components/home/navbar";
import HomeImg1 from '@/assets/home/1.png';
import HomeImg2En from '@/assets/home/2_en.png';
import HomeImg2Fr from '@/assets/home/2_fr.webp';
import HomeImg3 from '@/assets/home/3.png';
import HomeImg4 from '@/assets/home/4.webp';
import HomeImg5 from '@/assets/home/5.png';
import HomeImg6 from '@/assets/home/6_fr.webp';
import HomeImg7 from '@/assets/home/7_fr.webp';
import LogoWhite from '@/assets/home/logo_white.svg'
import BannerLeft from '@/assets/banner_left.svg';
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from 'react-i18next'
import '@/assets/home_style.css';


export default function Home() {

    const { t,i18n } = useTranslation("global")
    const contactExpert = function(){
        window.location.href = 'mailto:support@vzite.com';
    }
        
    return (
        <>
            <HomeNavbar></HomeNavbar>
            <main>
                <div className="flex flex-col w-full">
                    <div className="lander w-full">
                        <div className="flex flex-col justify-center align-center mx-auto max-w-[860px] pt-3">
                            <div className="text-white text-center flex justify-center">
                                <div className="bg-gray-500/25 w-fit p-3 rounded-[4px] font-semibold uppercase tracking-[2px] text-[.778rem]/[1.056rem] py-[10px] px-[15px] ">
                                    CRM
                                </div>
                            </div>
                            <div className="text-white text-center text-[3.556rem]/[4.907rem] font-bold my-5">
                                {t('home_title_1')}
                            </div>
                            <div className="text-white text-center tracking-[.3px] text-[18px]/[28px] mx-5">
                                {t('home_desc_1')}
                            </div>
                            <div className="my-10 flex justify-center">
                                <Button onClick={()=> contactExpert()} className="p-6" variant={"secondary"} >
                                    <div className="">{t('contact_with_expert')}</div>
                                    <ArrowUpRight />
                                </Button>
                            </div>
                            <div className="">
                                <BeforeAfterSlider></BeforeAfterSlider>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center my-6 mx-6 md:my-10 md:mx-10 ">
                        <div className="font-bold font text-[2.222rem]/[3.056rem] text-center w-full md:w-2/4 mb-4">
                            {t('home_title_2')}
                        </div>
                        <p className="text-[18px]/[28px] tracking-[.3px] text-center">
                            {t('home_desc_2')}
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center my-8">
                        <div className="text-sky text-center flex flex-col items-center justify-center">
                            <div className="bg-gray-300/25 w-fit p-3 rounded-[4px] font-bold uppercase tracking-[2px] text-[.778rem]/[1.056rem] py-[10px] px-[15px] text-blue-800">
                                {t('why_choose_vizite')}
                            </div>
                            <div className="font-bold text-[2.222rem]/[3.056rem]">
                                {t('home_title_3')}
                            </div>
                            <div className="text-[18px] tracking-[.3px] my-2 md:my-10">
                                {t('home_desc_3')}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6 my-8 mx-10">
                        <div className="col-span-12 md:col-span-6">
                            <img src={HomeImg1} alt="" />
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col">
                            <div className="text-[1.333rem] leading-[1.833rem]  font-bold mb-[24px] mb-4">{t('home_title_4')}</div>
                            <div className="text-[18px] leading-[28px] tracking-[.3px]">
                                {t('home_desc_4')}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6 my-8 mx-10">
                        <div className="col-span-12 md:col-span-6 flex flex-col ">
                            <div className="text-[1.333rem] leading-[1.833rem]  font-bold mb-[24px] my-4">
                                {t('home_title_5')}
                            </div>
                            <div className="text-[18px] leading-[28px] tracking-[.3px]">
                                {t('home_desc_5')}
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 order-first md:order-last ">
                            <img src={ i18n.language=='fr' ? HomeImg2Fr : HomeImg2En} alt="" />
                        </div>
                    </div>


                    <div className="grid grid-cols-12 gap-6 my-8 mx-10">
                        <div className="col-span-12 md:col-span-6">
                            <img src={HomeImg3} alt="" />
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col ">
                            <div className="text-[1.333rem] leading-[1.833rem]  font-bold mb-[24px] my-4">
                                {t('home_title_6')}
                            </div>
                            <div className="text-[18px] leading-[28px] tracking-[.3px]">
                                {t('home_desc_6')}
                            </div>
                            <div className="flex my-10 text-[14px] text-[#070052] leading-[19.32px]  items-center font-bold">
                                <div className="">
                                    {t('learn_more')}
                                </div>
                                <ArrowUpRight></ArrowUpRight>
                            </div>

                        </div>
                    </div>


                    <div className="relative items-center justify-center gap-8 bg-white py-12 hidden md:block">

                        <div className="relative w-full lg:w-1/2 ">
                            <img
                                src={HomeImg4}
                                alt="Woman working on a laptop"
                                className=" shadow-md rounded-e-lg"
                            />
                            <p className="absolute top-10 start-10 text-white text-2xl font-bold  px-4 py-2 rounded-lg">
                                Des résultats béton.
                            </p>
                        </div>
                        <div className="flex flex-col absolute top-20 start-[46%] w-[50%] pe-6">
                            <div className="bg-white shadow-lg rounded-md p-6 text-center transform text-start mb-3">
                                <h3 className="text-[3.556rem] font-bold text-blue-950">{t('5_hours')}</h3>
                                <p className="text-gray-600">{t('time_saved_per_employee')}</p>
                            </div>


                            <div className="bg-white shadow-lg rounded-md p-6 text-center transform text-start mb-3">
                                <h3 className="text-[3.556rem] font-bold text-blue-950">{t('5_minutes')}</h3>
                                <p className="text-gray-600">{t('installation_time_required')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:py-10 md:px-16 backgroud-gray">
                        <div className="grid grid-cols-12 gap-6 my-8 mx-10">
                            <div className="col-span-12 md:col-span-6">
                                <img src={HomeImg5} alt="" />
                            </div>
                            <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
                                <div className="text-[1.333rem] leading-[1.833rem]  font-bold mb-[16px] mb-4">{t('home_title_7')}</div>
                                <div className="text-[#394452] text-[16px] leading-[28px] tracking-[.3px]">
                                    {t('home_desc_7')}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-6 my-8 mx-10">
                            <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
                                <div className="text-[1.333rem] leading-[1.833rem]  font-bold mb-[16px] mb-4">{t('home_title_8')}</div>
                                <div className="text-[#394452] text-[16px] leading-[28px] tracking-[.3px]">
                                    {t('home_desc_8')}
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-6 order-first md:order-last ">
                                <img src={HomeImg6} alt="" />
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-6 my-8 mx-10">
                            <div className="col-span-12 md:col-span-6">
                                <img src={HomeImg7} alt="" />
                            </div>
                            <div className="col-span-12 md:col-span-6 flex flex-col justify-center ">
                                <div className="text-[1.333rem] leading-[1.833rem]  font-bold mb-[16px] mb-4">{t('home_title_9')}</div>
                                <div className="text-[#394452] text-[16px] leading-[28px] tracking-[.3px]">
                                    {t('home_desc_9')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-4 md:py-10 md:px-16">
                        <div className="flex items-center justify-between" style={{ backgroundColor: 'rgb(229 229 255)' }}>
                            <div className="">
                                <img src={BannerLeft} className="hidden md:block w-[112px]" alt="" />
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-[1.778rem] leading-[2.444rem] font-bold mb-[20px] mb-4 text-center">{t('use_the_best_technology_for_your_agency')}</div>
                                <Button onClick={()=> contactExpert()} className="p-6 bg-blue-950 " variant={'default'}  >
                                    <div className="">{t('contact_with_expert')}</div>
                                    <ArrowUpRight />
                                </Button>
                            </div>
                            <div className="">
                                <img src={BannerLeft} className="hidden md:block w-[112px]" style={{ WebkitTransform: "scaleX(-1)", transform: "scaleX(-1)" }} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-950 md:px-64">
                        <div className="flex flex-col justify-center align-center py-16">
                            <div className="text-white text-center flex justify-center">
                                <div className="bg-gray-500/25 w-fit p-3 rounded-[4px] font-semibold uppercase tracking-[2px] text-[.778rem]/[1.056rem] py-[10px] px-[15px] ">
                                    {t('agencies')}
                                </div>
                            </div>
                            <div className="text-white text-center text-[2.256rem]/[4.907rem] font-bold my-5">
                                {t('benefit_from_all_the_features')}
                            </div>
                            <div className="grid grid-cols-2 gap-4 mx-4">
                                <Card>
                                    <CardContent className="flex">
                                        <div className=""> </div>
                                        <div className="flex flex-col">
                                            <div className="text-[1.0rem] leading-[1.833rem]  font-bold mt-2">{t('home_title_10')}</div>
                                            <div className="text-[#394452] text-[14px] leading-[28px] tracking-[.3px]">
                                                {t('home_desc_10')}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="flex">
                                        <div className=""> </div>
                                        <div className="flex flex-col">
                                            <div className="text-[1.0rem] leading-[1.833rem]  font-bold mt-2">{t('home_title_11')}</div>
                                            <div className="text-[#394452] text-[14px] leading-[28px] tracking-[.3px]">{t('home_desc_11')}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="flex">
                                        <div className=""> </div>
                                        <div className="flex flex-col">
                                            <div className="text-[1.0rem] leading-[1.833rem]  font-bold mt-2">{t('home_title_12')}</div>
                                            <div className="text-[#394452] text-[14px] leading-[28px] tracking-[.3px]">
                                                {t('home_desc_12')}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="flex">
                                        <div className=""> </div>
                                        <div className="flex flex-col">
                                            <div className="text-[1.0rem] leading-[1.833rem] font-bold mt-2">{t('home_title_13')}</div>
                                            <div className="text-[#394452] text-[14px] leading-[28px] tracking-[.3px]">{t('home_desc_13')}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="flex">
                                        <div className=""> </div>
                                        <div className="flex flex-col">
                                            <div className="text-[1.0rem] leading-[1.833rem] font-bold mt-2">{t('home_title_14')}</div>
                                            <div className="text-[#394452] text-[14px] leading-[28px] tracking-[.3px]">
                                            {t('home_desc_14')}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="flex">
                                        <div className=""> </div>
                                        <div className="flex flex-col">
                                            <div className="text-[1.0rem] leading-[1.833rem] font-bold mt-2">{t('home_title_15')}</div>
                                        <div className="text-[#394452] text-[14px] leading-[28px] tracking-[.3px]">{t('home_desc_15')}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    <div className="py-10 px-16 backgroud-gray hidden md:block">
                        <div className="flex justify-between bg-blue-950 rounded-s-md rounded-e-full p-16">
                            <div className="flex flex-col">
                                <div className="mb-10 text-white text-[1.778rem] leading-[2.444rem] font-bold w-[400px]">
                                {t('home_title_16')}
                                </div>
                                <div className="mb-8 text-white w-[480px]">
                                    {t('home_desc_16')}
                                </div>
                                <Button onClick={()=> contactExpert()} className="p-6 w-fit" variant={"secondary"} >
                                    <div className="">{t('contact_with_expert')}</div>
                                    <ArrowUpRight />
                                </Button>
                            </div>
                            <img src={LogoWhite} width={264} height={264} alt="" />
                        </div>
                    </div>
                </div>
            </main>
            <HomeFooter></HomeFooter>
        </>
    );
}
