<template>
  <nav-bar></nav-bar>
  <div class="container">
    <div class="mt-3 mx-auto w-75 d-flex justify-content-end">
      <Button class="control-category-create__button" label="Создать категорию"
              style="background: #212529; border: none;" @click="openCategoryCreateModal"/>
    </div>
    <div class="mt-3 mx-auto w-75">
      <DataTable :value="categories" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 15rem max-width: 25rem"
                 paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                 currentPageReportTemplate="{first} to {last} of {totalRecords}">
        <Column header="№" class="col-2">
          <template #body="{index}">
            {{ index + 1 }}
          </template>
        </Column>
        <Column field="name" header="Категория" class="col-7"></Column>
        <Column class="col-3">
          <template #body="{data}">
            <Button class="me-1 mb-1" @click="openCategoryEditModal(data.id)" icon="pi pi-pencil" severity="secondary" rounded outlined aria-label="Filter" />
            <Button class="mb-1" icon="pi pi-trash" @click="deleteCategory(data.id)" severity="secondary" rounded outlined aria-label="Bookmark" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>

  <Dialog v-model:visible="isCategoryCreateModalActive" modal header="Создать категорию" :style="{ width: '50vh' }">
    <p>Название категорий:</p>
    <InputText type="text" class="col-12" placeholder="Название" v-model="categoryModel.name" />
    <template #footer>
      <Button class="bg-danger text-white mb-1" label="Закрыть" icon="pi pi-times" @click="closeCategoryCreateModal" text />
      <Button class="bg-dark text-white mb-1" style="border: 1px solid #212529" label="Создать" icon="pi pi-check" @click="createCategory(categoryModel.name)" />
    </template>
  </Dialog>

  <Dialog v-model:visible="isCategoryEditModalActive" modal header="Создать категорию" :style="{ width: '50vh' }">
    <p class="p-0 ms-2">Название категорий:</p>
    <div class="row ms-2">
      <InputText class="col-2 me-2" type="text" placeholder="Айди" disabled v-model="categoryModel.id" />
      <InputText class="col-9" type="text" placeholder="Название" v-model="categoryModel.name" />
    </div>
    <template #footer>
      <Button class="bg-danger text-white mb-1" label="Закрыть" icon="pi pi-times" @click="closeCategoryEditModal" text />
      <Button class="bg-dark text-white mb-1" style="border: 1px solid #212529" label="Изменить" icon="pi pi-check" @click="editCategory" />
    </template>
  </Dialog>
</template>

<script setup>

</script>

<script>
import NavBar from "@/components/NavBar.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "ControlCategory",
  components: {NavBar},
  data(){
    return{
      isCategoryEditModalActive: false,
      isCategoryCreateModalActive: false,
      categoryModel: {},
    }
  },
  computed:{
    ...mapState('controlCategories', ['categories']),

  },
  methods: {
    ...mapActions('controlCategories', ['POST_CATEGORY', 'GET_CATEGORIES', "DELETE_CATEGORY", "PUT_CATEGORY"]),
    openCategoryCreateModal(){
      this.isCategoryCreateModalActive = true
    },
    closeCategoryCreateModal(){
      this.isCategoryCreateModalActive = false
    },
    async createCategory(name){
      await this.POST_CATEGORY(name)
      await this.GET_CATEGORIES()
      this.closeCategoryCreateModal()
    },
    async deleteCategory(id){
      await this.DELETE_CATEGORY(id)
      await this.GET_CATEGORIES()
      this.closeCategoryCreateModal()
    },
    async editCategory(){
      await this.PUT_CATEGORY({id: this.categoryModel.id, name: this.categoryModel.name})
      await this.GET_CATEGORIES()
      this.closeCategoryEditModal()
    },
    openCategoryEditModal(id){
      this.categoryModel.id = this.categories.find(category => category.id === id).id
      this.categoryModel.name = this.categories.find(category => category.id === id).name
      this.isCategoryEditModalActive = true
    },
    closeCategoryEditModal(){
      this.isCategoryEditModalActive = false
    },
  },
  async mounted() {
    await this.GET_CATEGORIES()
  }
}
</script>

<style scoped>
.control-category-create__button{
  background: #212529;
  border: none;
}
</style>