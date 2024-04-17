<template>
    <NavbarEdit />

    <div class="card">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <h5><i class="bi bi-building"></i> Departamentos</h5> 
                <button class="btn btn-primary" @click="resetForm()" data-bs-toggle="modal" data-bs-target="#nuevoDepart">+
                    Nuevo</button>    
            </div>
        </nav>
        <div class="card-body">
            <br>
            <div class="row">
                <div class="card" style="width: 15rem;" v-for="dep in departments" :key="dep.id">
                    <div class="card-body">
                        <small class="card-title"><strong><i class="bi bi-building"></i> {{ dep.department
                                }}</strong></small><br><br>
                        <a href="#" class="btn btn-secondary btn-sm" @click="deleteDepartment(dep.id)"><i class="bi bi-trash"></i></a>
                        <a href="#" class="btn btn-primary btn-sm" @click="selecDepartment(dep.id)" data-bs-toggle="modal"
                            data-bs-target="#editDepart"><i class="bi bi-pencil-square"></i></a>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Modal nuevo depart-->
    <div class="modal fade" id="nuevoDepart" tabindex="-1" aria-labelledby="nuevoDepart" aria-hidden="true">
        <div class="modal-dialog modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="text-center">Nuevo Departamento</h5>
                </div>
                <div class="modal-body">
                    <input type="text" v-model="deptxt.department" class="form-control">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="createDepartment()"
                        data-bs-dismiss="modal">Crear</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal editar depart-->
    <div class="modal fade" id="editDepart" tabindex="-1" aria-labelledby="editDepart" aria-hidden="true">
        <div class="modal-dialog modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="text-center">Editar Departamento</h5>
                </div>
                <div class="modal-body">
                    <input type="text" v-model="deptxt.department" class="form-control">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="updateDepartment()"
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
const departments = ref([])
const deptxt = ref({ id: '', department: '' })

const departmentsList = async () => {
    const res = await axios.get(url + 'api/departments')
    departments.value = res.data
}

const createDepartment = async () => {
    try {
        const res = await axios.post(url + 'api/departments', deptxt.value)
        departmentsList()
    } catch (err) {
        alert('Algo salió mal, el departmento ya existe ' + err)
    }
}

const selecDepartment = async (id) => {
    try {
        const res = await axios.get(url + 'api/departments/' + id)
        deptxt.value.id = res.data.id
        deptxt.value.department = res.data.department             
    } catch (err) {
        alert(err)
    }
}

const updateDepartment = async () => {
    try {
        const res = await axios.put(url + 'api/departments/' + deptxt.value.id, deptxt.value)
        departmentsList()
    } catch (err) {
        alert('Algo salió mal, el departmento ya existe ' + err)
    }
}

const deleteDepartment = async (id) => {
    let confirmac = confirm('Eliminar este departmento?');
    if (confirmac) {
        const res = await axios.delete(url + 'api/departments/' + id);
        departmentsList()
    }
}

const resetForm = () =>{
    deptxt.value.department = ''
}

onMounted(() => {
    departmentsList()
})

</script>