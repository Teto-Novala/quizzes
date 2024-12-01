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
import DeleteProfilView from "@/views/profil/delete/DeleteProfilView.vue";
import ListSoalView from "@/views/soal/edit/soal-model/ListSoalView.vue";
import IdEditSoalView from "@/views/soal/edit/id/IdEditSoalView.vue";
import ListHapusSoalModelView from "@/views/soal/hapus/soal-model/ListHapusSoalModelView.vue";
import IdHapusSoalView from "@/views/soal/hapus/id/IdHapusSoalView.vue";

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
        {
          path: "hapus",
          name: "hapus-profil",
          component: DeleteProfilView,
        },
      ],
    },
    {
      path: "/tutor/editsoal/model",
      component: WithNavSide,
      children: [
        {
          path: ":no",
          name: "list-soal",
          component: ListSoalView,
        },
        {
          path: ":no/soal/:nosoal/:id",
          name: "edit-soal-id",
          component: IdEditSoalView,
        },
      ],
    },
    {
      path: "/tutor/hapussoal/model",
      component: WithNavSide,
      children: [
        {
          path: ":no",
          name: "hapus-list-soal",
          component: ListHapusSoalModelView,
        },
        {
          path: ":no/soal/:nosoal/:id",
          name: "hapus-soal-id",
          component: IdHapusSoalView,
        },
      ],
    },
  ],
});

export default router;
