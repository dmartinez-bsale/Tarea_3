<script>
export let companies;
const dateOptions={ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

//- Retorna el estado de una empresa a partir del sus datos
const getCpnState = (inactive,block)=>{
    if (inactive==0 && block==0){
        return "Activo"
    }else if (inactive!=0 && block==0)
    {
        return "Inactivo"
    }else{
        return "Bloqueado"
    }
}
</script>
<div
    id="companiesList"
    data-id="companiesList"
    class=" mdc-card mdc-layout-grid__cell--span-9 "
>
    <ul class="mdc-list">
        <label for=""
            class="form-title"
        > Listado de Empresas</label>
        <span class="mdc-ripple-surface mdc-list-item--activated"></span>
        {#each companies as cpn}	
            <li data-id="" class=" mdc-list-item" on:click={()=>location.href = `/companies/?cpnId=${cpn.cpnId}`} tabindex="0" >
                <span class="mdc-list-item__ripple "></span>
                <span class="mdc-list-item__text company-li">
                    <span class="mdc-list-item__text company-li-cell" >
                        {cpn.cpnName}
                    </span>
                    <span class="mdc-list-item__text company-li-cell">
                        {new Date(cpn.cpnCreated).toLocaleDateString("es-ES",dateOptions)}
                    </span>
                    <span class="mdc-list-item__text company-li-cell">
                        {getCpnState(cpn.cpnInactive,cpn.cpnBlock)}
                    </span>
                </span>
            </li>	
        {/each}
    </ul>
</div>