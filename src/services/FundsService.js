import Api from '@/services/Api'

export default {
  index () {
    return Api().get('funds')
  },
  getBySlug (fundSlug) {
    return Api().get(`funds/${fundSlug}`)
  }
}
