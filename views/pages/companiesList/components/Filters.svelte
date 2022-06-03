<script>
    import Checkbox from "./Checkbox.svelte";
    export let block=false;
    export let active=false;
    export let inactive=false;
    export let getCompanies;

    //- Formateo de la URL agregandole los filtros a los query params
    export const formatURL=()=>{
        let url=`/gateway/v1/companies.json?country=pe`

        if (block){
            url+="&block_not_pay=1"
        }
        if(active&&inactive){
            return url
        }
        else{
            if(active){
                url+="&inactive=0&state=0"
            }
            if(inactive){
                url+="&inactive=1"
            }
        }
        return url
    }
    
</script>
<div class="mdc-card mdc-layout-grid__cell--span-3 filters">
    <label for=""
            class="form-title"
        > Filtros</label>
    <ul class="mdc-list">
        <Checkbox checkLabel={"Bloqueado"} bind:checked={block} {getCompanies} ></Checkbox>
        <Checkbox checkLabel={"Activos"} bind:checked={active} {getCompanies}></Checkbox>
        <Checkbox checkLabel={"Inactivos"} bind:checked={inactive} {getCompanies}></Checkbox>
    <ul>
</div>