import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DatePickerProps {
  value?: Date | string
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
}

export function DatePicker({ value, onValueChange, placeholder }: DatePickerProps) {
  // Initialize date state from value prop
  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (!value) return undefined
    return typeof value === "string" ? new Date(value) : value
  })

  // Get initial date for year and month (defaults to current date if no value)
  const initialDate = React.useMemo(() => {
    if (!value) return new Date()
    return typeof value === "string" ? new Date(value) : value
  }, [])

  const [year, setYear] = React.useState(initialDate.getFullYear())
  const [month, setMonth] = React.useState(initialDate.getMonth())

  // Update internal state when value prop changes
  React.useEffect(() => {
    if (value) {
      const dateValue = typeof value === "string" ? new Date(value) : value
      setDate(dateValue)
      setYear(dateValue.getFullYear())
      setMonth(dateValue.getMonth())
    }
  }, [value])

  const years = Array.from({ length: 10 }, (_, i) => year - 5 + i)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    if (onValueChange) {
      onValueChange(newDate)
    }
  }

  const handleYearChange = (selectedYear: string) => {
    const newYear = Number.parseInt(selectedYear)
    setYear(newYear)

    // If a date is already selected, update it with the new year
    if (date) {
      const newDate = new Date(date)
      newDate.setFullYear(newYear)
      handleDateChange(newDate)
    }
  }

  const handleMonthChange = (selectedMonth: string) => {
    const monthIndex = months.indexOf(selectedMonth)
    setMonth(monthIndex)

    // If a date is already selected, update it with the new month
    if (date) {
      const newDate = new Date(date)
      newDate.setMonth(monthIndex)
      handleDateChange(newDate)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder ?? "Pick a date"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex items-center justify-between space-x-2 p-3">
          <Select value={year.toString()} onValueChange={handleYearChange}>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={months[month]} onValueChange={handleMonthChange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          month={new Date(year, month)}
          onMonthChange={(newMonth) => {
            setMonth(newMonth.getMonth())
            setYear(newMonth.getFullYear())
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
