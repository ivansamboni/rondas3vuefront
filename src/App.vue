<template>

<v-app>
    <v-app-bar app fixed color="primary">
      <v-toolbar-title>Rondas App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/inicio">Inicio</v-btn>
      <v-btn text to="/auditar">Auditar</v-btn>
      <v-btn text to="/editar">Editar</v-btn>
      <v-btn text to="/dashboard">Dashboard</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>
