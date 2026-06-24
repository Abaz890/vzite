import * as React from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { colorsRepo } from "@/lib/utils"

interface Tag {
    id: string
    name: string
    value: string
    color: string
}

interface TagInputProps {
    initialTags?: Tag[]
    onTagsChange: (tags: Tag[]) => void
}
 

export function TagInput({ initialTags = [], onTagsChange }: TagInputProps) {
    const [tags, setTags] = React.useState<Tag[]>(initialTags)
    const [inputValue, setInputValue] = React.useState("")
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [newTag, setNewTag] = React.useState<Omit<Tag, "id">>({
        name: "",
        value: "",
        color: colorsRepo[0].value,
    })
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => { 
        onTagsChange(tags)
    }, [tags])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault()
            setNewTag({
                name: inputValue,
                value: inputValue.toLowerCase().replace(/\s+/g, "-"),
                color: colorsRepo[0].value,
            })
            setIsModalOpen(true)
            setInputValue("")
        }
    }

    const addTag = () => {
        const tagToAdd: Tag = {
            id: Date.now().toString(),
            ...newTag,
        }
        setTags((prev) => [...prev, tagToAdd])
        setIsModalOpen(false)
        setNewTag({
            name: "",
            value: "",
            color: colorsRepo[0].value,
        })
    }

    const removeTag = (tagId: string) => {
        setTags((prev) => prev.filter((tag) => tag.id !== tagId))
    }

    return (
        <div className="relative">
            <div className="flex flex-wrap items-center gap-1 p-2 border rounded-md">
                {tags.map((tag) => (
                    <div key={tag.id}>
                        <div
                            className="inline-flex items-center rounded-full px-2 py-1 text-sm font-semibold"
                            style={{ backgroundColor: tag.color, color: "#ffffff" }}
                        >
                            {tag.name}
                            <button
                                onClick={() => removeTag(tag.id)}
                                className="ml-1 rounded-full p-1 hover:bg-black/10 focus:outline-none"
                                aria-label={`Remove tag ${tag.name}`}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                ))}
                <Input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Add a tag..."
                    className="flex-grow border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Tag</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={newTag.name}
                                onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="value" className="text-right">
                                Value
                            </Label>
                            <Input
                                id="value"
                                value={newTag.value}
                                onChange={(e) => setNewTag({ ...newTag, value: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="color" className="text-right">
                                Color
                            </Label>
                            <Select
                                onValueChange={(value) => setNewTag({ ...newTag, color: value })}
                                defaultValue={newTag.color}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a color" />
                                </SelectTrigger>
                                <SelectContent>
                                    {colorsRepo.map((color) => (
                                        <SelectItem key={color.value} value={color.value}>
                                            <div className="flex items-center">
                                                <div
                                                    className="w-4 h-4 rounded-full mr-2"
                                                    style={{ backgroundColor: color.value }}
                                                />
                                                {color.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={addTag}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}