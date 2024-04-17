<template>

    <table class="table">
        <thead>
            <tr>
                <th>Formulario</th>
                <th>Cumplimiento</th>
                <th>Cumplen</th>
                <th>Nocumplen</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="res in formsdata" :key="res.form_id">
                <td>{{ res.form }}</td>
                <td>{{ res.promedio }}</td>
                <td>{{ res.cumplen }}</td>
                <td>{{ res.no_cumplen }}</td>

            </tr>
        </tbody>
    </table>
    <hr>
    <table class="table">
        <thead>
            <tr>
                <th>Departamento</th>
                <th>Cumplimiento</th>
                <th>Cumplen</th>
                <th>Nocumplen</th>

            </tr>
        </thead>
        <tbody>
            <tr v-for="dep in departmentsdata" :key="dep.department_id">
                <td>{{ dep.department }}</td>
                <td>{{ dep.promedio }}</td>
                <td>{{ dep.cumplen }}</td>
                <td>{{ dep.no_cumplen }}</td>

            </tr>
        </tbody>
    </table>
    <hr>
    <table class="table">
        <thead>
            <tr>
                <th>Profesion</th>
                <th>Cumplimiento</th>
                <th>Cumplen</th>
                <th>Nocumplen</th>

            </tr>
        </thead>
        <tbody>
            <tr v-for="pro in professionsdata" :key="pro.profession_id">
                <td>{{ pro.profession }}</td>
                <td>{{ pro.promedio }}</td>
                <td>{{ pro.cumplen }}</td>
                <td>{{ pro.no_cumplen }}</td>

            </tr>
        </tbody>
    </table>



</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const url = 'http://127.0.0.1:8000/'

const formsdata = ref([])
const professionsdata = ref([])
const departmentsdata = ref([])



const resultsList = async () => {
    const res = await axios.get(url + 'api/pruebas')
    formsdata.value = res.data.formsdata
    professionsdata.value = res.data.professionsdata
    departmentsdata.value = res.data.departmentsdata
}

onMounted(() => {
    resultsList()
})

</script>