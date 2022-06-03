<script>
import { onMount } from "svelte";
//- componentes 
import ApiCall from "../../../helpers/api_call";
import TopBar from "../../common/TopBar.svelte";
import Grid from "../../common/Grid.svelte";
import CompaniesList from "./components/CompaniesList.svelte";
import Filters from "./components/Filters.svelte";
import Swal from "sweetalert2";

let formatURL;

//- variables
let companies=[];

//- inicializacion del array de empresas consultando a la api 
onMount(async () => {
    getCompanies();
});
//- Consulta al controller por el erray de empresas y error handler 
export const getCompanies = async () => {
	let response = await ApiCall.request(
                formatURL()
            );
	if (response.status==200){
		companies=response.data
	}else{
		Swal.fire({
				icon: "error",
				title: "Oops...",
				text: '"Error en la obtencion de datos"!',
			});
		console.log(response)
	}
};
</script>

<main>
	<TopBar></TopBar>
	<Grid>
		<!--# menu de filtros -->
		<Filters {getCompanies} bind:formatURL bind:companies>
		</Filters>
		
		<!--# lista de empresas --> 
		<CompaniesList bind:companies>	
		</CompaniesList>	
	</Grid>
</main>
