import {
  ComponentProps,
  ElementType,
  forwardRef,
  ReactNode,
  Ref,
  useImperativeHandle,
  useRef,
} from 'react';
import { common, createLowlight } from 'lowlight';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/shared/lib/utils';
import { CodeBlockLowlight as TiptapCodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { Color } from '@tiptap/extension-color';
import { Image } from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import { Typography } from '@tiptap/extension-typography';
import { Underline } from '@tiptap/extension-underline';
import type { Content, Editor, UseEditorOptions } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { TiptapFormatter } from '../TiptapFormatter';
import { TiptapHeading } from '../TiptapHeading';
import { TiptapImage } from '../TiptapImage';
import { TiptapTextColor } from '../TiptapTextColor';

import '@/app/styles/index.css';

/* eslint-disable */

export interface UseTiptapEditorProps extends UseEditorOptions {
  value?: Content;
  output?: 'html' | 'json' | 'text';
  placeholder?: string;
  editorClassName?: string;
  throttleDelay?: number;
  onUpdate?: (content: Content) => void;
  onBlur?: (content: Content) => void;
}

export interface TiptapEditorProps
  extends Omit<UseTiptapEditorProps, 'onUpdate'> {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  editorContentClassName?: string;
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border-t border-border p-2">
    <div className="flex w-max items-center gap-px">
      <TiptapHeading editor={editor} activeLevels={[1, 2, 3, 4, 5, 6]} />
      <TiptapFormatter
        editor={editor}
        activeActions={['bold', 'italic', 'underline', 'strikethrough', 'code']}
        mainActionCount={5}
      />
      <TiptapTextColor editor={editor} />
      <TiptapImage editor={editor} />
    </div>
  </div>
);

const CodeBlockLowlight = TiptapCodeBlockLowlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      lowlight: createLowlight(common),
      defaultLanguage: null,
      HTMLAttributes: {
        class: 'block-node',
      },
    };
  },
});

const createExtension = (placeholder: string) => [
  StarterKit.configure({
    horizontalRule: false,
    codeBlock: false,
    paragraph: { HTMLAttributes: { class: 'text-node' } },
    heading: { HTMLAttributes: { class: 'heading-node' } },
    blockquote: { HTMLAttributes: { class: 'block-node' } },
    bulletList: { HTMLAttributes: { class: 'list-node' } },
    orderedList: { HTMLAttributes: { class: 'list-node' } },
    code: { HTMLAttributes: { class: 'inline', spellcheck: 'false' } },
    dropcursor: { width: 2, class: 'ProseMirror-dropcursor border' },
  }),
  Typography,
  Underline,
  TextStyle,
  CodeBlockLowlight,
  Color,
  Image.configure({
    allowBase64: true,
  }),
  Placeholder.configure({ placeholder: () => placeholder }),
];

export const TiptapEditor = forwardRef<HTMLDivElement, TiptapEditorProps>(
  (
    {
      value,
      onChange,
      className,
      editorContentClassName,
      placeholder = '',
      ...props
    },
    ref
  ) => {
    const editor = useEditor({
      extensions: createExtension(placeholder),
      // content: '',
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
      content: value,
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: cn('focus:outline-none', props.editorClassName),
        },
      },
    });

    if (!editor) {
      return null;
    }

    return (
      <MeasuredContainer
        as="div"
        name="editor"
        ref={ref}
        className={cn(
          'flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary',
          className
        )}
      >
        <ScrollArea className="max-h-96 cursor-pointer">
          <EditorContent
            editor={editor}
            className={cn('minimal-tiptap-editor', editorContentClassName)}
          />
        </ScrollArea>
        <Toolbar editor={editor} />
        {/* <LinkBubbleMenu editor={editor} /> */}
      </MeasuredContainer>
    );
  }
);

interface MeasuredContainerProps<T extends ElementType> {
  as: T;
  name: string;
  children?: ReactNode;
}

export const MeasuredContainer = forwardRef(
  <T extends ElementType>(
    {
      as: Component,
      name,
      children,
      style = {},
      ...props
    }: MeasuredContainerProps<T> & ComponentProps<T>,
    ref: Ref<HTMLElement>
  ) => {
    const innerRef = useRef<HTMLElement>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLElement);

    return (
      <Component {...props} ref={innerRef} style={{ ...style }}>
        {children}
      </Component>
    );
  }
);
