<template>

    <div class="card">
        <div class="card-body">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#guardar">Guardar</button>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#abrir">Abrir</button>
            <!--modal guardar avance-->
            <div class="modal fade" id="guardar" tabindex="-1" aria-labelledby="guardarmodalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Guardar Avance</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" v-model="frmSend.nameaudit" class="form-control"
                                placeholder="Nombre del avance">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                @click="saveAudit()">Guardar</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <!--modal guardar avance-->
            <div class="modal fade" id="abrir" tabindex="-1" aria-labelledby="abrirodalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Abrir Avance</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">                            
                            <button class="btn btn-secondary" v-for="aud in listAudits" :key="aud.id"
                             @click="selectAudit(aud.id)" data-bs-dismiss="modal">{{aud.nameaudit}}</button>
                        </div>
                        
                    </div>
                    
                </div>
            </div>

            <div class="mb-3">
                <label for="" class="form-label">Formulario:</label>
                <select class="form-select" v-model="frmSend.form_id" @change="selecForm()">
                    <option :value="(frm.id)" v-for="frm in listForms" :key="frm.id">{{ frm.form }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="" class="form-label">Departamento:</label>
                <select class="form-select" v-model="frmSend.department_id">
                    <option :value="(dep.id)" v-for="dep in listDepartments" :key="dep.id">{{ dep.department }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="" class="form-label">Profesion:</label>
                <select class="form-select" v-model="frmSend.profession_id">
                    <option :value="(pro.id)" v-for="pro in listProfessions" :key="pro.id">{{ pro.profession }}</option>
                </select>
            </div>
            <hr>
            <br>
            <h3>{{ resp }}</h3>

            <div v-for="(ite, index) in items" :key="index">
                <div class="alert alert-light" role="alert">
                    <h6><strong>{{ ite.item }}</strong></h6>
                    <select class="form-control" v-model="frmSend.selected[index]">
                        <option>N/A</option>
                        <option style="color:green;">C</option>
                        <option style="color:red;">NC</option>
                    </select>
                </div>

                <hr>
            </div>

            <div class="form-group">
                <label for="">Observasión</label>
                <textarea class="form-control" v-model="frmSend.observation" rows="3"></textarea>
            </div><br><br>
            <button v-if="frmSend.item_id.length == frmSend.selected.length && frmSend.form_id !== ''
                                && frmSend.department_id !== '' && frmSend.profession_id !== ''"
                class="btn btn-primary form-control" @click="sendForm">Enviar</button>
        </div>
    </div>
    <br>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const url = 'http://127.0.0.1:8000/'
const listForms = ref([])
const listDepartments = ref([])
const listProfessions = ref([])
const items = ref([])
const listAudits = ref([])
const frmSend = ref({ nameaudit: '', form_id: '', department_id: '', profession_id: '', item_id: [], selected: [], user_id: 1, observation: '' })
const resp = ref('')

const datacolleccions = async () => {
    const res = await axios.get(url + 'api/dataaudit')
    listForms.value = res.data.forms
    listDepartments.value = res.data.departments
    listProfessions.value = res.data.professions
}
const selecForm = async () => {
    try {
        const res = await axios.get(url + 'api/forms/' + frmSend.value.form_id)
        items.value = res.data.items
        frmSend.value.item_id = items.value.map(items => items.id);
    } catch (err) {
    }
}

const sendForm = async () => {
    let confirmac = confirm('¿Enviar formulario?');
    if (confirmac) {
        try {
            const res = await axios.post(url + 'api/dataaudit', frmSend.value)
            axios.post(url + 'api/observation', frmSend.value)
            router.push('/home')
            }
        catch (err) {
            alert('Algo salió mal' + err)
        }
    }
}
const dataAudits = async () => {
    const res = await axios.get(url + 'api/auditorias')
    listAudits.value = res.data
}

const saveAudit = async () => {
    try {
        const res = await axios.post(url + 'api/auditorias', frmSend.value)
        alert('Se guardó el avance con éxito')
        frmSend.value.nameaudit = ''
    }
    catch (err) {
        alert('La auditoria ya existe')
    }

}
const selectAudit = async (id) => {
    try {
        const res = await axios.get(url + 'api/auditorias/' + id)
        frmSend.value.form_id = res.data.form_id
        frmSend.value.department_id = res.data.department_id
        frmSend.value.profession_id = res.data.profession_id       
        frmSend.value.selected = res.data.selected        
        frmSend.value.observation = res.data.observation
        selecForm()
    } catch (err) {
    }
}

onMounted(() => {
    datacolleccions(), dataAudits()
})

</script>