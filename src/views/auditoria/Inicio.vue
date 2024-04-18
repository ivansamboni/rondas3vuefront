<template>

<h3>inicio</h3>


<v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
        v-for="n in 14"
        :key="n"
      >
        <v-card>
          <v-card-title>
            Card {{ n }}
          </v-card-title>
          <v-card-text>
            Este es el contenido de la Card número {{ n }}.
          </v-card-text>
          <v-card-actions>
            <v-btn  color="deep-purple accent-4">Acción 1</v-btn>
            <v-btn  color="deep-purple accent-4">Acción 2</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>