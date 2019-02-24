<template>
  <div class="welcome">
      <p> </p>
    <div class="google">
        <h1>Welcome,</h1>
        <img src="../assets/Google.png">
    </div>
    <p class = "bottom">
            <router-link to="/home" tag="button" class ="button btn btn-4 btn-4c icon-arrow-right">
                Continue
            </router-link>
    </p>

  </div>
</template>

<script>


export default {
  name: 'Welcome',
  components: {

  },
}

</script>

<style scoped>

h1 {
    font-size: 105px;
    color: white;
}


.button {
	font-family: inherit;
	font-size: inherit;
	color: inherit;
	background: none;
	cursor: pointer;
	padding: 25px 80px;
	display: inline-block;
	margin: 15px 30px;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: 700;
	outline: none;
	position: relative;
	-webkit-transition: all 0.3s;
	-moz-transition: all 0.3s;
	transition: all 0.3s;

    border-radius: 50px;
	border: 3px solid #fff;
	color: #fff;
	overflow: hidden;
}

.btn-4:active {
	border-color: #17954c;
	color: #17954c;
}

.btn-4:hover {
	background: #24b662;
}

.btn-4c:hover:before {
	left: 80%;
	opacity: 1;
}


.welcome {
  height: 100%;
  width: 100%;
  background-color: black;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.bottom {
    align-self:flex-end;
}





</style>
