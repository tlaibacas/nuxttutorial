<style>
@import "../assets/styles/default.css";
</style>

<template>
  <div class="layout-container">
    <header>
      <Header />
    </header>

    <main class="main-content">
      <slot />
    </main>

    <footer class="site-footer">
      <Footer />
    </footer>
  </div>
</template>
