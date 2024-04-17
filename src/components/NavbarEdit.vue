<template>
  <nav class="navbar bg-primary navbar-expand-lg bg-body-tertiary ">

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/editar" class="nav-link" aria-current="page"><i class="bi bi-journal-text"></i>
          Formularios</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/departamentos" class="nav-link" aria-current="page"><i class="bi bi-building"></i>
          Departamentos</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/cargos" class="nav-link" aria-current="page"><i class="bi bi-person-vcard"></i>
          Cargos</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/usuarios" class="nav-link" aria-current="page"><i class="bi bi-person-fill-lock"></i>
          Usuarios</router-link>
      </li>

    </ul>
  </nav>

</template>
