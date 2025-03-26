import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './Header.css';

export interface DescriptionEditorProps {
  onChange?: (description: string) => void;
  value?: string; // Initial value for the editor (optional)
}
const DescriptionEditor = ({
  onChange = () => {},
  value = '',
}: DescriptionEditorProps) => {
  const descriptionEditor = useEditor({
    extensions: [
      StarterKit,
      Text,
      Placeholder.configure({
        // Use a placeholder:
        // Use different placeholders depending on the node type:
        placeholder: ({ node }) => {
          return 'Enter your description here...';
        },
      }),
    ],
    content: value, // Initial empty content
    onUpdate: ({ editor }) => {
      // Truncate content if there's more than one line
      const content = editor.getText();
      const truncatedContent = content.split('\n')[0]; // Only take the first line
      if (content !== truncatedContent) {
        editor.commands.setContent(truncatedContent);
      }
      onChange(editor.getText());
    },
  });
  return (
    <>
      <EditorContent editor={descriptionEditor}></EditorContent>
    </>
  );
};

export default DescriptionEditor;
