import React from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaLink,
  FaImage,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaTable,
  FaCheckSquare,
  FaCode,
  FaUndo,
  FaRedo,
} from "react-icons/fa";

const MenuButton = ({ onClick, isActive, children }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded transition-colors ${
      isActive
        ? "!bg-blue-500 text-white"
        : "text-gray-300 hover:!bg-gray-600 hover:text-white"
    }`}
    style={{
      backgroundColor: isActive ? "#3b82f6" : "transparent",
    }}
  >
    {children}
  </button>
);

const TiptapEditor = ({ content, setContent, editorOptions = {} }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            class: "custom-code-block",
          },
        },
      }),
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Placeholder.configure({
        placeholder: "Write something amazing...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
      Underline,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    ...editorOptions
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        editor.chain().focus().setImage({ src: base64 }).run();
      };
      reader.readAsDataURL(file);
    };

    input.click();
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  return (
    <div className="w-full max-w-4xl text-white mx-auto">
      {/* Menu Bar */}
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div
          className="z-20 border rounded-xl shadow-sm p-2 flex flex-wrap gap-1"
          style={{ backgroundColor: "#151221" }}
        >
          {/* Text Formatting */}
          <div className="flex items-center space-x-1">
            <MenuButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
            >
              <FaBold />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
            >
              <FaItalic />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive("underline")}
            >
              <FaUnderline />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive("strike")}
            >
              <FaStrikethrough />
            </MenuButton>
          </div>

          <div className="w-px h-6 bg-gray-500 mx-2" />

          {/* Lists */}
          <div className="flex items-center space-x-1">
            <MenuButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
            >
              <FaListUl />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive("orderedList")}
            >
              <FaListOl />
            </MenuButton>
          </div>

          <div className="w-px h-6 bg-gray-500 mx-2" />

          {/* Undo & Redo */}
          <div className="flex items-center space-x-1">
            <MenuButton onClick={() => editor.chain().focus().undo().run()}>
              <FaUndo />
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().redo().run()}>
              <FaRedo />
            </MenuButton>
          </div>

          <div className="w-px h-6 bg-gray-500 mx-2" />

          {/* Text Alignment */}
          <div className="flex items-center space-x-1">
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              isActive={editor.isActive({ textAlign: "left" })}
            >
              <FaAlignLeft />
            </MenuButton>
            <MenuButton
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              isActive={editor.isActive({ textAlign: "center" })}
            >
              <FaAlignCenter />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              isActive={editor.isActive({ textAlign: "right" })}
            >
              <FaAlignRight />
            </MenuButton>
            <MenuButton
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              isActive={editor.isActive({ textAlign: "justify" })}
            >
              <FaAlignJustify />
            </MenuButton>
          </div>

          <div className="w-px h-6 bg-gray-500 mx-2" />

          {/* Insert Elements */}
          <div className="flex items-center space-x-1">
            <MenuButton onClick={addLink}>
              <FaLink />
            </MenuButton>
            <MenuButton onClick={addImage}>
              <FaImage />
            </MenuButton>
          </div>

          <div className="w-px h-6 bg-gray-500 mx-2" />

          {/* Code & Quotes */}
          <div className="flex items-center space-x-1">
            <MenuButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              isActive={editor.isActive("codeBlock")}
            >
              <FaCode />
            </MenuButton>
          </div>
        </div>
      </BubbleMenu>

      {/* Editor Content */}
      <div className="border border-t-0 rounded-b-lg">
        <EditorContent
          editor={editor}
          className="prose max-w-none p-2 min-h-[300px]"
        />

        <style jsx global>{`
          .ProseMirror {
            color: white !important;
          }

          .ProseMirror strong,
          .ProseMirror b {
            color: white !important;
            font-weight: bold !important;
          }

          .ProseMirror:focus {
            outline: none !important;
          }

          /* Custom Code Block Styles */
          .custom-code-block {
            background-color: black !important;
            color: white !important;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            margin: 0.5rem 1rem;
          }

          .custom-code-block code {
            color: white !important;
          }

          /* Ensure button overrides */
          button.!bg-blue-500 {
            background-color: #3b82f6 !important;
          }

          button:hover.hover\:!bg-gray-600:hover {
            background-color: #4b5563 !important;
          }
        `}</style>
      </div>
    </div>
  );
};

export default TiptapEditor;
