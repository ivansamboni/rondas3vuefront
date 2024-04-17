<template>
    <NavbarEdit />

    <div class="card">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <h5><i class="bi bi-person-vcard"></i> Cargos - Profesiones</h5> 
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nuevocargo" @click="resetForm()">+
                Nuevo</button>  
            </div>
        </nav>
        <div class="card-body">            
            <div class="row">
                <div class="card" style="width: 15rem;" v-for="prof in professions" :key="prof.id">
                    <div class="card-body">
                        <small class="card-title"><strong><i class="bi bi-person-vcard"></i> {{ prof.profession}}</strong></small><br><br>
                        <a href="#" class="btn btn-secondary btn-sm" @click="deleteProfession(prof.id)"><i
                                class="bi bi-trash"></i></a>
                        <a href="#" class="btn btn-primary btn-sm" @click="selecProfession(prof.id)"
                            data-bs-toggle="modal" data-bs-target="#editProfess"><i class="bi bi-pencil-square"></i></a>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Modal nuevo profes-->
    <div class="modal fade" id="nuevocargo" tabindex="-1" aria-labelledby="nuevocargo" aria-hidden="true">
        <div class="modal-dialog modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="text-center">Nuevo Cargo</h5>
                </div>
                <div class="modal-body">
                    <input type="text" v-model="proftxt.profession" class="form-control">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="createProfession()"
                        data-bs-dismiss="modal">Crear</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal editar profes-->
    <div class="modal fade" id="editProfess" tabindex="-1" aria-labelledby="editProfess" aria-hidden="true">
        <div class="modal-dialog modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="text-center">Editar Departamento</h5>
                </div>
                <div class="modal-body">
                    <input type="text" v-model="proftxt.profession" class="form-control">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="updateProfession()"
                        data-bs-dismiss="modal">Editar</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import { onMounted, ref } from 'vue'
import NavbarEdit from '../../components/NavbarEdit.vue'
import axios from 'axios'

const url = 'http://127.0.0.1:8000/'
const professions = ref([])
const proftxt = ref({ id: '', profession: '' })

const professionsList = async () => {
    const res = await axios.get(url + 'api/professions')
    professions.value = res.data
}

const createProfession = async () => {
    try {
        const res = await axios.post(url + 'api/professions', proftxt.value)
        professionsList()
    } catch (err) {
        alert('Algo salió mal, profesión ya existe ' + err)
    }
}

const selecProfession = async (id) => {
    try {
        const res = await axios.get(url + 'api/professions/' + id)
        proftxt.value.id = res.data.id
        proftxt.value.profession = res.data.profession
    } catch (err) {
        alert(err)
    }
}

const updateProfession = async () => {
    try {
        const res = await axios.put(url + 'api/professions/' + proftxt.value.id, proftxt.value)
        departmentsList()
    } catch (err) {
        alert('Algo salió mal, profesión ya existe ' + err)
    }
}

const deleteProfession = async (id) => {
    let confirmac = confirm('Eliminar esta profesión?');
    if (confirmac) {
        const res = await axios.delete(url + 'api/professions/' + id);
        professionsList()
    }
}

const resetForm = () =>{
    proftxt.value.profession = ''
}

onMounted(() => {
    professionsList()
})

</script>