<template>
  <div class="hello">
    Home works
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  props: {
    msg: String
  },
  methods: {
    getPages() {
      axios.get(`${process.env.VUE_APP_API_BASE_URL}/pages`).then( res=> {
        console.log( res )
      } ).catch( err => {
        console.log( "Err", err )
      } )
    }
  },
  mounted() {
    this.getPages();
  }
}
</script>
