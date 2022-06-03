<script>
import { onMount } from "svelte";
//- componentes
import ApiCall from "../../../helpers/api_call"
import TopBar from "../../common/TopBar.svelte";
import Grid from "../../common/Grid.svelte";
import SideMenu from "./components/SideMenu.svelte";
import Forms from "./components/Forms.svelte";
import Swal from "sweetalert2";

//-variables
let environment = process.env.NODE_ENV || "development";
let settings = require("../../../config/settings.json")[environment];
const urlParams = new URLSearchParams(window.location.search);
const cpnId = urlParams.get("cpnId");

const FORMS_TYPES={companyForm:"companyForm",facturationForm:"facturationForm",legalAgentForm:"legalAgentForm"}
const MENU_ITEMS=["Datos de la empresa","Datos del representante legal","Datos para el envío de facturación","¿Quién implementará Bsale?","Informacion para tu proceso","Información para tus documentos","Capacitacíon"]
let formulario=FORMS_TYPES.companyForm;
let currentCompany={};
let companyChanges={};
let legalAgentChanges={};
let facturationChanges={};
let radioChecked;


//- carga de los datos de la empresa y se inicializan los cambios de cada formulario
onMount(async () => {
	currentCompany = await getCompany(cpnId);
	companyChanges={
		cpnCode: currentCompany.cpnCode,
		cpnName: currentCompany.cpnName,
		cpnLegalAddress: currentCompany.cpnLegalAddress,
		cpnLegalCity: currentCompany.cpnLegalCity,
		activity: currentCompany.activity
	};

	legalAgentChanges={
		legalAgentCode: currentCompany.legalAgentCode,
		legalAgentName: currentCompany.legalAgentName,
		legalAgentEmail: currentCompany.legalAgentEmail,
	};

    facturationChanges={
		nombreFacturacion: "",
		emailFacturacion:"",
		telefonoFacturacion:""

	};
});

//-  llama al controller por la informacion de una empresa y maneja los errores en la consulta 
const getCompany = async (id) => {
	console.log("hola")
	let response = await ApiCall.request(
	`/gateway/v1/companies/${id}.json`
	);
	if (response.status==200){
		return response.data
	}else{
		Swal.fire({
				icon: "error",
				title: "Oops...",
				text: '"Error en la obtencion de datos"!',
			});
	}	
};


</script>

<main>
<TopBar></TopBar>
<Grid>
	<!--# Menu Lateral -->
	<SideMenu formsTypes={FORMS_TYPES} menuItems={MENU_ITEMS} bind:formulario bind:cpnCode={currentCompany.cpnCode} bind:cpnName={currentCompany.cpnName}></SideMenu>
	<div class="mdc-layout-grid__cell--span-8 ">
		{#if formulario==FORMS_TYPES.companyForm}
			<!--# Formulario de la empresa -->
			<Forms {cpnId} formDataID={"companyForm"} formTitle={"Datos de la empresa"}  bind:formulario bind:formChanges={companyChanges}>	
			</Forms>
		{:else if formulario==FORMS_TYPES.legalAgentForm}
			<!--# Formulario del representante legal  -->
			<Forms {cpnId} formDataID={"legalAgentForm"} formTitle={"Datos de representante legal"}  bind:radioChecked bind:formulario bind:formChanges={legalAgentChanges}>	
			</Forms>
		{:else if formulario==FORMS_TYPES.facturationForm}
			<!--# Formulario de Facturacion -->
			<Forms {cpnId} formDataID={"facturationForm"} formTitle={"Datos para envio de facturacion"} bind:radioChecked bind:formulario bind:formChanges={facturationChanges} bind:legalAgentChanges>
			</Forms>
		{/if}
	</div>
</Grid>	
</main>