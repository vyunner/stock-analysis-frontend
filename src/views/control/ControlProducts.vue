<template>
  <nav-bar></nav-bar>
  <div class="container">
    <div class="mt-3 mx-auto d-flex justify-content-end">
      <Button class="control-category-create__button" label="Создать продукт"
              style="background: #212529; border: none;" @click="openCreateProductModal"/>
    </div>
    <div class="mt-3 mx-auto">
      <DataTable :value="products" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 15rem max-width: 25rem"
                 paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                 currentPageReportTemplate="{first} to {last} of {totalRecords}">
        <Column header="№" class="col-1">
          <template #body="{index}">
            {{ index + 1 }}
          </template>
        </Column>
        <Column field="name" header="Фото" class="col-1"></Column>
        <Column field="name" header="Название" class="col-3"></Column>
        <Column field="category_name" header="Категория" class="col-2"></Column>
        <Column header="Цена" class="col-1">
          <template #body="{data}">
            {{ data.price }} &#8376;
          </template>
        </Column>
        <Column field="product_amount" header="В наличии" class="col-1"></Column>
        <Column field="expiry_date" header="Истекает" class="col-1"></Column>
        <Column class="col-2">
          <template #body="{data}">
            <Button class="me-1 mb-1" @click="openProductEditModal(data.id)" icon="pi pi-pencil" severity="secondary" rounded outlined aria-label="Filter" />
            <Button class="mb-1" icon="pi pi-trash" @click="deleteProduct(data.id)" severity="secondary" rounded outlined aria-label="Bookmark" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>

  <Dialog v-model:visible="isProductCreateModalActive" modal header="Создать продукт" :style="{ width: '50vh' }">
    <p class="mb-2"><b>Название продукта:</b><span style="color:red">&#42;</span></p>
    <InputText type="text" class="col-12 mb-2" placeholder="Название" v-model="productModel.name" />
    <p class="mb-2"><b>Цена продукта:</b><span style="color:red">&#42;</span></p>
    <InputNumber class="col-12 mb-2 p-0" inputId="currency-kazakhstan" placeholder="Цена" mode="currency" currency="KZT" locale="en-US" v-model="productModel.price" />
    <p class="mb-2"><b>Количество продукта:</b><span style="color:red">&#42;</span></p>
    <InputNumber class="col-12 mb-2 p-0" placeholder="Кол.во" v-model="productModel.product_amount" />
    <p class="mb-2"><b>Истекает в:</b></p>
    <Calendar class="col-12 mb-2 p-0" dateFormat="yy-mm-dd" placeholder="Дата" v-model="productModel.expiry_date" />
    <p class="mb-2"><b>Название категорий:</b><span style="color:red">&#42;</span></p>
    <Dropdown class="col-12 mb-2 p-0" editable :options="categories" optionLabel="name" optionValue="id" placeholder="Категория" v-model="productModel.category_id" />
    <template #footer>
      <Button class="bg-danger text-white mb-1" label="Закрыть" icon="pi pi-times" @click="closeCreateProductModal" text />
      <Button :disabled="!isInputsValidationCorrect" class="bg-dark text-white mb-1" style="border: 1px solid #212529" label="Создать" icon="pi pi-check" @click="createProduct()" />
    </template>
    <p class="ms-3"><span style="color:red">&#42;</span> - обязательно для заполнения</p>
  </Dialog>


  <Dialog v-model:visible="isProductEditModalActive" modal header="Изменить продукт" :style="{ width: '50vh' }">
    <div class="row">
      <div class="col-2">
        <p class="mb-2"><b>ID:</b></p>
        <InputText disabled type="text" class="col-12 mb-2" placeholder="ID" v-model="productModel.id" />
      </div>
      <div class="col-10">
        <p class="mb-2"><b>Название продукта:</b><span style="color:red">&#42;</span></p>
        <InputText type="text" class="col-12 mb-2" placeholder="Название" v-model="productModel.name" />
      </div>
    </div>

    <p class="mb-2"><b>Цена продукта:</b><span style="color:red">&#42;</span></p>
    <InputNumber class="col-12 mb-2 p-0" inputId="currency-kazakhstan" placeholder="Цена" mode="currency" currency="KZT" locale="en-US" v-model="productModel.price" />
    <p class="mb-2"><b>Количество продукта:</b><span style="color:red">&#42;</span></p>
    <InputNumber class="col-12 mb-2 p-0" placeholder="Кол.во" v-model="productModel.product_amount" />
    <p class="mb-2"><b>Истекает в:</b></p>
    <Calendar class="col-12 mb-2 p-0" dateFormat="yy-mm-dd" placeholder="Дата" v-model="productModel.expiry_date" />
    <p class="mb-2"><b>Название категорий:</b><span style="color:red">&#42;</span></p>
    <Dropdown class="col-12 mb-2 p-0" editable :options="categories" optionLabel="name" optionValue="id" placeholder="Категория" v-model="productModel.category_id" />
    <template #footer>
      <Button class="bg-danger text-white mb-1" label="Закрыть" icon="pi pi-times" @click="closeProductEditModal" text />
      <Button :disabled="!isInputsValidationCorrect" class="bg-dark text-white mb-1" style="border: 1px solid #212529" label="Сохранить" icon="pi pi-check" @click="editProduct()" />
    </template>
    <p class="ms-3"><span style="color:red">&#42;</span> - обязательно для заполнения</p>
  </Dialog>


