<template>
    <div class="w-full overflow-hidden rounded-xl border border-border bg-background">
        <!-- Toolbar -->
        <div
            v-if="editor"
            class="flex flex-wrap items-center gap-1 border-b border-border bg-muted/30 p-2"
            dir="rtl"
        >
            <!-- Undo / Redo -->
            <div class="flex items-center gap-1 pl-2 ml-1 border-l border-border">
                <button
                    type="button"
                    title="بازگشت"
                    class="toolbar-btn"
                    :disabled="!editor.can().chain().focus().undo().run()"
                    @click="editor.chain().focus().undo().run()"
                >
                    ↶
                </button>

                <button
                    type="button"
                    title="جلو"
                    class="toolbar-btn"
                    :disabled="!editor.can().chain().focus().redo().run()"
                    @click="editor.chain().focus().redo().run()"
                >
                    ↷
                </button>
            </div>

            <!-- Heading -->
            <div class="relative ml-1">
                <select
                    class="toolbar-select"
                    :value="currentHeading"
                    @change="setHeading($event.target.value)"
                >
                    <option value="paragraph">متن</option>
                    <option value="1">عنوان ۱</option>
                    <option value="2">عنوان ۲</option>
                    <option value="3">عنوان ۳</option>
                </select>
            </div>

            <!-- Text Formatting -->
            <div class="flex items-center gap-1 px-2 border-x border-border">
                <button
                    type="button"
                    title="پررنگ"
                    class="toolbar-btn font-bold"
                    :class="{ 'toolbar-btn-active': editor.isActive('bold') }"
                    @click="editor.chain().focus().toggleBold().run()"
                >
                    B
                </button>

                <button
                    type="button"
                    title="کج"
                    class="toolbar-btn italic"
                    :class="{ 'toolbar-btn-active': editor.isActive('italic') }"
                    @click="editor.chain().focus().toggleItalic().run()"
                >
                    I
                </button>

                <button
                    type="button"
                    title="خط خورده"
                    class="toolbar-btn line-through"
                    :class="{ 'toolbar-btn-active': editor.isActive('strike') }"
                    @click="editor.chain().focus().toggleStrike().run()"
                >
                    S
                </button>

            </div>

            <!-- Lists -->
            <div class="flex items-center gap-1 px-2 border-l border-border">
                <button
                    type="button"
                    title="لیست"
                    class="toolbar-btn"
                    :class="{ 'toolbar-btn-active': editor.isActive('bulletList') }"
                    @click="editor.chain().focus().toggleBulletList().run()"
                >
                    ☷
                </button>

                <button
                    type="button"
                    title="لیست شماره‌دار"
                    class="toolbar-btn"
                    :class="{ 'toolbar-btn-active': editor.isActive('orderedList') }"
                    @click="editor.chain().focus().toggleOrderedList().run()"
                >
                    ≡
                </button>

                <button
                    type="button"
                    title="نقل قول"
                    class="toolbar-btn"
                    :class="{ 'toolbar-btn-active': editor.isActive('blockquote') }"
                    @click="editor.chain().focus().toggleBlockquote().run()"
                >
                    ❝
                </button>
            </div>

            <!-- Clear formatting -->
            <button
                type="button"
                title="حذف قالب‌بندی"
                class="toolbar-btn"
                @click="editor.chain().focus().clearNodes().unsetAllMarks().run()"
            >
                Tx
            </button>
        </div>

        <!-- Editor -->
        <EditorContent
            :editor="editor"
            class="rich-editor"
            dir="rtl"
        />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
})

const emit = defineEmits([
    'update:modelValue',
])

const editor = useEditor({
    content: props.modelValue,

    extensions: [
        StarterKit,
    ],

    immediatelyRender: false,

    editorProps: {
        attributes: {
            class: 'focus:outline-none',
        },
    },

    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    },
})

const currentHeading = computed(() => {
    if (!editor.value) {
        return 'paragraph'
    }

    if (editor.value.isActive('heading', { level: 1 })) {
        return '1'
    }

    if (editor.value.isActive('heading', { level: 2 })) {
        return '2'
    }

    if (editor.value.isActive('heading', { level: 3 })) {
        return '3'
    }

    return 'paragraph'
})

const setHeading = (value) => {
    if (!editor.value) {
        return
    }

    if (value === 'paragraph') {
        editor.value.chain().focus().setParagraph().run()
        return
    }

    editor.value
        .chain()
        .focus()
        .toggleHeading({
            level: Number(value),
        })
        .run()
}
</script>

<style scoped>
.toolbar-btn {
    display: flex;
    height: 2rem;
    min-width: 2rem;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    padding: 0 0.5rem;
    font-size: 0.875rem;
    color: var(--color-text);
    transition: background-color 150ms ease, color 150ms ease;
    cursor: pointer;
}

.toolbar-btn:hover {
    background-color: var(--color-background);
    color: var(--color-primary-500);
}

.toolbar-btn:disabled {
    pointer-events: none;
    opacity: 0.3;
}

.toolbar-btn-active {
    background-color: var(--color-primary-100);
    color: var(--color-primary-600);
}

.toolbar-select {
    height: 2rem;
    cursor: pointer;
    border: 0;
    border-radius: 0.375rem;
    background: transparent;
    padding: 0 0.5rem;
    font-size: 0.875rem;
    color: var(--color-text);
    outline: none;
}

.toolbar-select:hover {
    background-color: var(--color-background);
}

.toolbar-select:focus {
    outline: none;
    box-shadow: none;
}

:deep(.ProseMirror) {
    min-height: 260px;
    padding: 1rem;
    outline: none;

    font-size: 0.875rem;
    line-height: 1.9;
    color: var(--color-text);
}

:deep(.ProseMirror p) {
    margin: 0 0 0.75rem;
}

:deep(.ProseMirror p:last-child) {
    margin-bottom: 0;
}

:deep(.ProseMirror h1) {
    margin: 1.5rem 0 0.75rem;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.5;
}

:deep(.ProseMirror h2) {
    margin: 1.25rem 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.5;
}

:deep(.ProseMirror h3) {
    margin: 1rem 0 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.5;
}

:deep(.ProseMirror ul) {
    margin: 0.75rem 0;
    padding-right: 1.5rem;
    list-style-type: disc;
}

:deep(.ProseMirror ol) {
    margin: 0.75rem 0;
    padding-right: 1.5rem;
    list-style-type: decimal;
}

:deep(.ProseMirror li) {
    margin: 0.25rem 0;
}

:deep(.ProseMirror blockquote) {
    margin: 1rem 0;
    padding: 0.75rem 1rem;
    border-right: 3px solid var(--color-primary-400);
    border-radius: 0.375rem;
    background: var(--color-muted);
}

:deep(.ProseMirror code) {
    border-radius: 0.25rem;
    background: var(--color-muted);
    padding: 0.15rem 0.35rem;
    font-family: monospace;
    font-size: 0.85em;
}

:deep(.ProseMirror strong) {
    font-weight: 700;
}

:deep(.ProseMirror em) {
    font-style: italic;
}

:deep(.ProseMirror p.is-editor-empty:first-child::before) {
    content: 'توضیحات محصول را وارد کنید...';
    float: right;
    height: 0;
    pointer-events: none;
    color: #9ca3af;
}
</style>