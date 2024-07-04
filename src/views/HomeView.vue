<template>
  <main>
    <div class="container">
      <h1 class="Header">User Management</h1>

      <div class="btnAdd">
        <RouterLink to="/create"
          ><v-btn variant="tonal" class="bg-green rounded-lg">Create User</v-btn></RouterLink
        >
      </div>

      <div class="card py-4">
        <v-card>
          <v-table>
            <thead>
              <tr>
                <th class="topic">ID</th>
                <th class="topic">Name</th>
                <th class="topic">Phone</th>
                <th class="topic">Email</th>
                <th class="topic">Function</th>
              </tr>
            </thead>
            <tbody v-if="this.products.length > 0">
              <tr v-for="(products, index) in this.products" :key="index">
                <td>{{ products.id }}</td>
                <td>{{ products.name }}</td>
                <td>{{ products.phone }}</td>
                <td>{{ products.email }}</td>
                <td>
                  <RouterLink :to="{ path: +products.id + '/edit' }"
                    ><v-icon icon="mdi-pencil" class="editIcon"></v-icon
                  ></RouterLink>
                  <v-icon
                    icon="mdi-delete-outline"
                    class="deleteIcon"
                    @click="deleteUser(products.id)"
                  ></v-icon>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5">Loading...</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios"

export default {
  name: "HomeView.vue",
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      axios.get("http://localhost:9000/products").then((res) => {
        this.products = res.data
        // console.log(this.products)
      })
    },
    deleteUser(productsID) {
      if (confirm("Are you sure, you want to delete this user?")) {
        axios
          .delete(`http://localhost:9000/products/${productsID}`)
          .then((res) => {
            alert(res.data.message)
            this.getProducts()
          })
          .catch(function (error) {
            if (error.response) {
              if (error.response.status == 404) {
                alert(error.response.data.message)
              }
            }
          })
        // console.log(productsID)
      }
    }
  }
}
</script>

<style scoped src="../assets/styles/Home.css"></style>
