import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  const user = useLocalStorage("user", {})

  async function login(id) {
    const response = await fetch("http://localhost:9000/products" + id)
    const result = await response.json()
    user.value = result.user
  }

  return { user }
})