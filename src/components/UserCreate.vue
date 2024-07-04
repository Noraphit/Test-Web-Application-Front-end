<template>
  <main>
    <div class="container">
      <v-card class="card">
        <div class="card-header">
          <h1 class="Header">Create User</h1>
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
              hint="Enter your ID to create user"
              :rules="[rules.required]"
            ></v-text-field>
          </div>

          <div class="">
            <v-text-field
              color="primary"
              label="Name"
              variant="underlined"
              v-model="model.products.name"
              hint="Enter your name to create user"
              :rules="[rules.required]"
            ></v-text-field>
          </div>

          <div class="">
            <v-text-field
              color="primary"
              label="Phone"
              variant="underlined"
              v-model="model.products.phone"
              hint="Enter your phone number to create user"
              :rules="[rules.required]"
            ></v-text-field>
          </div>

          <div class="">
            <v-text-field
              color="primary"
              label="Email"
              variant="underlined"
              v-model="model.products.email"
              hint="Enter your email to create user"
              :rules="[rules.required]"
            ></v-text-field>
          </div>

          <v-checkbox
            v-model="terms"
            color="secondary"
            label="Conform and agree to create the user"
          ></v-checkbox>

          <div class="footerBtn">
            <div>
              <v-btn variant="tonal" class="bg-green rounded-lg" @click="saveUser">Create</v-btn>
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
  name: "UserCreate.vue",
  data() {
    return {
      errorList: "",
      rules: {
        required: (value) => !!value || "Field is required"
      },
      terms: false,
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
  methods: {
    saveUser() {
      var mythis = this
      axios
        .post("http://localhost:9000/products", this.model.products)
        .then((res) => {
          console.log(res.data)
          alert(res.data.message)

          this.model.products = {
            id: "",
            name: "",
            phone: "",
            email: ""
          }
          this.errorList = ""
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 422) {
              mythis.errorList = error.response.data.errors
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

<style scoped src="../assets/styles/UserCreate.css"></style>
