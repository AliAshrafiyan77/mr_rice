<template>
    <div class="rich-text-editor w-full overflow-hidden rounded-xl border border-border bg-surface">
        <div
            v-if="editor"
            class="flex flex-wrap items-center gap-1 border-b border-border bg-background px-2 py-2"
            dir="rtl"
        >
            <div class="toolbar-group">
                <button
                    type="button"
                    title="بازگشت"
                    class="toolbar-btn"
                    :disabled="!editor.can().chain().focus().undo().run()"
                    @click="editor.chain().focus().undo().run()"
                >
                    <UiIcon name="undo" class="h-4 w-4" />
                </button>

                <button
                    type="button"
                    title="جلو"
                    class="toolbar-btn"
                    :disabled="!editor.can().chain().focus().redo().run()"
                    @click="editor.chain().focus().redo().run()"
                >
                    <UiIcon name="redo" class="h-4 w-4" />
                </button>
            </div>

            <div class="toolbar-divider" />

            <div class="toolbar-group">
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

            <div class="toolbar-divider" />

            <div class="toolbar-group">
                <button
                    type="button"
                    title="پررنگ"
                    class="toolbar-btn"
                    :class="{ 'toolbar-btn-active': editor.isActive('bold') }"
                    @click="editor.chain().focus().toggleBold().run()"
                >
                    <UiIcon name="bold" class="h-4 w-4" />
                </button>

                <button
                    type="button"
                    title="کج"
                    class="toolbar-btn"
                    :class="{ 'toolbar-btn-active': editor.isActive('italic') }"
                    @click="editor.chain().focus().toggleItalic().run()"
                >
                    <UiIcon name="italic" class="h-4 w-4" />
                </button>

                <button
                    type="button"
                    title="خط خورده"
                    class="toolbar-btn"
                    :class="{ 'toolbar-btn-active': editor.isActive('strike') }"
                    @click="editor.chain().focus().toggleStrike().run()"
                >
                    <UiIcon name="strikethrough" class="h-4 w-4" />
                </button>
            </div>

            <div class="toolbar-divider" />

            <div class="toolbar-group">
                <button
                    type="button"
                    title="لیست"
                    class="toolbar-btn"
                    :class="{ 'toolbar-btn-active': editor.isActive('bulletList') }"
                    @click="editor.chain().focus().toggleBulletList().run()"
                >
                    <UiIcon name="list-bullet" class="h-4 w-4" />
                </button>

                <button
                    type="button"
                    title="لیست شماره‌دار"
                    class="toolbar-btn"
                    :class="{ 'toolbar-btn-active': editor.isActive('orderedList') }"
                    @click="editor.chain().focus().toggleOrderedList().run()"
                >
                    <UiIcon name="list-numbered" class="h-4 w-4" />
                </button>

                <button
                    type="button"
                    title="نقل قول"
                    class="toolbar-btn"
                    :class="{ 'toolbar-btn-active': editor.isActive('blockquote') }"
                    @click="editor.chain().focus().toggleBlockquote().run()"
                >
                    <UiIcon name="blockquote" class="h-4 w-4" />
                </button>
            </div>

            <div class="toolbar-divider" />

            <div class="toolbar-group">
                <button
                    type="button"
                    title="حذف قالب‌بندی"
                    class="toolbar-btn"
                    @click="editor.chain().focus().clearNodes().unsetAllMarks().run()"
                >
                    <UiIcon name="clear-formatting" class="h-4 w-4" />
                </button>
            </div>
        </div>

        <EditorContent
            :editor="editor"
            class="rich-editor bg-background"
            dir="rtl"
        />
    </div>
</template>

<script setup>
import { computed, watch } from 'vue'
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

    onUpdate: ({ editor: currentEditor }) => {
        emit('update:modelValue', currentEditor.getHTML())
    },
})

watch(
    () => props.modelValue,
    (value) => {
        if (!editor.value) {
            return
        }

        const currentContent = editor.value.getHTML()

        if (value !== currentContent) {
            editor.value.commands.setContent(value || '', false)
        }
    },
)

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
.toolbar-group {
    display: flex;
    align-items: center;
    gap: 0.125rem;
}

.toolbar-divider {
    width: 1px;
    height: 1.5rem;
    margin-inline: 0.25rem;
    background-color: var(--color-border);
}

.toolbar-btn {
    display: inline-flex;
    height: 2rem;
    width: 2rem;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    color: var(--color-muted);
    transition: background-color 150ms ease, color 150ms ease;
    cursor: pointer;
}

.toolbar-btn:hover:not(:disabled) {
    background-color: var(--color-primary-50);
    color: var(--color-primary-600);
}

.toolbar-btn:disabled {
    pointer-events: none;
    opacity: 0.35;
}

.toolbar-btn-active {
    background-color: var(--color-primary-100);
    color: var(--color-primary-600);
}

.toolbar-select {
    height: 2rem;
    min-width: 6.5rem;
    cursor: pointer;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    background-color: var(--color-surface);
    padding-inline: 0.625rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-text);
    outline: none;
    transition: border-color 150ms ease, background-color 150ms ease;
}

.toolbar-select:hover {
    border-color: var(--color-primary-300);
    background-color: var(--color-primary-50);
}

.toolbar-select:focus {
    border-color: var(--color-primary-400);
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
    border-radius: 0.5rem;
    background: var(--color-primary-50);
}

:deep(.ProseMirror code) {
    border-radius: 0.375rem;
    background: var(--color-primary-50);
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
    color: var(--color-muted);
}
</style>
