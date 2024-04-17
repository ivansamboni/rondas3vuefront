import { createRouter, createWebHistory } from "vue-router";
import Editar from "../views/ediciones/Editar.vue";
import Departamentos from "../views/ediciones/Departamentos.vue";
import Cargos from "../views/ediciones/Cargos.vue";
import Usuarios from "../views/ediciones/Usuarios.vue";
import Auditar from "../views/auditoria/Auditar.vue";
import Dashboard from "../views/auditoria/Dashboard.vue";
import Inicio from "../views/auditoria/Inicio.vue";

const routes = [
  {
    path: "/inicio",
    name: "inicio",
    component: Inicio,
  },
  {
    path: "/editar",
    name: "editar",
    component: Editar,
  },
  {
    path: "/departamentos",
    name: "departamentos",
    component: Departamentos,
  },
  {
    path: "/cargos",
    name: "cargos",
    component: Cargos,
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: Usuarios,
  },
  {
    path: "/auditar",
    name: "auditar",
    component: Auditar,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
