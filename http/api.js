const fly = require('./index')

export default {
  //获取大分类
  getCats() {
    return fly.get('/cats/lv2/statistics')
  },
  //获取小分类
  getMinor() {
    return fly.get("/cats/lv2")
  },
  //排行分类
  rankCategory() {
    return fly.get(`/ranking/gender`)
  },
  //获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
  getCatsBooks(gender, type, major, minor, start) {
    if (minor) {
      return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=20`)
    } else {
      return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=20`)
    }
  },
  // 短评
  shortReviews(book_id) {  // @param book_id 书籍id    完整接口 ?book=5816b415b06d1d32157790b1&limit=20&total=true&start=0&sortType=hottest
    return fly.get(`/post/short-review?book=${book_id}&total=true&sortType=newest`)
  },
  // 书籍详情
  bookInfo(book_id) { // @param book_id 书籍id
    return fly.get('/book/' + book_id)
  },
  // 相关推荐
  relatedRecommendedBooks(book_id) { // @param book_id 书籍id
    return fly.get(`/book/${book_id}/recommend`)
  },
  // 排名详情
  rankInfo(rank_id) { //@param rank_id 分类ID
    return fly.get(`/ranking/${rank_id}`)
  },
  //搜索热词
  hotword() {
    return fly.get('/book/hot-word')
  },
  // 书籍搜索 (分类，书名，作者名)
  bookSearch(content) { //@param content 搜索内容
    return fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${content}`)
  },
}