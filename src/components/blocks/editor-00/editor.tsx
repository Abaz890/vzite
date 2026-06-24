import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { EditorState, LexicalEditor, SerializedEditorState } from 'lexical'
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { editorTheme } from '@/components/editor/themes/editor-theme'
import { TooltipProvider } from '@/components/ui/tooltip'
import { nodes } from './nodes'
import { Plugins } from './plugins'
import { useEffect, useRef, useState } from 'react'
import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot } from 'lexical';


const editorConfig: InitialConfigType = {
  namespace: 'Editor',
  theme: editorTheme,
  nodes,
  editorState(editor) {
    return editor;
  },
  onError: (error: Error) => {
    console.error(error)
  },
}

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
  html
}: {
  editorState?: EditorState
  editorSerializedState?: SerializedEditorState
  onChange?: (editor: LexicalEditor, editorState: EditorState) => void
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void
  html: string
}) {


  const [isInitalLoading,setIsInitalLoading] = useState(true);


  const editor = useRef<LexicalEditor>(null);

function preprocessHTML(html : string) {
  // Replace <figure> with <p>
  html = html.replace(/<figure>/g, '<p>').replace(/<\/figure>/g, '');
  
  // Replace <img> with a placeholder or remove it
  // Since Lexical doesn't support <img> by default, you might choose to remove it or replace it with a link
  html = html.replace(/<img[^>]*src="([^"]+)"[^>]*>/g, '');
  
  return html;
}


  useEffect(() => {
    if (!editor.current) return;
    const parser = new DOMParser();
    const dom = parser.parseFromString(preprocessHTML(html), 'text/html');
    editor.current.update(() => {
      const nodes = $generateNodesFromDOM(editor.current!, dom);

      const root = $getRoot();
      root.clear(); 
      root.append(...nodes);
    });

    setIsInitalLoading(false);
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border bg-background shadow">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <Plugins />
          <EditorRefPlugin editorRef={editor} />
          <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={(editorState) => {
              if(!isInitalLoading){
                onChange?.(editor.current!,editorState)
                onSerializedChange?.(editorState.toJSON())
              }
            }}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  )
}
