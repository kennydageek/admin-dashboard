<template>
  <div class="">
    <div
      class="dropbox h-full"
      :class="files.length ? '' : 'flex flex-col justify-center'"
      @click="handleDropboxClick"
    >
      <img
        src="@/assets/images/upload.png"
        v-if="!files.length"
        class="h-full object-cover"
      />
      <!-- <p v-if="!files.length">Click or Drop Files Here</p>
      <p v-if="!files.length && loading === false">Uploaded Files:</p> -->
      <ul v-if="files.length" class="h-full">
        <li
          v-for="(file, index) in files"
          :key="index"
          v-if="!imageUrl && loading === false"
        >
          {{ file.name }}
        </li>

        <span v-if="loading === false"></span>
        <spinner v-else small class="mt-[50%]" />
        <img
          :src="imageUrl"
          class="w-full h-full object-cover"
          alt=""
          v-if="imageUrl"
        />
      </ul>
    </div>
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="handleFileSelect"
      multiple
      accept=".pdf, .docx, image/*"
    />

    <!-- <button
      class="btn-secondary w-full flex justify-center"
      @click.prevent="uploadFile"
      :disabled="files.length === 0"
    >
      <span v-if="loading === false">Upload Logo</span>
      <spinner v-else small />
    </button> -->
  </div>
</template>

<script>
import Spinner from '@/components/EaSpinner.vue';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default {
  components: { Spinner },
  data() {
    return {
      loading: false,
      files: [],
      imageUrl: '',
    };
  },
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  methods: {
    updateNameProp(newName) {
      // Update the 'name' prop
      this.name = newName;
    },

    handleDropboxClick() {
      this.$refs.fileInput.click();
    },
    handleFileSelect(event) {
      const files = event.target.files;

      // You can perform actions with the selected files here
      // For example, you can upload them to a server or display them on the page

      this.files = Array.from(files);

      console.log(this.files);
      this.uploadFile();
    },

    uploadFile() {
      const baseUrl = import.meta.env.VITE_VUE_APP_API_BASE;
      this.loading = true;
      const url = `${baseUrl}/file/file-upload/uploadImage`;
      const fd = new FormData();

      fd.append(
        'image',
        this.name.includes(' ') ? this.name.replace(/\s+/g, '_') : this.name
      );

      console.log(fd);

      // Append each file to FormData
      for (let i = 0; i < this.files.length; i++) {
        fd.append('image', this.files[i]);
      }

      fetch(url, {
        method: 'POST',
        body: fd,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle response from Cloudinary
          console.log(data);
          this.loading = false;
          this.imageUrl = data?.secure_url;
          //   alert('Upload successful');
          toast.success('Upload successful');

          this.$emit('updateImageUrl', data?.secure_url);

          //   this.$router.push('/');
        })
        .catch((error) => {
          console.error('Error uploading the file:', error);
          toast.error(error.message);
          this.loading = false;
          //   alert('Error uploading the file');
        });
    },
  },
};
</script>

<style scoped>
.dropbox {
  border: 2px dashed #ececec;
  /* padding: 20px; */
  text-align: center;
  cursor: pointer;
  margin-bottom: 20px;
  border-radius: 3px;
}
.dropbox:hover {
  background-color: #f0f0f0;
}
</style>
