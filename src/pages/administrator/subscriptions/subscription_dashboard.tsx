import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutAdmin";
import { Card, CardContent,   CardHeader,   } from "@/components/ui/card";
import {  CartesianGrid, Cell,  Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import adminSubscriptionRepository from "@/repositories/admin/adminSubscriptionRepository";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalState } from '@/providers/globalContext';


export default function AdministratorSubscriptionDashboard() {
  interface DashboardData {
    line_chart_data: {
      lines: [];
      data: [];
      axes: {
        x_axis: string[];
        y_axis: {
          min: number;
          max: number;
        };
      };
    };
    pie_chart_data: [];
  }

  
  const { echo, globalStateLoading } =  useGlobalState();
  const [isInitalLoading, setIsIinitalLoading] = useState(true);
  const [, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    line_chart_data: {
      data: [],
      lines: [],
      axes: {
        x_axis: [],
        y_axis: {
          min: 0,
          max: 0,
        },
      },
    },
    pie_chart_data: [],
  });

  const planColors: { [key: string]: string } = {
    yearly_solo_package: "#8884d8",
    yearly_package: "#82ca9d",
    premium_yearly_package: "#ffc658",
  };
 

  const fetchData = async function () {

    setIsLoading(true);

    const response = await adminSubscriptionRepository.getSubscriptionDashboard();

    if (response.success) {
      setDashboardData(response.data);
    }

    setIsLoading(false);
    setIsIinitalLoading(false);

  };

  useEffect(() => {
    fetchData();

  }, []);
  
  useEffect(()=>{
    if(!globalStateLoading){
      echo.channel(`administrator`).listen(".CompanySubscribedEvent", () => {
        fetchData()
        console.log("CompanySubscribedEvent triggerd on administrator dashboard ");
      });
      return () => {
        echo.channel(`administrator`).stopListening(".CompanySubscribedEvent");
      };
    }
    
  },[globalStateLoading])



  return (
    <AuthenticatedLayoutAdmin header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Administrator Dashboard</h2>}>
      {isInitalLoading ? (
        <div className="grid grid-cols-12 gap-4">
          <Skeleton className="col-span-6  h-80 w-full mb-2" />
          <Skeleton className="col-span-6 h-80 w-full mx-2 mb-2" />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          <Card className="col-span-6">
            <CardHeader>Subscriptions this month</CardHeader>
            <CardContent className="flex flex-1 items-center p-1">
              <ChartContainer
                config={{
                  resting: {
                    label: "Resting",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="w-full"
              >
                {dashboardData.line_chart_data.lines.length > 0 ? (
                  <ResponsiveContainer>
                    <LineChart accessibilityLayer data={dashboardData.line_chart_data.data} margin={{ bottom: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.5} />
                      <YAxis domain={[dashboardData.line_chart_data.axes.y_axis.min, dashboardData.line_chart_data.axes.y_axis.max]} />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        ticks={dashboardData.line_chart_data.axes.x_axis}
                        tickCount={dashboardData.line_chart_data.axes.x_axis.length}
                        angle={-80}
                        textAnchor="end"
                        interval={0}
                        minTickGap={0}
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })
                        }
                      />

                      {dashboardData.line_chart_data.lines.map((line: { key: string; title: string }, key) => (
                        <Line
                          key={key}
                          dataKey={line.key}
                          type="natural"
                          fill={planColors[line.key] || "var(--color-resting)"}
                          stroke={planColors[line.key] || "var(--color-resting)"}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{
                            fill: planColors[line.key] || "var(--color-resting)",
                            stroke: planColors[line.key] || "var(--color-resting)",
                            r: 4,
                          }}
                        />
                      ))}

                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            indicator="line"
                            labelFormatter={(value) => {
                              return new Date(value).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              });
                            }}
                          />
                        }
                        cursor={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div>No Data</div>
                )}
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="col-span-6">
            <CardHeader>Subscription</CardHeader>
            <CardContent className="">
              {dashboardData.pie_chart_data.length > 0 ? (
                <ChartContainer
                  config={{
                    resting: {
                      label: "Resting",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="w-full h-full"
                >
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={dashboardData.pie_chart_data} dataKey={"value"} cx="50%" cy="50%" outerRadius="80%" fill="#8884d8">
                        {dashboardData.pie_chart_data.map((item: { key: string; name: string; value: number }) => (
                          <Cell key={item.key} fill={planColors[item.key]} />
                        ))}
                      </Pie>
                      <Legend></Legend>
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <div className="">No Data</div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </AuthenticatedLayoutAdmin>
  );
}
