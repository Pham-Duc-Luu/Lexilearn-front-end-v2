import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Editor,
  EditorContent,
  EditorContentProps,
  useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
export interface TipTapEditorProps extends Partial<EditorContentProps> {
  onChange?: (editor: Editor) => void;

  value?: string; // Initial value for the editor (optional)
  placeholder?: string; // Placeholder text for the editor (optional)
  setEditor?: (editor: Editor) => void;
}
const TipTapEditor = ({
  onChange = (title) => {},
  value = '',
  placeholder,
  setEditor = (editor) => {},
  ...props
}: TipTapEditorProps) => {
  const { t } = useTranslation('edit');
  const CustomDocument = Document.extend({
    content: 'heading block*',
  });

  const tiptap = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Bold,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return t('header.Give your desk a title.Title');
          }

          return 'Can you add some further context?';
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor);
    },
  });

  useEffect(() => {
    if (tiptap) {
      setEditor(tiptap);
    }
  }, [tiptap]);

  return (
    <>
      <EditorContent editor={tiptap} {...props}></EditorContent>
    </>
  );
};

export default TipTapEditor;
