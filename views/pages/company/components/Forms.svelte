
<script>
import FormInput from "./FormInput.svelte";
import AttachDni from "./AttachDni.svelte";
import RadioButton from "./RadioButton.svelte";
import SendButton from "../../../common/SendButton.svelte";
export let formTitle;
export let formDataID;
export let formulario;
export let cpnId;
export let formChanges;
export let legalAgentChanges;
export let radioChecked=false;


//- Define el formulario a enviar a la api 
const submitForm=()=>{
    if(formulario=="facturationForm" && radioChecked){
        formChanges.nombreFacturacion = legalAgentChanges.legalAgentName
        formChanges.emailFacturacion = legalAgentChanges.legalAgentEmail 
    }
    updateCompany(formChanges)
}

//- Envia los datos por api para hacer una simulacion de actualizacion y maneja los errores en la consulta
const updateCompany = async (body)=>{
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

<!-- company form -->

<form on:submit|preventDefault={submitForm(formDataID)}
    for="company_form"
    data-id={formDataID}
    class="mdc-card mdc-layout-grid__cell mdc-layout-grid__cell--span-8 mdc-layout-grid "
>
    <div class="mdc-layout-grid__inner">
        <label for=""
            class="mdc-layout-grid__cell--span-12 form-title"
        >
            {formTitle}
        </label>

        <!--# Formulario de la empresa -->
        {#if formulario=="companyForm"}
            <FormInput inputDataID={"ruc"} inputName={"cpnCode"} bind:inputValue={formChanges.cpnCode}  inputLabel={"RUC empresa"} required={true}></FormInput>
            <FormInput inputDataID={"razonSocial"} inputName={"cpnName"} bind:inputValue={formChanges.cpnName} inputLabel={"Razon social"} required={true} ></FormInput>
            <FormInput inputDataID={"direccion"} inputName={"cpnLegalAddress"} bind:inputValue={formChanges.cpnLegalAddress} inputLabel={"Dirección de la empresa"}></FormInput>
            <FormInput inputDataID={"distrito"} inputName={"cpnLegalCity"}  bind:inputValue={formChanges.cpnLegalCity} inputLabel={"Distrito"}></FormInput>
            <FormInput inputDataID={"Rubro"} inputName={"activity"} bind:inputValue={formChanges.activity} inputLabel={"Rubro"}></FormInput>
            <SendButton buttonText={"enviar"}></SendButton>
        
        <!--# Formulario del representante legal  -->
        {:else if formulario=="legalAgentForm"}
            <FormInput inputDataID={"dniRepLegal"} inputName={"legalAgentCode"} bind:inputValue={formChanges.legalAgentCode} inputLabel={"DNI del representante legal"}></FormInput>
            <FormInput inputDataID={"nombreRepLegal"} inputName={"legalAgentName"} bind:inputValue={formChanges.legalAgentName} inputLabel={"Nombre del representante legal"}></FormInput>
            <FormInput inputDataID={"emailRepLegal"} inputName={"legalAgentEmail"}  bind:inputValue={formChanges.legalAgentEmail} inputLabel={"Email del representante legal"} type={"email"}></FormInput>
            <AttachDni></AttachDni>
            <SendButton buttonText={"enviar"}></SendButton>
        
        <!--# Formulario de Facturacion -->
        {:else if formulario=="facturationForm"}
                <!--# Comportamiento del radio button -->
				{#if (!radioChecked)}
                    <FormInput inputDataID={"nombreFacturacion"} inputName={"nombreFacturacion"} bind:inputValue= {formChanges.nombreFacturacion} inputLabel={"Nombre y Apellido"}></FormInput>
                    <FormInput inputDataID={"emailFacturacion"} inputName={"emailFacturacion"} bind:inputValue={formChanges.emailFacturacion} inputLabel={"Email"} type={"email"}></FormInput>
                {:else} 
                    <FormInput inputDataID={"nombreFacturacion"} inputName={"nombreFacturacion"} bind:inputValue={legalAgentChanges.legalAgentName} inputLabel={"Nombre y Apellido"}></FormInput>
                    <FormInput inputDataID={"emailFacturacion"} inputName={"emailFacturacion"} bind:inputValue={legalAgentChanges.legalAgentEmail} inputLabel={"Email"} type={"email"}></FormInput>
                {/if}
                <FormInput inputDataID={"telefonoFacturacion"} inputName={"telefonoFacturacion"} bind:inputValue={formChanges.telefonoFacturacion} inputLabel={"Teléfono"}></FormInput>
                <RadioButton radioLabel={"Mismo que el representante legal"} bind:radioChecked></RadioButton>
                <SendButton buttonText={"enviar"} ></SendButton>
        {/if}
    </div>
</form>

