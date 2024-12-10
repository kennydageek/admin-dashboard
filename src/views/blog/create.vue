<template>
  <ea-navbar />

  <div class="my-[42px] bg-white p-6">
    <div class="flex justify-between">
      <p @click="$router.back()" class="cursor-pointer">
        &larr; <span class="text-slate-600">Back</span>
      </p>
      <div>
        <ea-button @click="showModal = true">Create a new category</ea-button>
      </div>
    </div>

    <div class="py-10 flex gap-10">
      <div class="w-1/2">
        <p>Main Image</p>
        <image-upload class="h-full" @updateImageUrl="handleUpdateImageUrl" />
      </div>

      <div class="w-1/2">
        <p class="mt-2">Title</p>
        <div
          class="w-full bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
        >
          <input
            type="text"
            placeholder=""
            v-model="title"
            class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500 focus:outline-none"
            required
          />
        </div>

        <p class="mt-5">Body</p>
        <div class="main-container">
          <div
            class="editor-container editor-container_classic-editor editor-container_include-style"
            ref="editorContainerElement"
          >
            <div class="editor-container__editor">
              <div ref="editorElement">
                <ckeditor
                  v-if="editor && config"
                  v-model="body"
                  :editor="editor"
                  :config="config"
                />
              </div>
            </div>
          </div>
        </div>

        <p class="mt-5">Author</p>
        <div
          class="w-full bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
        >
          <input
            type="text"
            placeholder="Author Name"
            v-model="author"
            class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500 focus:outline-none"
            required
          />
        </div>

        <p class="mt-5">Category</p>
        <div class="w-full flex">
          <select v-model="selectedCategory" class="p-3 border rounded w-full">
            <option disabled value="">Select a category</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category.title }}
            </option>
          </select>
          <button
            @click="addCategory"
            :disabled="
              !selectedCategory || selectedCategories.includes(selectedCategory)
            "
            class="ml-2 p-2 bg-primary-600 text-white rounded disabled:opacity-50"
          >
            Add
          </button>
        </div>

        <div class="mt-3">
          <p>Selected Categories:</p>
          <ul class="list-disc pl-5">
            <li
              v-for="category in selectedCategories"
              :key="category"
              class="flex justify-between items-center"
            >
              {{ category.title }}
              <button
                @click="removeCategory(category)"
                class="ml-2 text-red-500"
              >
                Remove
              </button>
            </li>
          </ul>
        </div>

        <div class="mt-10">
          <ea-button @click="handleCreateBlog">
            <ea-spinner small v-if="isCreating" />
            <p v-else>Create Blog</p>
          </ea-button>
        </div>
      </div>
    </div>
  </div>

  <ea-modal
    @close-modal="showModal = false"
    :setup="{
      modalActive: showModal,
      modalTitle: 'Add a new category',
      isVerification: false,
    }"
  >
    <p class="my-2">Category name</p>
    <div
      class="w-full bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex mb-10"
    >
      <input
        type="text"
        placeholder=""
        v-model="categoryName"
        class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500 focus:outline-none"
        required
      />
    </div>

    <ea-button @click="handleCreateBlogCategory">
      <ea-spinner small v-if="loading" />
      <p v-else>Create Category</p>
    </ea-button>
  </ea-modal>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ImageUpload from '@/components/ImageUpload.vue';
import Editor from './components/editor.vue';
import { BlogService } from '@/services';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const toast = useToast();
const loading = ref(false);
const title = ref('');
const author = ref('');
const body = ref('');
const selectedCategory = ref('');
const selectedCategories = ref([]);
const categories = ref(['Tech', 'Lifestyle', 'Business', 'Health', 'Sports']);
const imageUrl = ref('');
const showModal = ref(false);
const categoryName = ref('');
const isCreating = ref(false);

const addCategory = () => {
  if (
    selectedCategory.value &&
    !selectedCategories.value.includes(selectedCategory.value)
  ) {
    selectedCategories.value.push(selectedCategory.value);
    console.log(selectedCategories.value);
    selectedCategory.value = ''; // Reset dropdown selection
  }
};

const removeCategory = (category) => {
  selectedCategories.value = selectedCategories.value.filter(
    (cat) => cat !== category
  );
};

const fetchBlogCategories = async () => {
  const data = await BlogService.fetchBlogCategories();
  categories.value = data.posts;
  console.log(data);
};

const handleUpdateImageUrl = (e) => {
  imageUrl.value = e;
};

const handleCreateBlog = async () => {
  const payload = {
    title: title.value,
    body: body.value,
    author: author.value,
    mainImageUrl: imageUrl.value,
    slug: title.value.split(' ').join('-'),
    category: selectedCategories.value,
  };
  try {
    isCreating.value = true;
    const data = await BlogService.createPost(payload);
    toast.success('Blog post created');
    router.push('/blogs');
    isCreating.value = false;
  } catch (error) {}
};

const handleCreateBlogCategory = async () => {
  const payload = {
    title: categoryName.value,
  };

  try {
    loading.value = true;
    const data = await BlogService.createBlogCategory(payload);
    showModal.value = false;
    if (data) {
      toast.success('Category created successfully');
      setTimeout(() => {
        fetchBlogCategories();
      }, 2000);
      loading.value = false;
    }
  } catch (error) {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBlogCategories();
});

