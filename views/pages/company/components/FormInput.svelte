<script>
export let inputDataId;
export let inputName;
export let inputLabel;
export let required=false;
export let inputValue="";
</script>


<label for="ruc"
    class="mdc-layout-grid__cell--span-4 form-cell"
>
{inputLabel}
</label>
<div
    class="text-field-container mdc-layout-grid__cell--span-8"
>
    <div
        class="mdc-text-field--filled mdc-text-field"
        aria-describedby="text-field-shape-one-helper-text"
    >
        <input bind:value={inputValue}  id="ruc"  data-id={inputDataId} name={inputName} required={required} class="mdc-text-field__input">
        <div class="mdc-line-ripple"></div>
    </div>
    <div class="mdc-text-field-helper-line">
        <p
            class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg"
        >
            Por ejemplo:
        </p>
    </div>
</div>