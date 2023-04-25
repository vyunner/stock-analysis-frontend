<template>
  <nav-bar></nav-bar>
  <div class="container">
    <div class="main-buttons">
      <SelectButton class="mt-3" v-model="buttonsData.topSoldUnsold.value" :options="buttonsData.topSoldUnsold.values"
                    aria-labelledby="basic" @click="selectButton"/>
      <SelectButton class="mt-3" v-model="buttonsData.howMuchMany.value" :options="buttonsData.howMuchMany.values"
                    aria-labelledby="basic" @click="selectButton"/>
    </div>
    <div class="main-charts mt-5">
      <div class="card">
        <Chart  type="line" :data="chartData.data" :options="chartData.options" class="h-30rem" />
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
      buttonsData: {
        topSoldUnsold:{
          value: 'Топ продаваемых',
          values: ['Топ продаваемых', 'Топ не продаваемых']
        },
        howMuchMany:{
          value: 'На сколько продано',
          values: ['На сколько продано', 'Сколько продано']
        }
      },
      chartData: {
        data: {
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [{
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56],
            backgroundColor: '#212529',
            borderColor: '#212529',
            pointBackgroundColor: '#212529',
            pointBorderColor: '#212529',
            pointHoverBackgroundColor: 'rgba(13, 137, 236, 0.5)',
            pointHoverBorderColor: 'rgba(13, 137, 236, 0.5)',
            fill: false,
            tension: 0.4,
          },]
        },
        options: {
          maintainAspectRatio: false,
          aspectRatio: 0.6,
          plugins: {
            legend: {
              labels: {
                color: '#FFFFFF'
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: '#202020'
              },
              grid: {
                color: '#F0F0F0'
              }
            },
            y: {
              ticks: {
                color: '#202020'
              },
              grid: {
                color: '#F0F0F0'
              }
            }
          }
        },
      }
    }
  },

  computed:{
    ...mapState('analytics', ['analytics']),
  },

  methods: {
    ...mapActions('analytics', ['GET_ANALYTICS']),
    selectButton(){
      if (this.buttonsData.topSoldUnsold.value === null){
        this.buttonsData.topSoldUnsold.value = this.buttonsData.topSoldUnsold.values[0]
      }
      if (this.buttonsData.howMuchMany.value === null){
        this.buttonsData.howMuchMany.value = this.buttonsData.howMuchMany.values[0]
      }

      this.chartData.data.datasets[0].data = []
      this.chartData.data.labels = []

      if (this.buttonsData.topSoldUnsold.value === 'Топ продаваемых' && this.buttonsData.howMuchMany.value === 'На сколько продано'){
        this.analytics.topSellingProducts.forEach(i => {
          this.chartData.data.datasets[0].data.push(i.totalRevenue)
          this.chartData.data.labels.push(i.name)
        })
      } else if (this.buttonsData.topSoldUnsold.value === 'Топ продаваемых' && this.buttonsData.howMuchMany.value === 'Сколько продано'){
        this.analytics.topSellingProducts.forEach(i => {
          this.chartData.data.datasets[0].data.push(i.totalSales)
          this.chartData.data.labels.push(i.name)
        })
      } else if (this.buttonsData.topSoldUnsold.value === 'Топ не продаваемых' && this.buttonsData.howMuchMany.value === 'На сколько продано'){
        this.analytics.topUnsoldProducts.forEach(i => {
          this.chartData.data.datasets[0].data.push(i.totalRevenue)
          this.chartData.data.labels.push(i.name)
        })
      } else if (this.buttonsData.topSoldUnsold.value === 'Топ не продаваемых' && this.buttonsData.howMuchMany.value === 'Сколько продано' ){
        this.analytics.topUnsoldProducts.forEach(i => {
          this.chartData.data.datasets[0].data.push(i.totalSales)
          this.chartData.data.labels.push(i.name)
        })
      }
    }
  },

  async mounted() {
    await this.GET_ANALYTICS()
    this.selectButton()
  }
}
</script>

<style lang="scss" scoped>


::v-deep .p-selectbutton .p-button.p-highlight {
  background-color: #212529;
  border: #212529;
}
::v-deep .p-selectbutton .p-button.p-highlight:hover {
  background-color: #212529;
  border: #212529;
}

::v-deep .p-highlight{
  box-shadow: none;
}

@media screen and (max-width: 768px) {
  .main-charts{
    overflow: auto;
  }
  .card{
    width: 514px !important;
    height: 480px !important;
  }
}
</style>
