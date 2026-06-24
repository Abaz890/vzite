import type { UseFormReturn } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function PricingStep({ form }: { form: UseFormReturn<any> }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          {
            form.getValues('type') === 'sale' &&


            <FormField
              control={form.control}
              name="sale_price"
              render={({ field }) => (
                <FormItem className="space-y-6">
                  <PricingCard
                    id="sale_price"
                    title="sale_price"
                    form={form}
                    fieldName="sale_price"
                    selected={field.value === "year"}
                  />
                </FormItem>)} />
          }
          {

            form.getValues('type') === 'rent' &&
            <>
              <FormField
                control={form.control}
                name="default_pricing"
                render={({ field }) => (
                  <FormItem className="space-y-6">
                    <FormLabel>Select Default Pricing Period</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                      >
                        <PricingCard
                          id="year"
                          title="Year"
                          form={form}
                          fieldName="year_price"
                          selected={field.value === "year"}
                        />
                        <PricingCard
                          id="month"
                          title="Month"
                          form={form}
                          fieldName="month_price"
                          selected={field.value === "month"}
                        />
                        <PricingCard
                          id="week"
                          title="Week"
                          form={form}
                          fieldName="week_price"
                          selected={field.value === "week"}
                        />
                        <PricingCard
                          id="day"
                          title="Day"
                          form={form}
                          fieldName="day_price"
                          selected={field.value === "day"}
                        />
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>

          }
        </CardContent>
      </Card>
    </div>
  )
}

function PricingCard({
  id,
  title,
  form,
  fieldName,
  selected,
}: {
  id: string
  title: string
  form: UseFormReturn<any>
  fieldName: string
  selected: boolean
}) {
  return (
    <Label
      htmlFor={id}
      className={
        cn(
          `flex flex-col border rounded-lg p-4 cursor-pointer transition-all ${selected ? "border-primary bg-primary/5" : "border-input"}`,
          fieldName === 'sale_price' && 'w-[30%]'
        )

      }
    >
      <div className="text-lg font-medium mb-4">{title}</div>
      <div className="bg-muted p-4 rounded-md mb-4">
        <div className="relative">
          <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <div className="absolute left-3 text-muted-foreground">AED</div>
                    <Input
                      type="number"
                      className="pl-12"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <div className="absolute right-3 text-muted-foreground">AED</div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      {
        fieldName !== 'sale_price' && <div className={cn(
          'flex items-center justify-center',
        )}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={id} id={id} />
            <span className="text-sm">Set as default</span>
          </div>
        </div>
      }
    </Label>
  )
}

