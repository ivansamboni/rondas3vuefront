<template>
  <br />
  <v-container>
    <!--modal abir avance-->
    <v-btn @click="dialogsave = true"
      ><i class="bi bi-floppy"></i> Guardar avance</v-btn
    >

    <v-dialog v-model="dialogsave" width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        title="Guardar progreso"
      >
        <v-text-field
          label="Nombre del avance"
          v-model="frmSend.nameaudit"
        ></v-text-field>

        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="cancelar"
            @click="dialogsave = false"
          ></v-btn>
          <v-btn @click="saveAudit(), (dialogsave = false)" color="success"
            >Guardar</v-btn
          >
        </template>
      </v-card>
    </v-dialog>

    <!--modal abir avance-->
    <v-btn @click="dialogopen = true"
      ><i class="bi bi-file-earmark-arrow-down"></i> Abrir avance</v-btn
    >

    <v-dialog v-model="dialogopen" width="600">
      <v-card max-width="auto" title="Avances">
        <v-container>
          <v-row justify="center">
            <v-col cols="9" sm="4" v-for="aud in listAudits" :key="aud.id">
              <!-- Tarjetas generadas con v-for -->
              <v-card
                @click="selectAudit(aud.id), (dialogopen = false)"
                elevation="5"
                class="mb-2"
              >
                <v-card-title :title="aud.nameaudit">{{
                  aud.nameaudit
                }}</v-card-title>
                <v-card-actions>
                  <v-btn @click="deleteAudit(aud.id)" color="error" text>
                    <i class="bi bi-trash"></i>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="cancelar"
            @click="dialogopen = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>

    <br /><br />

    <v-autocomplete
      v-model="frmSend.form_id"
      :items="listForms"
      item-title="form"
      item-value="id"
      label="Formulario"
      @update:modelValue="selecForm()"
    >
      <template v-slot:item="{ props }">
        <v-list-item v-bind="props"></v-list-item>
      </template>
    </v-autocomplete>

    <v-autocomplete
      v-model="frmSend.department_id"
      :items="listDepartments"
      item-title="department"
      item-value="id"
      label="Departamento"
    >
      <template v-slot:item="{ props }">
        <v-list-item v-bind="props"></v-list-item>
      </template>
    </v-autocomplete>

    <v-autocomplete
      v-model="frmSend.profession_id"
      :items="listProfessions"
      item-title="profession"
      item-value="id"
      label="Profesion"
    >
      <template v-slot:item="{ props }">
        <v-list-item v-bind="props"></v-list-item>
      </template>
    </v-autocomplete>

    <hr />
    <v-alert        
    type="primary"
    variant="tonal"
  ></v-alert>
    <br />
    <h3>{{ resp }}</h3>

    <div v-for="(ite, index) in items" :key="index">
      <h4>
        <strong>{{ ite.item }}</strong>
      </h4>
      <v-select
        label="Seleccione"
        v-model="frmSend.selected[index]"
        :items="['N/A', 'C', 'NC']"
      >
      </v-select>

      <hr />
    </div>

    <v-textarea v-model="frmSend.observation" label="Observación"></v-textarea>

    <br /><br />
    <v-btn
      block
      color="success"
      v-if="
        frmSend.item_id.length == frmSend.selected.length &&
        frmSend.form_id !== '' &&
        frmSend.department_id !== '' &&
        frmSend.profession_id !== ''
      "
      class="btn btn-primary form-control"
      @click="sendForm"
    >
      Enviar
    </v-btn>
  </v-container>
  <br />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const url = "http://127.0.0.1:8000/";
const listForms = ref([]);
const listDepartments = ref([]);
const listProfessions = ref([]);
const items = ref([]);
const listAudits = ref([]);
const frmSend = ref({
  nameaudit: "",
  form_id: "",
  department_id: "",
  profession_id: "",
  item_id: [],
  selected: [],
  user_id: 1,
  observation: "",
});
const resp = ref("");
const dialogsave = ref(false);
const dialogopen = ref(false);

const datacolleccions = async () => {
  const res = await axios.get(url + "api/dataaudit");
  listForms.value = res.data.forms;
  listDepartments.value = res.data.departments;
  listProfessions.value = res.data.professions;
};
const selecForm = async () => {
  try {
    const res = await axios.get(url + "api/forms/" + frmSend.value.form_id);
    items.value = res.data.items;
    frmSend.value.item_id = items.value.map((items) => items.id);
  } catch (err) {}
};

const sendForm = async () => {
  let confirmac = confirm("¿Enviar formulario?");
  if (confirmac) {
    try {
      const res = await axios.post(url + "api/dataaudit", frmSend.value);
      axios.post(url + "api/observation", frmSend.value);
      router.push("/home");
    } catch (err) {
      alert("Algo salió mal" + err);
    }
  }
};
const dataAudits = async () => {
  const res = await axios.get(url + "api/auditorias");
  listAudits.value = res.data;
};

const saveAudit = async () => {
  try {
    const res = await axios.post(url + "api/auditorias", frmSend.value);
    alert("Se guardó el avance con éxito");
    frmSend.value.nameaudit = "";
    dataAudits();
  } catch (err) {
    alert("La auditoria ya existe");
  }
};
const selectAudit = async (id) => {
  try {
    const res = await axios.get(url + "api/auditorias/" + id);
    frmSend.value.form_id = res.data.form_id;
    frmSend.value.department_id = res.data.department_id;
    frmSend.value.profession_id = res.data.profession_id;
    frmSend.value.selected = res.data.selected;
    frmSend.value.observation = res.data.observation;
    selecForm();
  } catch (err) {}
};

const deleteAudit = async (id) => {
  let confirmac = confirm("Eliminar este avance?");
  if (confirmac) {
    const res = await axios.delete(url + "api/auditorias/" + id);
    dataAudits();
  }
};

onMounted(() => {
  datacolleccions(), dataAudits();
});
</script>