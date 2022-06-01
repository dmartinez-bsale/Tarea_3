
<script>
export let formTitle;
export let formDataID;
export let submitForm;
    
</script>

<!-- company form -->

<form on:submit|preventDefault={submitForm(formDataID)}
    for="company_form"
    data-id={formDataID}
    class="mdc-card mdc-layout-grid__cell mdc-layout-grid__cell--span-8 mdc-layout-grid "
>
    <div class="mdc-layout-grid__inner">
        <label for=""
            class="mdc-layout-grid__cell--span-12 form-title"
        >
        {formTitle}
        </label>
        <slot> </slot>
        
    </div>
</form>

