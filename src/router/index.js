import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/login/LoginView.vue";
import RegisterView from "@/views/register/RegisterView.vue";
import WithNav from "@/components/WithNav.vue";
import WithNavSide from "@/components/WithNavSide.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import ProfilView from "@/views/profil/ProfilView.vue";
import BuatView from "@/views/soal/buat/BuatView.vue";
import EditView from "@/views/soal/edit/EditView.vue";
import HapusView from "@/views/soal/hapus/HapusView.vue";
import EditProfileView from "@/views/profil/edit/EditProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: WithNav,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
      ],
    },
    {
      path: "/tutor",
      name: "tutor",
      component: WithNavSide,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: DashboardView,
        },
        {
          path: "buatsoal",
          name: "buat-soal",
          component: BuatView,
        },
        {
          path: "editsoal",
          name: "edit-soal",
          component: EditView,
        },
        {
          path: "hapussoal",
          name: "hapus-soal",
          component: HapusView,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/tutor/profil",
      component: WithNavSide,
      children: [
        {
          path: "",
          name: "profil",
          component: ProfilView,
        },
        {
          path: "edit",
          name: "edit-profil",
          component: EditProfileView,
        },
      ],
    },
  ],
});

export default router;
