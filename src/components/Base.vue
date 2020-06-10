<template lang="html">
  <div class="app__wrapper">
    <h1>Таблица записей</h1>
    <router-link :to="{ name: 'post_add'}" class="app__add-post">ADD NEW POST</router-link>
    <table class="table js-table">
      <thead>
      <tr>
        <th>Минимальная сумма
          <div class="sorting">
            <span class="sorting__button sorting__button_decrease" data-sorting="minprice" @click="sortingDecrease"></span>
            <span class="sorting__button sorting__button_increase" data-sorting="minprice" @click="sortingIncrease"></span>
          </div>
        </th>
        <th>Максимальная сумма
          <div class="sorting">
            <span class="sorting__button sorting__button_decrease" data-sorting="maxprice" @click="sortingDecrease"></span>
            <span class="sorting__button sorting__button_increase" data-sorting="maxprice" @click="sortingIncrease"></span>
          </div>
        </th>
        <th>Процентная ставка, %
          <div class="sorting">
            <span class="sorting__button sorting__button_decrease" data-sorting="procent" @click="sortingDecrease"></span>
            <span class="sorting__button sorting__button_increase" data-sorting="procent" @click="sortingIncrease"></span>
          </div>
        </th>
        <th>Частота выплат</th>
        <th class="table__cell-operations">Операции</th>
      </tr>
      </thead>
      <tbody v-for="post in posts">
      <tr>
        <td class="table__cell js-table__cell" data-name="minprice">{{ post.minprice }}</td>
        <td class="table__cell js-table__cell" data-name="maxprice">{{ post.maxprice }}</td>
        <td class="table__cell js-table__cell" data-name="procent">{{ post.procent }}</td>
        <td class="table__cell js-table__cell" data-name="cnt">{{ post.cnt }}</td>
        <td class="table__cell table__cell_operations js-table__cell">
          <router-link :to="{ name: 'post', params: { id: post.id }}">EDIT</router-link>
          <router-link :to="{ name: 'delete', params: { id: post.id }}">DELETE</router-link>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button v-for="(page, index) in pagination.pages" class="pagination__button" @click.prevent="setPage(index)">
        {{ page.text }}
      </button>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                postsList: null,
                posts: null,
                action: '/table1.json',
                pagination: {}
            }
        },
        methods: {
            getAllPosts() {
                axios.get(this.action)
                    .then(response => {
                        this.posts = response.data.rows;
                        this.pagination = response.data.pagination;
                        this.createPagination();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            createPagination(){
                if (this.pagination.count > 1)
                {
                    this.pagination.pages = [];
                    for (let i = 0; i < this.pagination.count; i++) {
                        let text = i + 1;
                        if (i == this.pagination.currentPage - 1) {
                            this.pagination.pages[i] = {"current_page" : true, "text" : text};
                        }else{
                            this.pagination.pages[i] = {"current_page" : false, "text" : text};
                        }
                    }
                }
            },
            setPage(page) {
                let nextPage = ++page;
                //псевдо-работа бэка
                let nextAction = '/table' + nextPage+ '.json';
                axios.get(nextAction)
                    .then(response => {
                        this.posts = response.data.rows;
                        this.pagination = response.data.pagination;
                        this.createPagination();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            sortingDecrease (e) {
                let currentName = e.currentTarget.getAttribute('data-sorting');
                this.posts.sort((a, b) => {
                    return a[currentName] - b[currentName];
                });
            },
            sortingIncrease (e) {
                let currentName = e.currentTarget.getAttribute('data-sorting');
                this.posts.sort((a, b) => {
                    return b[currentName] - a[currentName];
                });
            }
        },
        created() {
            this.getAllPosts();
        },
    }
</script>
