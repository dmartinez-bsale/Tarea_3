// import { writable } from "svelte/store";
// let environment = process.env.NODE_ENV || "development";
// let settings = require("../../config/settings.json")[environment];
// import ApiCall from "../../helpers/api_call";
// export let states = {
//     active: writable(false),
//     inactive: writable(false),
//     blocked: writable(false),
// };
// export let active = writable(true);
// export let inactive = writable(false);
// export let blocked = writable(false);
// export let companies = writable([]);

// //- Consulta a la api por el erray de empresas y error handler
// export const getCompanies = async () => {
//     try {
//         console.log(formatURL());
//         let response = await ApiCall.request(formatURL());

//         if (
//             response.data != undefined &&
//             response.data != null &&
//             response.data.code < 300
//         ) {
//             response = response.data.data;
//             companies.set(response);
//         } else {
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: '"Error en la obtencion de datos"!',
//             });
//             console.log(response);
//         }
//     } catch (error) {
//         console.log(error);
//         Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: '"Error en la obtencion de datos"!',
//         });
//     }
// };
// //- Formateo de la URL agregandole los filtros a los query params
// export const formatURL = () => {
//     let url = settings.companiesApi + `/v1/companies.json?country=pe`;

//     if (states.blocked) {
//         url += "&block_not_pay=1";
//     }
//     if (states.active && states.inactive) {
//         return url;
//     } else {
//         if (states.active) {
//             url += "&inactive=0&state=0";
//         }
//         if (states.inactive) {
//             url += "&inactive=1";
//         }
//     }
//     console.log(url);
//     return url;
// };
