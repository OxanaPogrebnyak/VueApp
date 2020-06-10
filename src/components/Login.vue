<template lang="html">
  <div class="app__wrapper">
    <div class="app__authorize-wrapper">
      <form class="app__form-authorize form" action="/" method="post" @submit="formSubmit" novalidate>
        <label>
          <input class="form__authorize-field" type="text" name="login" placeholder="login" required>
        </label>
        <label>
          <input class="form__authorize-field" type="password" name="password" placeholder="password" required>
        </label>
        <input class="js-submit-authorize" type="submit" value="Log in">
        <p class="form__authorize-errors">{{this.error}}</p>
      </form>
    </div>
  </div>
</template>

<script>
    import VueCookies from 'vue-cookies';
    export default {
        props: [],
        data() {
            return {
                authorized: false,
                error: ''
            }
        },
        methods: {
            formSubmit(e) {
                e.preventDefault();
                let formData = new FormData(e.currentTarget);
                if (formData.get('login') === 'admin' && formData.get('password') === 'admin') {
                    VueCookies.set('authorize', true);
                    this.error = '';
                    window.location.href = '/';
                } else {
                    this.error = 'Неверный логин или пароль';
                }
            },
        },
    }
</script>
