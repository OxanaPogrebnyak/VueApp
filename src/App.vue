<template>
  <div id="app">
    <div class="app__container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">

$bc-color: #02ABCA;
$bc-grey: #F4F4F4;
$white: #ffffff;

*, *::before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.button, input, button {
  margin: 0;
  padding: 0;
  text-decoration: none;
  background: 0 0;
  border: none;
  outline: 0;
  -webkit-tap-highlight-color: transparent;
}

input {
  width: 100%;
  height: 100%;
}

button {
  cursor: pointer;
}
h1, h2 {
  font-weight: normal;
  margin-bottom: 30px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: $bc-color;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  &:hover {
    color: #02758a;
    transition: all 0.3s ease-in;
  }
}
.app {
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
  }

  &__wrapper, &__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__button-wrapper {
    display: flex;
  }

  &__authorize-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 30%;
    border: 1px solid $bc-grey;
    padding: 30px;
  }
}


.table {
  $self: &;
  border-collapse: collapse;
}
thead {
  background-color: $bc-color;
}

tr {
  border-bottom: 1px solid rgba(136, 144, 161, 0.3);
}

.table__cell {
  padding: 0 20px;
}
th, td {
  padding: 15px 8px;
}
th {
  border-left: 1px solid $white;
  color: $white;
}
td {
  background-color: $bc-grey;
  border-left: 1px solid rgba(136, 144, 161, 0.3);
  &:first-child {
    border: none;
  }
}

input, select {
  width: 100%;
  height: 56px;
}

input[type="submit"] {
  cursor: pointer;
}

select {
  background-color: inherit;
  border: none;
}




.sorting {
  $self: &;

  display: inline-flex;
  margin-left: 20px;
  &__button {
    width: 10px;
    height: 10px;
    border-right: 3px solid $white;
    border-bottom: 3px solid $white;
    transform: translate(-50%, -50%) rotate(-40deg) skew(16deg);
    margin-right: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in;
    &:hover {
      opacity: 0.5;
    }
    &_decrease {
      transform: rotate(45deg);
    }
    &_increase {
      transform: rotate(-135deg);
    }
  }
}

input[type="submit"], .button {
  max-width: 200px;
  min-width: 165px;
  padding: 20px 40px;
  background-color: $bc-color;
  color: $white;
  margin-top: 30px;
  margin-right: 20px;
}

.form {
  &__item {
    position: relative;
  }
  &__error {
    position: absolute;
    top: 4px;
    font-size: 12px;
    color: red;
  }
  &__authorize-field {
    padding: 20px;
    background-color: $bc-grey;
    margin-bottom: 10px;
  }

  &__authorize-errors {
    color: red;
    margin-top: 10px;
  }
}

.pagination {
  margin-top: 20px;
  &__button {
    width: 25px;
    height: 25px;
    background-color: $bc-color;
    color: $white;
    margin-right: 5px;
    transition: all 0.3s ease-in;
    &:hover {
      opacity: 0.6;
    }
  }
}
</style>

