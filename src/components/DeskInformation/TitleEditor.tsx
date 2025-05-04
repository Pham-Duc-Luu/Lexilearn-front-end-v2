import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './Header.css';
export interface TitleEditorProps {
  onChange?: (title: string) => void;
  value?: string; // Initial value for the editor (optional)
}
const TitleEditor = ({
  onChange = (title) => {},
  value = '',
}: TitleEditorProps) => {
  const titleEditor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Placeholder.configure({
        // Use a placeholder:
        // Use different placeholders depending on the node type:
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Enter your title here...';
          }
          return 'Enter your description here...';
        },
      }),
    ],

    content: `<h1>${value}</h1>`, // Start with an empty heading
    onUpdate: ({ editor }) => {
      // Truncate content to a single line

      const content = editor.getText();
      console.log(content);
      const truncatedContent = content.split('\n')[0]; // Only take the first line
      if (!content) {
        editor.commands.setContent(`<h1></h1>`);
      }
      if (content !== truncatedContent) {
        editor.commands.setContent(`<h1>${truncatedContent}</h1>`);
      }
      onChange(editor.getText());
    },
    editable: true,
  });

  return (
    <>
      <EditorContent editor={titleEditor}></EditorContent>
    </>
  );
};

export default TitleEditor;
