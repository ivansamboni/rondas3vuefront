<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink to="/inicio" class="nav-link">Inicio</RouterLink>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/auditar">Auditar</router-link>
        </li>       
        <li class="nav-item">
          <RouterLink to="/editar" class="nav-link">Editar</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>
        </li>                
      </ul>      
    </div>
  </div>
</nav>
          
   <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>
