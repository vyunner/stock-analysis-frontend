<template>
  <div>
    <nav-bar @nav-click="(value) => navData = value"></nav-bar>
    <div class="container">
      <div class="mt-3 mx-auto">
        <DataTable :value="expiry" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 15rem max-width: 25rem"
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
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import {mapState, mapActions} from "vuex";

export default {
  components: {NavBar},
  data(){
    return{
      navData: null,
    }
  },

  computed:{
    ...mapState('expiry', ['expiry'])
  },

  methods: {
    ...mapActions('expiry', ['GET_EXPIRY'])
  },

  async mounted() {
    await this.GET_EXPIRY()
    console.log(this.expiry)
  }
}
</script>

<style scoped>

</style>

