<template>
    <NavbarEdit />
    <br>

    <div class="row">

        <div class="overflow-auto p-10 bg-light" style="max-width: 300px; max-height: 500px;">
            <div class="list-group">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createForm" @click="resetForm">+
                    Nuevo Formulario</button>
                <tr v-for="frm in forms" :key="frm.id">
                    <a class="list-group-item list-group-item-action" href="#" @click="selecForm(frm.id)"><i
                            class="bi bi-journal-text"></i> {{ frm.form
                        }}</a>
                </tr>

            </div>
        </div>

        <!-- Modal nuevo form-->
        <div class="modal fade" id="createForm" tabindex="-1" aria-labelledby="createForm" aria-hidden="true">
            <div class="modal-dialog modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-center">Nuevo Formulario</h5>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="formtxt.form" class="form-control">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="createForm()">Crear</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal editar item-->
        <div class="modal fade" id="updateitemmodal" tabindex="-1" aria-labelledby="updateitemmodal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-center">Editar Item</h5>
                    </div>
                    <div class="modal-body">
                        <textarea class="form-control" rows="4" v-model="itemtxt.item"></textarea>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            @click="resetItem()">Cancelar</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="updateItem()">Actualizar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-8">
            <div class="card" v-show="cardForm">

                <div class="card-body">

                    <div class="container text-center" v-show="updateTitle">

                        <h5><strong>{{ formtxt.form }}</strong></h5>
                        &nbsp;
                        <button class="btn btn-primary btn-sm" @click="editTitle = true, updateTitle = false"
                            title="Editar">
                            <i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-primary btn-sm" title="Eliminar" @click="deleteForm()">
                            <i class="bi bi-trash"></i></button>

                    </div>
                    <div class="input-group" v-show="editTitle">
                        <input type="text" v-model="formtxt.form" class="form-control">&nbsp;
                        <button class="btn btn-secondary " @click="resetForm(), editTitle = false, updateTitle = true"
                            title="Cancelar"><i class="bi bi-x-lg"></i></button>
                        <button class="btn btn-success " @click="updateForm(), editTitle = false, updateTitle = true"
                            title="Actualizar"><i class="bi bi-check2-circle"></i></button>
                    </div>
                    <br><br><br>
                    <div class="input-group">
                        <textarea class="form-control" rows="2" v-model="itemtxt.item"></textarea> &nbsp;
                        <button class="btn btn-success btn-sm" @click="createItem()">Agregar</button>
                    </div>
                    <br>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Items - <span class="text-primary">{{ totalItem }}</span> </th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="ite in items" :key="ite.id">
                                <td>
                                    <h7>{{ ite.item }}</h7>
                                </td>
                                <td><button class="btn btn-primary btn-sm" @click="selecItem(ite.id)" title="Editar"
                                        data-bs-toggle="modal" data-bs-target="#updateitemmodal">
                                        <i class="bi bi-pencil-square"></i></button>
                                </td>
                                <td><button class="btn btn-primary btn-sm" @click="deleteItem(ite.id)" title="Eliminar">
                                        <i class="bi bi-trash"></i></button></td>
                            </tr>
                        </tbody>
                    </table>
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
const forms = ref([])
const items = ref([])
const totalItem = ref('')
const formtxt = ref({ id: '', form: '' })
const itemtxt = ref({ id: '', form_id: '', form: '', item: '' })
const updateTitle = ref(true)
const editTitle = ref(false)
const cardForm = ref(false)

//-crud formularios

const createForm = async () => {
    try {
        const res = await axios.post(url + 'api/forms', formtxt.value)
        formList()
    } catch (err) {
        alert('Algo salió mal, el formulario ya existe ' + err)
    }
}

const formList = async () => {
    const res = await axios.get(url + 'api/forms')
    forms.value = res.data
}

const selecForm = async (id) => {
    try {
        const res = await axios.get(url + 'api/forms/' + id)
        cardForm.value = true
        formtxt.value.form = res.data.form
        formtxt.value.id = res.data.id
        items.value = res.data.items
        itemtxt.value.form = res.data.form
        itemtxt.value.form_id = res.data.id
        totalItem.value = res.data.items.length

    } catch (err) {
        alert(err)
    }
}

const updateForm = async () => {
    try {
        const res = await axios.put(url + 'api/forms/' + formtxt.value.id, formtxt.value)
        formList()
    } catch (err) {
        alert('Algo salió mal, el formulario ya existe ' + err)
    }
}

const deleteForm = async () => {
    let confirmac = confirm('Eliminar esta formulario? se eliminarán todos sus items');
    if (confirmac) {
        const res = await axios.delete(url + 'api/forms/' + formtxt.value.id);
        cardForm.value = false
        formList()
    }
}

const resetForm = () => {
    cardForm.value = false
    formtxt.value.form = ''
    formtxt.value.id = ''
}

const resetItem = () => {
    itemtxt.value.item = ''
}
//-------------crud items

const createItem = async () => {
    try {
        const res = await axios.post(url + 'api/items', itemtxt.value)
        selecForm(formtxt.value.id)
        itemtxt.value.item = ''
    } catch (err) {
        alert('Algo salió mal, el item ya existe ' + err)
    }
}

const selecItem = async (id) => {
    try {
        const res = await axios.get(url + 'api/items/' + id)
        itemtxt.value.id = res.data.id
        itemtxt.value.item = res.data.item
    } catch (err) {
        alert(err)
    }
}

const updateItem = async () => {
    try {
        const res = await axios.put(url + 'api/items/' + itemtxt.value.id, itemtxt.value)
        selecForm(formtxt.value.id)
        itemtxt.value.item = ''
    } catch (err) {
        alert('Algo salió mal, el item ya existe ' + err)
    }
}

const deleteItem = async (id) => {
    let confirmac = confirm('Eliminar este item?');
    if (confirmac) {
        const res = await axios.delete(url + 'api/items/' + id);
        selecForm(formtxt.value.id)

    }
}

onMounted(() => {
    formList()
})

</script>