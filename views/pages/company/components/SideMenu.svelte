<script>
    export let cpnName;
    export let cpnCode;
    export let menuItems;
    export let formulario;
    export let formsTypes;

    //- maneja la vision de los formularios segun corresponda
    const changeForm=(menuId)=>{
	if(menuId==menuItems[0]){
		formulario=formsTypes.companyForm
	}else if(menuId==menuItems[1]){
		formulario=formsTypes.legalAgentForm
	}else if(menuId==menuItems[2]){
		formulario=formsTypes.facturationForm
	}
}
</script>
<div
    id="menu"
    data-id="menu"
    class="mdc-card mdc-layout-grid__cell--span-4 mdc-layout-grid__cell--span-8-tablet mdc-layout-grid__cell--span-4-desktop menu mdc-layout-grid__cell--align-begin"
>
    <ul class="mdc-list">
        <span class="mdc-ripple-surface mdc-list-item--activated"></span>
        <div class="menu-company">
            <span class="mdc-list-item__primary-text">
                {cpnName}
            </span>
            <span class="mdc-list-item__primary-text">
                RUC: {cpnCode}
            </span>
        </div>
        {#each menuItems as item}
            <li data-id="menu_1" class="mdc-list-item" on:click={changeForm(item)} tabindex="0">
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__text">
                    {item}
                </span>
            </li>
        {/each}
    </ul>
</div>