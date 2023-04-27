<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <div class="mt-3 mx-auto">
        <DataTable :value="expiry" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" :rowStyle="rowStyle" :rowClass="rowClass" tableStyle="min-width: 15rem max-width: 25rem"
                   paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                   currentPageReportTemplate="{first} to {last} of {totalRecords}">
          <Column header="№" class="col-1">
            <template #body="{index}">
              {{ index + 1 }}
            </template>
          </Column>
          <Column field="name" header="Название" class="col-4"></Column>
          <Column field="product_amount" header="Сколько осталось" class="col-2"></Column>
          <Column header="Истек" class="col-2">
            <template #body="{data}">
              {{ data.is_expired ? 'Да' : 'Нет' }}
            </template>
          </Column>
          <Column field="expiry_date" header="Дата истечения" class="col-3"></Column>
        </DataTable>
      </div>
      <div class="mt-3 mx-auto">
        <h3 class="mt-5 mb-3 text-center">Товаров осталось мало стот докупить!</h3>
        <DataTable :value="amounts" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 15rem max-width: 25rem"
                   paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                   currentPageReportTemplate="{first} to {last} of {totalRecords}">
          <Column header="№" class="col-1">
            <template #body="{index}">
              {{ index + 1 }}-
            </template>
          </Column>
          <Column field="name" header="Название" class="col-3"></Column>
          <Column field="name" header="Цена за еденицу" class="col-2"></Column>
          <Column field="price" header="Сколько осталось" class="col-2"></Column>
          <Column field="expiry_date" header="Дата истечения" class="col-2"></Column>
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
    }
  },

  computed:{
    ...mapState('expiry', ['expiry']),
    ...mapState('amount', ['amounts']),
  },

  methods: {
    ...mapActions('expiry', ['GET_EXPIRY']),
    ...mapActions('amount', ['GET_AMOUNTS']),
    rowClass(data){
      return [{ 'bg-danger': data.is_expired, 'bg-warning': !data.is_expired, 'text-white': data.is_expired }];
    },
    rowStyle(data) {
      if (!data.is_expired){
        return { color: '#000000'};
      }
    },
  },

  async mounted() {
    await this.GET_EXPIRY()
    await this.GET_AMOUNTS()
  }
}
</script>

<style scoped>

</style>

