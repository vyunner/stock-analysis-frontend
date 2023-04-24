export default {
  install(app) {
    app.config.globalProperties.$message = (html) => {

      app.config.globalProperties.$toast.add({
        severity: 'success',
        summary: html.title || '',
        detail: html.text || '',
        life: html.time || 5000
      })

    }

    app.config.globalProperties.$error = (html) => {

      app.config.globalProperties.$toast.add({
        severity: 'error',
        summary: html.title || '',
        detail: html.text || '',
        life: html.time || 9000
      })

    }

    app.config.globalProperties.$messageInfo = (html) => {

      app.config.globalProperties.$toast.add({
        severity: 'info',
        summary: html.title || '',
        detail: html.text || '',
        life: html.time || 5000
      })

    }
  }
}