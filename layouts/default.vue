<template>
  <div class="layout-container">
    <header>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <p>© 2025 my nuxt tutorial</p>
    </footer>
  </div>
</template>
<style>
@import "../assets/css/default.css";
</style>
