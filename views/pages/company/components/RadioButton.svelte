<script>
    export let radioLabel;
    export let radioChecked=false;

    
</script>
<div
    class="mdc-touch-target-wrapper mdc-layout-grid__cell mdc-layout-grid__cell--span-7 mdc-layout-grid--align-right"
>
    <div class="mdc-radio mdc-radio--touch">
        <input
            id=radio-1
            class="mdc-radio__native-control"
            type="checkbox"
            data-id="radio-1"
            name="radios"
            bind:checked={radioChecked}
        />
        <div class="mdc-radio__background">
            <div class="mdc-radio__outer-circle"></div>
            <div class="mdc-radio__inner-circle"></div>
        </div>
        <div class="mdc-radio__ripple"></div>
        <div class="mdc-radio__focus-ring"></div>
        
    </div>
    <label class="radio-label" for="">
        {radioLabel}
    </label>
    
</div>
