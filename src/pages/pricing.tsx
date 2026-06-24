import HomeNavbar from "@/components/home/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ChevronsUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import companyRepository from "@/repositories/company/companyRepository";
import { Spinner } from "@/components/ui/spinner";
import { useGlobalState } from "@/providers/globalContext";
import { useNavigate } from "react-router-dom";

export default function Pricing() {


  let navigate = useNavigate();
  const { t } = useTranslation("global");
  const { token } = useGlobalState();
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState({ loading: false, planId: "" });


  const USFlag = () => {
    return (
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 55.2 38.4" xmlSpace="preserve" className="us-flag">
        <style>
          {`
            .st0 { fill: #B22234; }
            .st1 { fill: #FFFFFF; }
            .st2 { fill: #3C3B6E; }
          `}
        </style>
        <g>
          <path className="st0" d="M3.03,0h49.13c1.67,0,3.03,1.36,3.03,3.03v32.33c0,1.67-1.36,3.03-3.03,3.03H3.03C1.36,38.4,0,37.04,0,35.37 V3.03C0,1.36,1.36,0,3.03,0L3.03,0z" />
          <path className="st1" d="M0.02,2.73h55.17c0.01,0.1,0.02,0.2,0.02,0.31v2.94H0V3.03C0,2.93,0.01,2.83,0.02,2.73L0.02,2.73z M55.2,8.67 v3.24H0V8.67H55.2L55.2,8.67z M55.2,14.61v3.24H0v-3.24H55.2L55.2,14.61z M55.2,20.55v3.24H0v-3.24H55.2L55.2,20.55z M55.2,26.49 v3.24H0v-3.24H55.2L55.2,26.49z M55.2,32.43v2.93c0,0.1-0.01,0.21-0.02,0.31H0.02C0.01,35.58,0,35.47,0,35.37v-2.93H55.2 L55.2,32.43z" />
          <path className="st2" d="M20.8,0v20.68H0V3.03C0,1.36,1.36,0,3.03,0H20.8L20.8,0L20.8,0z" />
        </g>
      </svg>
    );
  };

  const UKFlag = () => {
    return (
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 55.2 38.4" xmlSpace="preserve" className="uk-flag">
        <style>
          {`
            .st0 { fill: #FEFEFE; }
            .st1 { fill: #C8102E; }
            .st2 { fill: #012169; }
          `}
        </style>
        <g>
          <path
            className="st0"
            d="M2.87,38.4h49.46c1.59-0.09,2.87-1.42,2.87-3.03V3.03c0-1.66-1.35-3.02-3.01-3.03H3.01 
            C1.35,0.01,0,1.37,0,3.03v32.33C0,36.98,1.28,38.31,2.87,38.4L2.87,38.4z"
          />
          <polygon className="st1" points="23.74,23.03 23.74,38.4 31.42,38.4 31.42,23.03 55.2,23.03 55.2,15.35 31.42,15.35 31.42,0 23.74,0 23.74,15.35 0,15.35 0,23.03 23.74,23.03" />
          <path className="st2" d="M33.98,12.43V0h18.23c1.26,0.02,2.34,0.81,2.78,1.92L33.98,12.43L33.98,12.43z" />
          <path className="st2" d="M33.98,25.97V38.4h18.35c1.21-0.07,2.23-0.85,2.66-1.92L33.98,25.97L33.98,25.97z" />
          <path className="st2" d="M21.18,25.97V38.4H2.87c-1.21-0.07-2.24-0.85-2.66-1.94L21.18,25.97L21.18,25.97z" />
          <path className="st2" d="M21.18,12.43V0H2.99C1.73,0.02,0.64,0.82,0.21,1.94L21.18,12.43L21.18,12.43z" />
          <polygon className="st2" points="0,12.8 7.65,12.8 0,8.97 0,12.8" />
          <polygon className="st2" points="55.2,12.8 47.51,12.8 55.2,8.95 55.2,12.8" />
          <polygon className="st2" points="55.2,25.6 47.51,25.6 55.2,29.45 55.2,25.6" />
          <polygon className="st2" points="0,25.6 7.65,25.6 0,29.43 0,25.6" />
          <polygon className="st1" points="55.2,3.25 36.15,12.8 40.41,12.8 55.2,5.4 55.2,3.25" />
          <polygon className="st1" points="19.01,25.6 14.75,25.6 0,32.98 0,35.13 19.05,25.6 19.01,25.6" />
          <polygon className="st1" points="10.52,12.81 14.78,12.81 0,5.41 0,7.55 10.52,12.81" />
          <polygon className="st1" points="44.63,25.59 40.37,25.59 55.2,33.02 55.2,30.88 44.63,25.59" />
        </g>
      </svg>
    );
  };

  const EURFlag = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 356.18">
        <path fill="#039" fillRule="nonzero" d="M28.137 0H483.86C499.337 0 512 12.663 512 28.14v299.9c0 15.477-12.663 28.14-28.14 28.14H28.137C12.663 356.18 0 343.517 0 328.04V28.14C0 12.663 12.663 0 28.137 0z" />
        <path
          fill="#FC0"
          d="M237.179 53.246h14.378L256 39.572l4.443 13.674h14.378l-11.633 8.451 4.444 13.673L256 66.919l-11.632 8.451 4.444-13.673-11.633-8.451zm0 237.458h14.378L256 277.03l4.443 13.674h14.378l-11.633 8.451 4.444 13.673L256 304.377l-11.632 8.451 4.444-13.673-11.633-8.451zM118.45 171.975h14.378l4.443-13.674 4.443 13.674h14.378l-11.633 8.451 4.443 13.673-11.631-8.451-11.632 8.451 4.444-13.673-11.633-8.451zm59.363-102.796h14.377l4.443-13.674 4.443 13.674h14.378l-11.632 8.451 4.443 13.674-11.632-8.451-11.632 8.451 4.443-13.674-11.631-8.451zm-43.429 43.429h14.378l4.442-13.673 4.444 13.673h14.377l-11.632 8.451 4.443 13.674-11.632-8.451-11.631 8.451 4.443-13.674-11.632-8.451zm-.032 118.737h14.377l4.443-13.674 4.443 13.674h14.377l-11.631 8.451 4.443 13.674-11.632-8.451-11.632 8.451 4.443-13.674-11.631-8.451zm43.471 43.46h14.378l4.443-13.674 4.443 13.674h14.378l-11.632 8.451 4.443 13.674-11.632-8.451-11.631 8.451 4.443-13.674-11.633-8.451zm178.085-102.83h14.378l4.443-13.674 4.443 13.674h14.378l-11.633 8.451 4.444 13.673-11.632-8.451-11.631 8.451 4.443-13.673-11.633-8.451zM296.546 69.179h14.378l4.443-13.674 4.443 13.674h14.377l-11.631 8.451 4.443 13.674-11.632-8.451-11.632 8.451 4.443-13.674-11.632-8.451zm43.429 43.429h14.377l4.444-13.673 4.442 13.673h14.378l-11.632 8.451 4.443 13.674-11.631-8.451-11.632 8.451 4.443-13.674-11.632-8.451zm.033 118.737h14.377l4.443-13.674 4.443 13.674h14.377l-11.631 8.451 4.443 13.674-11.632-8.451-11.632 8.451 4.443-13.674-11.631-8.451zm-43.473 43.46h14.378l4.443-13.674 4.443 13.674h14.378l-11.633 8.451 4.443 13.674-11.631-8.451-11.632 8.451 4.443-13.674-11.632-8.451z"
        />
      </svg>
    );
  };

  const currencies = [
    {
      code: "USD",
      name: "US Dollar",
      flag: USFlag(),
      rate: 1,
    },
    {
      code: "GBP",
      name: "British Pound",
      flag: UKFlag(),
      rate: 1.279,
    },
    {
      code: "EUR",
      name: "Euro",
      flag: EURFlag(),
      rate: 1.1048,
    },
  ];

  const convertedAmount = (amount: number) => {
    const selectedCurrencyItem = currencies.find((curr) => curr.code === selectedCurrency);
    const calc_amount = Math.round(amount / selectedCurrencyItem!.rate);
    return `${calc_amount} ${selectedCurrencyItem!.code}`;
  };

  const plans = [
    {
      name: "plan_title_1",
      price: convertedAmount(120),
      price_desc: "plan_price_desc_1",
      perks: ["plan_perk_1", "plan_perk_3", "plan_perk_4", "plan_perk_5", "plan_perk_6", "plan_perk_7", "plan_perk_8"],
      stripe_price_id: "price_1RI72MCZb1B1cketyrYX0UZt",
    },
    {
      name: "plan_title_2",
      price: convertedAmount(750),
      price_desc: "plan_price_desc_2",
      perks: ["plan_perk_9", "plan_perk_10", "plan_perk_11", "plan_perk_12", "plan_perk_13"],
      stripe_price_id: "price_1Qx2rICZb1B1cketUit72Bmm",
    },
    {
      name: "plan_title_3",
      price: convertedAmount(1500),
      price_desc: "plan_price_desc_3",
      perks: ["plan_perk_14", "plan_perk_15", "plan_perk_11", "plan_perk_12", "plan_perk_13"],
      stripe_price_id: "price_1Qx2s0CZb1B1cketZrGuir7E",
    },
  ];

  const handleGetStartedClicked = async function (plan: any) {

    setIsLoading({ loading: true, planId: plan.name });

    if (token.value) {
      const response = await companyRepository.getSubscriptionCheckout(plan.stripe_price_id);
      if (response.success) {
        window.location.href = response.data.url;
      }
      else {
        setIsLoading({ loading: false, planId: '' });
      }
    }
    else {
      navigate(`/login`)
    }
  };

  return (
    <>
      <HomeNavbar></HomeNavbar>
      <main className="pricing-main py-8">
        <div className="flex flex-col py-8">
          <div className="text-white text-center text-[3.556rem]/[4.907rem] font-bold">{t("simple_transparent")}</div>
          <div className="text-white text-center tracking-[.3px] text-[18px]/[28px] mx-5">{/* Get your professional real estate website today */}</div>
        </div>

        <div className="flex justify-center my-6">
          <div className="text-white text-center tracking-[.3px] text-[18px]/[28px] mx-4">Choose your currency</div>
          <Popover open={isCurrencyOpen} onOpenChange={setIsCurrencyOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={isCurrencyOpen} className="w-[120px] justify-between">
                {selectedCurrency ? currencies.find((currency) => currency.code === selectedCurrency)!.flag : null}
                <span className="ml-2">{selectedCurrency}</span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[120px] p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {currencies.map((currency) => (
                      <CommandItem
                        key={currency.code}
                        value={currency.code}
                        onSelect={(currentValue) => {
                          setSelectedCurrency(currentValue === selectedCurrency ? "" : currentValue);
                          setIsCurrencyOpen(false);
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4", selectedCurrency === currency.code ? "opacity-100" : "opacity-0")} />
                        {currency.flag}
                        <span className="ml-2">{currency.code}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center justify-center mx-10 mb-4">
          <Card className="flex-1">
            <CardContent className="p-3 px-5">
              <div className="flex items-center justify-between">
                <div className="font-bold text-2xl">Custom for UAE only</div>
                <Button className="p-5 bg-blue-950 my-2" onClick={() => { window.open('https://form.jotform.com/251002108739045', '_blank') }}  >Get Started</Button>
              </div>
            </CardContent>
          </Card>
        </div>


        <div className="grid grid-cols-12 gap-4 mx-10">
          {plans.map((plan, key) => (
            <div key={key} className="md:col-span-4 col-span-12">
              <Card className="h-full">
                <CardContent className="h-full flex items-center flex-col justify-between ">
                  <div className="">
                    <div className="flex items-center flex-col items-center">
                      <div className="bg-blue-300/25 w-fit rounded-[4px] font-semibold uppercase tracking-[2px] text-[.778rem]/[1.056rem] p-[6px] my-4 ">{t(plan.name)}</div>
                      <div className=" my-2 ">
                        <div className="font-semibold uppercase tracking-[2px] text-[2.2rem]/[1.907rem]">{t(plan.price)}</div>
                        <div className="mx-2 text-[0.875rem]/[1.25rem] text-slate-600 font-semibold">{t(plan.price_desc)}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start my-6">
                      {plan.perks.map((perk) => (
                        <div className="flex mb-2">
                          <Check className="text-blue me-2" />
                          <div className="">{t(perk)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <Button className="w-full p-5 bg-blue-950 my-2" onClick={() => handleGetStartedClicked(plan)} disabled={plan.name === isLoading.planId && isLoading.loading} >
                      {plan.name === isLoading.planId && isLoading.loading ? <Spinner></Spinner> : t("get_started")}

                    </Button>
                    <div className="text-[0.875rem]/[1.25rem] text-slate-500 text-center">{t("contact_us_for_custom_requirements")}</div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center">
                        <img src="https://agentsouk.com/images/whatsappnew.svg" width={32} alt="whatsapp" />
                        <a href="https://wa.me/447377157247" className="font-semibold hover:text-green-600" target="_blank">
                          +447377157247{" "}
                        </a>
                      </div>
                      {/* <div className="text-[0.875rem]/[1.25rem] text-slate-500">{t("or")}</div> */}
                      {/* <div className="font-semibold">support@vzite.com</div> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
