import type { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function PermitsAndLicensesStep({ form }: { form: UseFormReturn<any> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Permits & Licenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="permit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permit Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select permit type`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"rera"}>Rera</SelectItem>
                      <SelectItem value={"dtcm"}>DTCM</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <Input placeholder="Permit number" {...field} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rera"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RERA Number</FormLabel>
                <FormControl>
                  <Input placeholder="RERA number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dtcm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DTCM Number</FormLabel>
                <FormControl>
                  <Input placeholder="DTCM number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trakheesi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trakheesi</FormLabel>
                <FormControl>
                  <Input placeholder="Trakheesi number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rera_licence_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RERA License ID</FormLabel>
                <FormControl>
                  <Input placeholder="RERA license ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
