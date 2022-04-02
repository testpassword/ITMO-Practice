<template>
    <!--...-->
    <v-spacer v-if="$vuetify.breakpoint.mdAndDown && !totalRight"/>
    <expandable-filter-menu
      :expanded-class="expandedClass"
      :is-expanded="$vuetify.breakpoint.lgAndUp"
      v-if="!totalRight"
    >
      <slot v-if="!plotRight"/>
      <slot name="actions-prepend"/>
      <slot name="actions-left"/>
      <v-spacer/>
      <slot v-if="plotRight"/>
      <slot name="actions"/>
    </expandable-filter-menu>
    <!--...-->
</template>