</template>

<script>
import NavBar from "@/components/NavBar.vue";
import {mapActions, mapState} from "vuex";
import controlProduct from "@/store/modules/control/control-products";

export default {
  name: "ControlProducts",
  components: {NavBar},
  data(){
    return{
      isProductCreateModalActive: false,
      isProductEditModalActive: false,
      productModel: {},
      isInputsValidationCorrect: false,
    }
  },

  computed:{
    ...mapState('controlProducts', ['products']),
    ...mapState('controlCategories', ['categories']),

  },

  watch:{
    'productModel.name'(newVal, oldVal){
      this.checkValidation()
    },
    'productModel.price'(newVal, oldVal){
      this.checkValidation()
    },
    'productModel.product_amount'(newVal, oldVal){
      this.checkValidation()
    },
    'productModel.category_id'(newVal, oldVal){
      this.checkValidation()
    },
  },

  methods: {
    ...mapActions('controlProducts', ['GET_PRODUCTS', "POST_PRODUCT", "PUT_PRODUCT", "DELETE_PRODUCT"]),
    ...mapActions('controlCategories', ['GET_CATEGORIES']),


    openCreateProductModal() {
      this.productModel = {}
      this.isProductCreateModalActive = true
    },
    closeCreateProductModal() {
      this.productModel = {}
      this.isProductCreateModalActive = false
    },
    async createProduct() {
      if (this.productModel.expiry_date !== undefined && this.productModel.expiry_date !== null){
        this.productModel.expiry_date = `${this.productModel.expiry_date.getFullYear()}-${this.productModel.expiry_date.getUTCMonth()+1}-${this.productModel.expiry_date.getDate()}`
      }
      let postRes = await this.POST_PRODUCT(this.productModel)
      if (postRes.status === 200){
        await this.GET_PRODUCTS();
        await this.GET_CATEGORIES();
        this.$message({title: 'Успешно создано'})
        this.closeCreateProductModal()
      } else {
        this.$error({title: 'Что то пошло не так!'})
      }

    },

    openProductEditModal(id) {
      this.productModel = this.products.find(i => i.id === id)
      this.productModel.id = id
      this.isProductEditModalActive = true
    },
    closeProductEditModal() {
      this.productModel = {}
      this.isProductEditModalActive = false
    },
    async editProduct(){
      if (this.productModel.expiry_date !== undefined && this.productModel.expiry_date !== null){
        this.productModel.expiry_date = `${this.productModel.expiry_date.getFullYear()}-${this.productModel.expiry_date.getUTCMonth()+1}-${this.productModel.expiry_date.getDate()}`
      }
      console.log(this.productModel)
      let putRes = await this.PUT_PRODUCT(this.productModel)
      if (putRes.status === 200){
        await this.GET_PRODUCTS();
        await this.GET_CATEGORIES();
        this.$message({title: 'Успешно изменено!'})
        this.closeProductEditModal()
      } else {
        this.$error({title: 'Что то пошло не так!'})
      }
    },

    async deleteProduct(id) {
      let deleteRes = await this.DELETE_PRODUCT(id)
      if (deleteRes.status === 200){
        await this.GET_PRODUCTS();
        await this.GET_CATEGORIES();
        this.$message({title: 'Успешно удалено!'})
      } else {
        this.$error({title: 'Что то пошло не так!'})
      }
    },


    checkValidation() {
      this.isInputsValidationCorrect = this.productModel.name !== undefined &&
      this.productModel.price !== undefined &&
      this.productModel.product_amount !== undefined &&
      this.productModel.category_id !== undefined &&
      this.productModel.name !== null &&
      this.productModel.price !== null &&
      this.productModel.product_amount !== null &&
      this.productModel.category_id !== null ? this.isInputsValidationCorrect = true : this.isInputsValidationCorrect = false;
    }
  },

  async mounted() {
    await this.GET_PRODUCTS();
    await this.GET_CATEGORIES();
  }
}
</script>

<style scoped>

</style>