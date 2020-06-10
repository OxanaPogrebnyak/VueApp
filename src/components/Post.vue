<template lang="html">
  <div class="app__wrapper">
    <h2 v-if="post.id">Отредактируйте значение</h2>
    <h2 v-else>Добавить значение</h2>
    <form class="app__form form" action="/form_result.json" method="post" @submit="formSubmit" novalidate>
      <input type="hidden" name="id" :value="post.id"/>
      <table class="table table_edit js-table">
        <thead>
        <tr>
          <th>Минимальная сумма</th>
          <th>Максимальная сумма</th>
          <th>Процентная ставка</th>
          <th>Частота выплат</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="table__cell js-table__cell">
            <div class="form__item">
              <label>
                <input type="text" name="minprice" :value="post.minprice" required>
              </label>
              <p class="form__error" v-for="(index) in errors" v-if="index === 'minprice'">
                <span>Неверное значение</span>
              </p>
            </div>
          </td>
          <td class="table__cell js-table__cell">
            <div class="form__item">
              <label>
                <input type="text" name="maxprice" :value="post.maxprice" required>
              </label>
              <p class="form__error" v-for="(index) in errors" v-if="index === 'maxprice'">
                Неверное значение
              </p>
            </div>
          </td>
          <td class="table__cell js-table__cell">
            <div class="form__item">
              <label>
                <input type="text" name="procent" :value="post.procent" required>
              </label>
              <p class="form__error" v-for="(index) in errors" v-if="index === 'procent'">
                Неверное значение
              </p>
            </div>
          </td>
          <td class="table__cell js-table__cell">
            <div class="form__item">
              <select v-model="select" name="count">
                <option v-for="(select, index) in selects" :key="index">
                  {{ select }}
                </option>
              </select>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="app__button-wrapper">
        <input class="js-submit" type="submit" value="Save">
        <button class="button js-cancel" type="button" @click="formCancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
        props: ['id'],
        data() {
            return {
                post: {},
                endpoint: '/element.json?id=',
                selects: ['каждые две недели', 'ежемесячно', 'единовременно'],
                select: 'каждые две недели',
                errors: [],
            }
        },
        methods: {
            getPost(id) {
                if (id > 0)
                {
                    axios(this.endpoint + id)
                        .then(response => {
                            this.post = response.data
                        })
                        .catch( error => {
                            console.log(error)
                        })
                }
            },
            formSubmit(e) {
                e.preventDefault();
                let currentObj = this;
                const formAction = e.currentTarget.getAttribute('action');
                let formData = new FormData(e.currentTarget);
                //post
                if (this.formValidate(formData, currentObj)) {
                    axios.post(formAction, formData)
                        .then(function (response) {
                            if (response.data.result === 'success')
                            {
                                currentObj.$router.push('/');
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            formCancel(e) {
                this.$router.push('/');
            },
            formValidate(form) {
                this.errors = [];
                let currentObj = this;
                for (var [key, value] of form.entries()) {
                    if (key !== 'id' && key !== 'count') {
                        let number = Number(value);
                        if (!Number.isInteger(number) ||  number <= 0) {
                            let currentField = document.querySelector('input[name="' + key + '"]');
                            this.errors.push(key);
                        }
                        this.post[key] = value;
                    }
                }

                if (this.errors.length === 0) {
                    return true;
                }
                return  false;
            }
        },
        created() {
            this.getPost(this.id);
        },
        watch: {
            '$route'() {
                this.getPost(this.id);
            }
        }
    }


</script>
