<script>
    export let buttonText;
    export let submitForm;
    
</script>
<div
    class="mdc-touch-target-wrapper mdc-layout-grid__cell mdc-layout-grid__cell--span-12 mdc-layout-grid--align-right"
>
    <button class="mdc-button mdc-button--raised form-submit" type="submit" on:click={submitForm}>
        <span class="mdc-button__label">
            {buttonText}
        </span>
    </button>
</div>