import { computed, watchEffect } from 'vue';
import { Ckeditor, useCKEditorCloud } from '@ckeditor/ckeditor5-vue';

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzQ5OTgzOTksImp0aSI6Ijg5MGRiZmIxLTkyYzUtNDA3NS1iY2I3LTMwY2E1ZjllZGRhMyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImU2MmFmNGM2In0.gpBNGikySvZ2i-UTle-2gCBRuFTalY8xDodiPwHU4N7Sv8n2VK_2kABAxaWixvWQ7xAvxz139a2u8JuLc-86ew';

const CLOUD_SERVICES_TOKEN_URL =
  'https://3zoklvaqt0hm.cke-cs.com/token/dev/be1f838b2d266d498329cf279b307b1f234f7ff3e5ce00a4a27e3ecea37e?limit=10';

const cloud = useCKEditorCloud({
  version: '44.0.0',
  ckbox: { version: '2.6.1' },
});

const isLayoutReady = ref(false);

const editor = computed(() => {
  if (!cloud.data.value) {
    return null;
  }

  return cloud.data.value.CKEditor.ClassicEditor;
});

const config = computed(() => {
  if (!isLayoutReady.value) {
    return null;
  }

  if (!cloud.data.value) {
    return null;
  }

  const {
    Alignment,
    AutoImage,
    AutoLink,
    Autosave,
    BlockQuote,
    Bold,
    Bookmark,
    CKBox,
    CloudServices,
    Code,
    CodeBlock,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    Paragraph,
    PictureEditing,
    RemoveFormat,
    SpecialCharacters,
    Strikethrough,
    Style,
    Subscript,
    Superscript,
    TextPartLanguage,
    Title,
    TodoList,
    Underline,
  } = cloud.data.value.CKEditor;

  return {
    toolbar: {
      items: [
        'textPartLanguage',
        '|',
        'heading',
        'style',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'subscript',
        'superscript',
        'code',
        'removeFormat',
        '|',
        'specialCharacters',
        'horizontalLine',
        'link',
        'bookmark',
        'insertImage',
        'ckbox',
        'highlight',
        'blockQuote',
        'codeBlock',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        'outdent',
        'indent',
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      Alignment,
      AutoImage,
      AutoLink,
      Autosave,
      BlockQuote,
      Bold,
      Bookmark,
      CKBox,
      CloudServices,
      Code,
      CodeBlock,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Paragraph,
      PictureEditing,
      RemoveFormat,
      SpecialCharacters,
      Strikethrough,
      Style,
      Subscript,
      Superscript,
      TextPartLanguage,
      Title,
      TodoList,
      Underline,
    ],
    cloudServices: {
      tokenUrl: CLOUD_SERVICES_TOKEN_URL,
    },
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true,
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5',
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6',
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
      ],
    },
    initialData: '<h2>Edit here </h2>',
    licenseKey: LICENSE_KEY,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    placeholder: 'Type or paste your content here!',
    style: {
      definitions: [
        {
          name: 'Article category',
          element: 'h3',
          classes: ['category'],
        },
        {
          name: 'Title',
          element: 'h2',
          classes: ['document-title'],
        },
        {
          name: 'Subtitle',
          element: 'h3',
          classes: ['document-subtitle'],
        },
        {
          name: 'Info box',
          element: 'p',
          classes: ['info-box'],
        },
        {
          name: 'Side quote',
          element: 'blockquote',
          classes: ['side-quote'],
        },
        {
          name: 'Marker',
          element: 'span',
          classes: ['marker'],
        },
        {
          name: 'Spoiler',
          element: 'span',
          classes: ['spoiler'],
        },
        {
          name: 'Code (dark)',
          element: 'pre',
          classes: ['fancy-code', 'fancy-code-dark'],
        },
        {
          name: 'Code (bright)',
          element: 'pre',
          classes: ['fancy-code', 'fancy-code-bright'],
        },
      ],
    },
  };
});

onMounted(() => {
  isLayoutReady.value = true;
});

watchEffect(() => {
  if (config.value) {
    configUpdateAlert(config.value);
  }
});

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
function configUpdateAlert(config) {
  if (configUpdateAlert.configUpdateAlertShown) {
    return;
  }

  const isModifiedByUser = (currentValue, forbiddenValue) => {
    if (currentValue === forbiddenValue) {
      return false;
    }

    if (currentValue === undefined) {
      return false;
    }

    return true;
  };

  const valuesToUpdate = [];

  configUpdateAlert.configUpdateAlertShown = true;

  if (
    !isModifiedByUser(
      config.cloudServices?.tokenUrl,
      '<YOUR_CLOUD_SERVICES_TOKEN_URL>'
    )
  ) {
    valuesToUpdate.push('CLOUD_SERVICES_TOKEN_URL');
  }

  if (valuesToUpdate.length) {
    window.alert(
      [
        'Please update the following values in your editor config',
        'to receive full access to Premium Features:',
        '',
        ...valuesToUpdate.map((value) => ` - ${value}`),
      ].join('\n')
    );
  }
}
</script>
