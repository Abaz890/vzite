import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { SelectDynamic } from "../ui/selectDynamic"
import companyPropertyRepository from "@/repositories/company/companyPropertyRepository"
// import { useEffect, useState } from "react";
// import { SerializedEditorState, SerializedLexicalNode } from 'lexical'
// import { Editor } from '@/components/blocks/editor-00/editor'
// import { $generateHtmlFromNodes } from "@lexical/html"; 
import { DatePicker } from "../ui/datePicker";
import RichTextEditor from "../RichTextEditor";


export default function BasicInfoStep({ form, property }: { form: UseFormReturn<any>, property: any }) {

  const fetchDeveloper = async function (page: number, query: string) {
    const response = await companyPropertyRepository.getDevelopers(page, query);
    return {
      data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label: item.name, value: item.id.toString() })) : [],
      lastPage: response.success ? response.data.last_page : 1,
    };
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="reference_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference Id</FormLabel>
                <FormControl>
                  <Input placeholder="Property reference id" {...field} disabled={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Property title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="developer_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Developer</FormLabel>
                <SelectDynamic
                  name="developer"
                  field={field}
                  defaultValue={property.developer ? { label: property.developer.name, value: form.getValues('developer_id') } : undefined}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  fetchOptions={async (page, query) => await fetchDeveloper(page, query)}
                />
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="handover_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Handover At</FormLabel>
                <FormControl>
                  <div className="w-full">
                    <DatePicker value={field.value} onValueChange={field.onChange} placeholder="Select handover date" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={() => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={form.getValues('description')}
                    onChange={(val) => form.setValue('description', val)}
                  />
                  {/* <ReactQuill theme="snow" value={form.getValues('description')} onChange={(val) => form.setValue('description', val)} /> */}

                  {/* <Editor
                    editorSerializedState={editorState}
                    onChange={(editor) => {
                      editor.read(() => {
                        const htmlString = $generateHtmlFromNodes(editor);
                        form.setValue('description',htmlString)
                      })
                    }}
                    onSerializedChange={(value: SetStateAction<SerializedEditorState<SerializedLexicalNode>>) => setEditorState(value)}
                    html={form.getValues('description')}
                  /> */}
                  {/* <Textarea placeholder="Describe the property" className="min-h-[120px]" {...field} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}

