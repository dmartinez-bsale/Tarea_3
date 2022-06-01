<script>
import { onMount } from "svelte";
//- componentes 
import ApiCall from "../../../helpers/api_call"
import TopBar from "../../common/TopBar.svelte";
import Grid from "../../common/Grid.svelte";
import CompaniesList from "./components/CompaniesList.svelte";
import Filters from "./components/Filters.svelte";
import Checkbox from "./components/Checkbox.svelte";
import Swal from "sweetalert2";
let environment = process.env.NODE_ENV || "development";
let settings = require("../../../config/settings.json")[environment];

//- variables
let companies=[];
let dateOptions={ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
let block=false;
let active=false;
let inactive=false;


//- inicializacion del array de empresas consultando a la api 
onMount(async () => {
companies = await getCompanies();

});

//- Sincronizacion de los filtros activos antes de la peticion 
const companiesFilters=async ()=>{
	companies = await getCompanies();
}

//- Formateo de la URL agregandole los filtros a los query params
const formatURL=()=>{
	let url=settings.companiesApi + `/v1/companies.json?country=pe`

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
//- Consulta a la api por el erray de empresas y error handler 
const getCompanies = async () => {
	try {
		let response = await ApiCall.request(
			formatURL()
		);

		if (
			response.data != undefined &&
			response.data != null &&
			response.data.code < 300
		) {
			response = response.data.data;							
			return response;
		} else {
				Swal.fire({
				icon: "error",
				title: "Oops...",
				text: '"Error en la obtencion de datos"!',
			});
			console.log(response);
		}
	} catch (error) {
		console.log(error);
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: '"Error en la obtencion de datos"!',
		});
	}
};
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

<main>
	<TopBar></TopBar>
	<Grid>
		<!--# menu de filtros -->
		<Filters>
			<Checkbox checkLabel={"Bloqueado"} bind:checked={block} {companiesFilters} ></Checkbox>
			<Checkbox checkLabel={"Activos"} bind:checked={active} {companiesFilters}></Checkbox>
			<Checkbox checkLabel={"Inactivos"} bind:checked={inactive} {companiesFilters}></Checkbox>
		</Filters>
		<!--# lista de empresas -->
		<CompaniesList>
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
		</CompaniesList>	
	</Grid>
</main>

<style>
</style>