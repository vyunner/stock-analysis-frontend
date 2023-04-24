<template>
  <nav-bar></nav-bar>
  <div class="container">
    <div class="mt-3 mx-auto d-flex justify-content-end">
      <Button class="control-category-create__button" label="Создать продукт"
              style="background: #212529; border: none;" @click="openCreateOrderModal"/>
    </div>
    <div class="mt-3 mx-auto">
      <DataTable :value="orders" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 15rem max-width: 25rem"
                 paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                 currentPageReportTemplate="{first} to {last} of {totalRecords}">
        <Column header="№" class="col-1">
          <template #body="{index}">
            {{ index + 1 }}
          </template>
        </Column>
        <Column field="product_name" header="Название" class="col-3"></Column>
        <Column field="order_amount" header="Сколько купили" class="col-1"></Column>
        <Column field="product_amount" header="Сколько осталось" class="col-1"></Column>
        <Column header="Цена за еденицу" class="col-2">
          <template #body="{data}">
            {{ data.product_price }} &#8376;
          </template>
        </Column>
        <Column header="Стоимость покупки" class="col-2">
          <template #body="{data}">
            {{ data.product_price * data.order_amount }} &#8376;
          </template>
        </Column>
        <Column class="col-2">
          <template #body="{data}">
            <Button class="me-1 mb-1" @click="openOrderEditModal(data.id)" icon="pi pi-pencil" severity="secondary" rounded outlined aria-label="Filter" />
            <Button class="mb-1" icon="pi pi-trash" @click="deleteOrder(data.id)" severity="secondary" rounded outlined aria-label="Bookmark" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>

  <Dialog v-model:visible="isOrderCreateModalActive" modal header="Создать продукт" :style="{ width: '50vh' }">
    <p class="mb-2"><b>Название продукта:</b><span style="color:red">&#42;</span></p>
    <Dropdown class="col-12 mb-2 p-0" editable :options="products" optionLabel="name" optionValue="id" placeholder="Продукт" v-model="orderModel.product_id" />
    <p class="mb-2"><b>Количество покупаемого продукта:</b><span style="color:red">&#42;</span></p>
    <InputNumber class="col-12 mb-2 p-0" placeholder="Кол.во" v-model="orderModel.order_amount" />
    <template #footer>
      <Button class="bg-danger text-white mb-1" label="Закрыть" icon="pi pi-times" @click="closeCreateOrderModal" text />
      <Button :disabled="!isInputsValidationCorrect" class="bg-dark text-white mb-1" style="border: 1px solid #212529" label="Создать" icon="pi pi-check" @click="createOrder()" />
    </template>
    <p class="ms-3"><span style="color:red">&#42;</span> - обязательно для заполнения</p>
  </Dialog>


  <Dialog v-model:visible="isOrderEditModalActive" modal header="Изменить продукт" :style="{ width: '50vh' }">
    <div class="row">
      <div class="col-2">
        <p class="mb-2"><b>ID:</b></p>
        <InputText disabled type="text" class="col-12 mb-2" placeholder="ID" v-model="orderModel.id" />
      </div>
      <div class="col-10">
        <p class="mb-2"><b>Название продукта:</b><span style="color:red">&#42;</span></p>
        <Dropdown class="col-12 mb-2 p-0" editable :options="products" optionLabel="name" optionValue="id" placeholder="Категория" v-model="orderModel.product_id" />
      </div>
    </div>
    <p class="mb-2"><b>Количество покупаемого продукта:</b><span style="color:red">&#42;</span></p>
    <InputNumber class="col-12 mb-2 p-0" placeholder="Кол.во" v-model="orderModel.order_amount" />
    <template #footer>
      <Button class="bg-danger text-white mb-1" label="Закрыть" icon="pi pi-times" @click="closeOrderEditModal" text />
      <Button :disabled="!isInputsValidationCorrect" class="bg-dark text-white mb-1" style="border: 1px solid #212529" label="Сохранить" icon="pi pi-check" @click="editOrder()" />
    </template>
    <p class="ms-3"><span style="color:red">&#42;</span> - обязательно для заполнения</p>
  </Dialog>


</template>

<script>
import NavBar from "@/components/NavBar.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "ControlProducts",
  components: {NavBar},
  data(){
    return{
      isOrderCreateModalActive: false,
      isOrderEditModalActive: false,
      isInputsValidationCorrect: false,
      orderModel: {},
    }
  },

  computed:{
    ...mapState('controlOrders', ['orders']),
    ...mapState('controlProducts', ['products']),
  },

  watch:{
    'orderModel.product_id'(newVal, oldVal){
      this.checkValidation()
    },
    'orderModel.order_amount'(newVal, oldVal){
      this.checkValidation()
    },
  },

  methods: {
    ...mapActions('controlOrders', ['GET_ORDERS', "POST_ORDER", "PUT_ORDER", "DELETE_ORDER"]),
    ...mapActions('controlProducts', ['GET_PRODUCTS']),


    openCreateOrderModal() {
      this.orderModel = {}
      this.isOrderCreateModalActive = true
    },
    closeCreateOrderModal() {
      this.orderModel = {}
      this.isOrderCreateModalActive = false
    },
    async createOrder() {
      let postRes = await this.POST_ORDER(this.orderModel)
      if (postRes.status === 200){
        await this.GET_ORDERS();
        await this.GET_PRODUCTS();
        this.$message({title: 'Успешно создано'})
        this.closeCreateOrderModal()
      } else {
        this.$error({title: 'Что то пошло не так!'})
      }
    },

    openOrderEditModal(id) {
      this.orderModel = this.orders.find(i => i.id === id)
      this.orderModel.id = id
      this.isOrderEditModalActive = true
    },
    closeOrderEditModal() {
      this.orderModel = {}
      this.isOrderEditModalActive = false
    },
    async editOrder(){
      let putRes = await this.PUT_ORDER(this.orderModel)
      if (putRes.status === 200){
        await this.GET_ORDERS();
        await this.GET_PRODUCTS();
        this.$message({title: 'Успешно изменено!'})
        this.closeOrderEditModal()
      } else {
        this.$error({title: 'Что то пошло не так!'})
      }
    },

    async deleteOrder(id) {
      let deleteRes = await this.DELETE_ORDER(id)
      if (deleteRes.status === 200){
        await this.GET_ORDERS();
        await this.GET_PRODUCTS();
        this.$message({title: 'Успешно удалено!'})
      } else {
        this.$error({title: 'Что то пошло не так!'})
      }
    },


    checkValidation() {
      this.isInputsValidationCorrect = this.orderModel.product_id !== undefined &&
      this.orderModel.order_amount !== undefined &&
      this.orderModel.product_id !== null &&
      this.orderModel.order_amount !== null ? this.isInputsValidationCorrect = true : this.isInputsValidationCorrect = false;
    }
  },

  async mounted() {
    await this.GET_ORDERS();
    await this.GET_PRODUCTS();
  }
}
</script>

<style scoped>

</style>