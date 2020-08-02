<template>
  <div id="search" class="mt-5">
    <h1 class="text-center text-white">Search word on youtube video</h1>
    <hr class="text-center display-3" style="border: 1px solid white; " />
    <div class="form mt-3">
      <b-form class>
        <b-form-input
          class="w-50 mx-auto mt-4 d-inline"
          v-model="url"
          placeholder="Enter URL"
          required
        ></b-form-input>
        <button v-if="!submit" @click="submitClick" class="btn btn-primary ml-3">Submit</button>
        <b-form-input
          v-if="submit"
          class="w-50 mx-auto mt-4"
          v-model="kataKunci"
          placeholder="Enter keyword"
          required
        ></b-form-input>
      </b-form>
    </div>
    <h3 class="text-white mt-3" v-if="loading">Loading... Please Wait</h3>
    <div class="paginasi mt-3" v-if="kataKunci.length >= 3">
      <h3 class="text-white text-center mt-3" v-if="error">{{ error }}</h3>
      <div class="hasil mt-3" v-if="data != '' ">
        <div class="hasil mt-3">
          <ul>
            <h3 class="text-white text-center">Result : {{ total }}</h3>
            <li v-for="(list,index) in data " :key="index" class="mt-3">
              <span class="text-center" v-html="list.text"></span>
              <a class="pl-1" :href="`${url}&t=${list.start}`" target="_blank">See video</a>
            </li>
          </ul>
        </div>
        <div class="btn-paginasi mt-3">
          <button class="btn-success" @click="navigasi('first')">First</button>
          <button class="btn-success" @click="navigasi('next')" :disabled="!paginasi.next">Next</button>
          <h5 class="d-inline text-white px-2">{{ paginasi.page }}</h5>
          <button class="btn-success" @click="navigasi('prev')" :disabled="!paginasi.prev">Prev</button>
          <button class="btn-success" @click="navigasi('last')">Last</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";
import axios from "axios";
export default {
  name: "search",
  data() {
    return {
      kataKunci: "",
      url: "",
      submit: false,
      loading: false,
      error: null,
      paginasi: {
        first: null,
        last: null,
        page: 0,
        next: null,
        prev: null,
        total: 0,
      },
      data: [],
    };
  },
  watch: {
    kataKunci: debounce(async function checkKeySearch(newValue) {
      if (newValue.length >= 3) {
        await this.cari(newValue, this.url);
      } else {
        this.bersihkanPaginasi();
      }
    }, 250),
    url() {
      this.submit = false;
      this.kataKunci = "";
      this.bersihkanPaginasi();
    },
  },
  methods: {
    async cari(keySearch, url, paginasi) {
      try {
        this.loading = true;

        // Buat Request
        const {
          data: { data, first, last, next, page, prev, total },
        } = await axios.get(
          paginasi
            ? paginasi
            : `https://cari-teks-video-api.vercel.app/api/search?q=${keySearch}&url=${encodeURIComponent(
                url
              )}`
        );

        // Hapus request
        this.loading = false;
        if (data == "") {
          this.bersihkanPaginasi();
          return (this.error = "No result found ");
        } else if (data == null) {
          return (this.error = "Sorry... Can't Search word on this URL ");
        } else {
          this.data = data;
          this.error = null;
        }
        //
        this.paginasi.next = next;
        this.paginasi.prev = prev;
        this.paginasi.page = page;
        this.paginasi.first = first;
        this.paginasi.last = last;
        this.total = total;
      } catch (error) {
        console.error(error);
      }
    },
    navigasi(type) {
      if (!this.paginasi[type]) {
        return console.log("error");
      } else {
        this.cari(this.kataKunci, this.url, this.paginasi[type]);
      }
    },
    submitClick() {
      if (this.url.length == 0) {
        return;
      }
      this.submit = !this.submit;
    },
    bersihkanPaginasi() {
      this.paginasi.next = null;
      this.paginasi.prev = null;
      this.paginasi.page = 0;
      this.paginasi.first = null;
      this.paginasi.last = null;
      this.total = 0;
      this.data = [];
      this.error = null;
    },
  },
};
</script>

<style  scoped>
#search {
  background-color: rgb(224, 73, 73);
  padding: 2.4rem;
  box-shadow: 1px 1px 10px gray;
}

li {
  padding: 1rem;
  background-color: rgb(43, 128, 255);
  list-style-type: none;
  box-shadow: 2px 2px 8px rgb(104, 104, 104);
  border-radius: 1rem;
}

a {
  color: white;
}

a:hover {
  color: black;
}
</style>
