<script>
    export let checkLabel;
    export let checked;
    export let getCompanies;
    
</script>
<span class="mdc-ripple-surface">
    <li class="mdc-list-item check-align" role="checkbox" aria-checked="false">
        <label class="mdc-list-item__text" for="demo-list-checkbox-item-1">{checkLabel}</label>
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__graphic">
            <input type="checkbox" bind:checked={checked} on:change={()=>getCompanies()} text={checkLabel}
                    class="mdc-checkbox__native-control"
                    id="demo-list-checkbox-item-1"  />
            <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark"
                    viewBox="0 0 24 24">
                <path class="mdc-checkbox__checkmark-path"
                    fill="none"
                    d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                </svg>
                <div class="mdc-checkbox__mixedmark"></div>
            </div>
        </span>
    </li>
</span>
