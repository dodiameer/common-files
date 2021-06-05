<script lang="ts">
  export let value;
  export let multiple = false;
  export let disabled = false;
</script>

<!--
  @component
  # Select

  Custom select component

  ## CSS Properties
  - `select-border`: Border color
  - `select-arrow`: Arrow color (default: `select-border`)
  - `select-focus`: Border color when focused (default: `hsl(220, 92%, 63%)` - light blue)
  
  ## Props
  - `value` - Select element value (bindable) (required)
  - `multiple: boolean` - Multi-select element (default: `false`)
  - `disabled: boolean` - disabled HTML attribute (default: `false`)
-->
<template>
  <div
    class="select"
    class:select--multiple="{multiple}"
    class:select--disabled="{disabled}"
    data-testid="select">
    {#if multiple}
      <select class="standard-select" bind:value disabled="{disabled}" multiple>
        <slot />
      </select>
    {:else}
      <select class="standard-select" bind:value disabled="{disabled}">
        <slot />
      </select>
    {/if}
  </div>
</template>

<style lang="scss">
  .select {
    --internal-select-border: var(--select-border, #333);
    --internal-select-focus: var(--select-focus, hsl(220, 92%, 63%));
    --internal-select-arrow: var(--select-arrow, var(--internal-select-border));
    display: grid;
    grid-template-areas: "select";
    width: 100%;
    min-width: 15ch;
    max-width: 30ch;
    border: 1px solid var(--internal-select-border);
    border-radius: 0.25em;
    padding: 0.25em 0.5em;
    font-size: 1.25rem;
    cursor: pointer;
    line-height: 1.1;
    background-color: #fff;
    background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
    align-items: center;

    &--disabled {
      cursor: not-allowed;
      background-color: #eee;
      background-image: linear-gradient(to top, #ddd, #eee 33%);
    }

    &:not(&--multiple)::after {
      content: "";
      width: 0.8em;
      height: 0.5em;
      background-color: var(--internal-select-arrow);
      clip-path: polygon(100% 0%, 0 0%, 50% 100%);
      grid-area: select;
      justify-self: end;
      transition: transform 0.4s ease-out;
      transform-origin: center;
    }

    &:focus-within {
      outline: 2px solid var(--internal-select-focus);
      outline-offset: 3px;
      border-color: var(--internal-select-focus);

      &::after {
        color: var(--internal-select-focus);
        transform: rotate(180deg);
      }
    }
  }
  .standard-select {
    // A reset of styles, including removing the default dropdown arrow
    grid-area: select;
    appearance: none;
    // Additional resets for further consistency
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    outline: none;

    &::-ms-expand {
      // IE support
      display: none;
    }

    &[multiple] {
      padding-right: 0;
      height: 8rem;
    }
  }
</style>
