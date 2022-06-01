<script>
import { onMount } from "svelte";
//- componentes
import ApiCall from "../../../helpers/api_call"
import TopBar from "../../common/TopBar.svelte";
import Grid from "../../common/Grid.svelte";
import SideMenu from "./components/SideMenu.svelte";
import Forms from "./components/Forms.svelte";
import FormInput from "./components/FormInput.svelte";
import SendButton from "../../common/SendButton.svelte";
import AttachDni from "./components/AttachDni.svelte";
import RadioButton from "./components/RadioButton.svelte";
import Swal from "sweetalert2";
//-variables
let environment = process.env.NODE_ENV || "development";
let settings = require("../../../config/settings.json")[environment];
const urlParams = new URLSearchParams(window.location.search);
const cpnId = urlParams.get("cpnId");
let formulario="companyForm";
let currentCompany={};
let companyChanges={};
let legalAgentChanges={};
let facturationChanges={};
let radioChecked;

// carga de los datos de la empresa y se inicializan los cambios de cada formulario
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

// Obtiene la informacion de una empresa y maneja los errores en la consulta 
const getCompany = async (id) => {
	try {
		let response = await ApiCall.request(
			settings.companiesApi + `/v1/companies/${id}.json`
		);
		if (
			response.data != undefined &&
			response.data != null &&
			response.data.code < 300
		) {
			response = response.data.data;
			return response
		} else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: '"No hay datos que cargar!"',
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

//maneja la vision de los formularios segun corresponsa
const changeForm=(menuId)=>{
	if(menuId=="menu_1"){
		formulario="companyForm"
	}else if(menuId=="menu_2"){
		formulario="legalAgentForm"
	}else if(menuId=="menu_3"){
		formulario="facturationForm"
	}
}
//Define el formulario a enviar a la api y luego la llama 
const submitForm=()=>{
	let data={};
	if(formulario=="companyForm"){
		data=companyChanges
	
	}else if(formulario=="legalAgentForm"){
		data=legalAgentChanges
	}
	else if(formulario=="facturationForm"){
		if(radioChecked){
			facturationChanges.nombreFacturacion=legalAgentChanges.legalAgentName
			facturationChanges.emailFacturacion=legalAgentChanges.legalAgentEmail
		}
		data=facturationChanges
	}
	updateCompany(data)
}

//- Envia los datos por api para hacer una simulacion de actualizacion y maneja los errores en la consulta
const updateCompany = async (body)=>{
    // - Api call to update elemens in current form
    let response = {};
    try {
        response = await ApiCall.request( `/v1/companies/${cpnId}.json`,
            "put",
            {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body
        );
        if (
            response.data != undefined &&
            response.data != null &&
            response.data.code < 300
        ) {
            response = response.data.data;
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Datos actualizados! :)",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            response = {
                code: 500,
                errors: "Non data response from API",
            };
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: '"Datos no actualizados"!',
            });
            console.log(response);
        }
    } catch (error) {
        console.log(error);
        response = {
            code: 500,
            errors: error,
        };
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: '"Error en la peticion"!',
        });
    }
};


</script>

<main>
	<TopBar></TopBar>
	<Grid>
		<SideMenu {changeForm} bind:cpnCode={companyChanges.cpnCode} bind:cpnName={companyChanges.cpnName}></SideMenu>
		<div class="mdc-layout-grid__cell--span-8 ">
			<!--# Formulario de la empresa -->
			{#if formulario=="companyForm"}
				<Forms {submitForm} formDataID={"companyForm"} formTitle={"Datos de la empresa"}>
					<FormInput inputDataID={"ruc"} inputName={"cpnCode"} bind:inputValue={companyChanges.cpnCode}  inputLabel={"RUC empresa"} required={true}></FormInput>
					<FormInput inputDataID={"razonSocial"} inputName={"cpnName"} bind:inputValue={companyChanges.cpnName} inputLabel={"Razon social"} required={true} ></FormInput>
					<FormInput inputDataID={"direccion"} inputName={"cpnLegalAddress"} bind:inputValue={companyChanges.cpnLegalAddress} inputLabel={"Dirección de la empresa"}></FormInput>
					<FormInput inputDataID={"distrito"} inputName={"cpnLegalCity"}  bind:inputValue={companyChanges.cpnLegalCity} inputLabel={"Distrito"}></FormInput>
					<FormInput inputDataID={"Rubro"} inputName={"activity"} bind:inputValue={companyChanges.activity} inputLabel={"Rubro"}></FormInput>
					<SendButton buttonText={"enviar"}></SendButton>
				</Forms>

			<!--# Formulario del representante legal  -->
			{:else if formulario=="legalAgentForm"}
				<Forms {submitForm} formDataID={"legalAgentForm"} formTitle={"Datos de representante legal"}>
					<FormInput inputDataID={"dniRepLegal"} inputName={"legalAgentCode"} bind:inputValue={legalAgentChanges.legalAgentCode} inputLabel={"DNI del representante legal"}></FormInput>
					<FormInput inputDataID={"nombreRepLegal"} inputName={"legalAgentName"} bind:inputValue={legalAgentChanges.legalAgentName} inputLabel={"Nombre del representante legal"}></FormInput>
					<FormInput inputDataID={"emailRepLegal"} inputName={"legalAgentEmail"}  bind:inputValue={legalAgentChanges.legalAgentEmail} inputLabel={"Email del representante legal"} type={"email"}></FormInput>
					<AttachDni></AttachDni>
					<SendButton buttonText={"enviar"}></SendButton>
				</Forms>

			<!--# Formulario de Facturacion -->
			{:else if formulario=="facturationForm"}
				<Forms {submitForm} formDataID={"facturationForm"} formTitle={"Datos para envio de facturacion"}>
					<!-- Comportamiento del radio button -->
					{#if (radioChecked==false)}
						<FormInput inputDataID={"nombreFacturacion"} inputName={"nombreFacturacion"} bind:inputValue= {facturationChanges.nombreFacturacion} inputLabel={"Nombre y Apellido"}></FormInput>
						<FormInput inputDataID={"emailFacturacion"} inputName={"emailFacturacion"} bind:inputValue={facturationChanges.emailFacturacion} inputLabel={"Email"} type={"email"}></FormInput>
					{:else} 
						<FormInput inputDataID={"nombreFacturacion"} inputName={"nombreFacturacion"} bind:inputValue={legalAgentChanges.legalAgentName} inputLabel={"Nombre y Apellido"}></FormInput>
						<FormInput inputDataID={"emailFacturacion"} inputName={"emailFacturacion"} bind:inputValue={legalAgentChanges.legalAgentEmail} inputLabel={"Email"} type={"email"}></FormInput>
					{/if}
					<FormInput inputDataID={"telefonoFacturacion"} inputName={"telefonoFacturacion"} bind:inputValue={facturationChanges.telefonoFacturacion} inputLabel={"Teléfono"}></FormInput>
					<RadioButton radioLabel={"Mismo que el representante legal"} bind:radioChecked></RadioButton>
					<SendButton buttonText={"enviar"} ></SendButton>
				</Forms>
			{/if}
		</div>
	</Grid>	
</main>

<style>
</style>