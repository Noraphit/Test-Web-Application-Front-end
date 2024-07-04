<template>
  <main>
    <div class="container">
      <v-card class="card">
        <div class="card-header">
          <h1 class="Header">Edit User</h1>
        </div>

        <div class="card-body">
          <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
            <li v-for="(error, index) in this.errorList" :key="index">
              {{ error[0] }}
            </li>
          </ul>

          <div class="">
            <v-text-field
              color="primary"
              label="ID"
              variant="underlined"
              v-model="model.products.id"
            ></v-text-field>
          </div>

          <div class="">
            <v-text-field
              color="primary"
              label="Name"
              variant="underlined"
              v-model="model.products.name"
            ></v-text-field>
          </div>

          <div class="">
            <v-text-field
              color="primary"
              label="Phone"
              variant="underlined"
              v-model="model.products.phone"
            ></v-text-field>
          </div>

          <div class="">
            <v-text-field
              color="primary"
              label="Email"
              variant="underlined"
              v-model="model.products.email"
            ></v-text-field>
          </div>

          <div class="footerBtn">
            <div>
              <v-btn variant="tonal" class="bg-green rounded-lg" @click="updateUser">Update</v-btn>
            </div>
            <div class="cancelBtn">
              <RouterLink to="/"
                ><v-btn variant="tonal" class="bg-red rounded-lg">Cancel</v-btn></RouterLink
              >
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </main>
</template>

<script>
import axios from "axios"

export default {
  name: "UserEdit.vue",
  data() {
    return {
      productsID: "",
      errorList: "",
      model: {
        products: {
          id: "",
          name: "",
          phone: "",
          email: ""
        }
      }
    }
  },
  mounted() {
    this.productsID = this.$route.params.id
    this.getUserData(this.$route.params.id)
  },
  methods: {
    getUserData(productsID) {
      axios
        .get(`http://localhost:9000/products/${productsID}`)
        .then((res) => {
          this.products = res.data
          console.log(this.products)
          this.model.products = this.products
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 404) {
              alert(error.response.data.message)
            }
          }
        })
    },
    updateUser() {
      var mythis = this
      axios
        .put(`http://localhost:9000/products/${this.productsID}`, this.model.products)
        .then((res) => {
          console.log(res.data)
          alert(res.data.message)
          this.errorList = ""
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 422) {
              mythis.errorList = error.response.data.errors
            }
            if (error.response.status == 404) {
              alert(error.response.data.message)
            }
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log("Error", error.message)
          }
        })
    }
  }
}
</script>

<style scoped src="../assets/styles/UserEdit.css"></style>
